<template>
    <div class="wrap">
        <div class="left">
            <DayPilotNavigator id="nav" :config="datePickerConfig" ref="datePicker" :events="events" />
        </div>

        <div class="flex-col pl-3">
            <div class="flex-col p-0 mb-3">
                <span class="" v-for="(item,index) in timeList" :key="item.id">
                    <span class="">
                        <el-button class="m-1 h-10 leading-4 text-base align-text-top" size="large" round :disabled="item.flag"
                                   @click="selectTime(index, item.start, item.end, item.date, item.day)">{{item.start}}
                        </el-button>
                    </span>
                </span>
            </div>
    
            <div class="pl-2 flex-row" id="selection">
                <p class="font-bold text-lg mt-1 mb-1"> Your Preferred Slots</p>
                <ul class="">
                    <li class="mt-2 text-base" v-for="(slot, index) in selectedSlots" :key='slot.id'>  {{slot.day}}
                        {{slot.start}} - {{slot.end}}
                        <el-button size="small" plain class="text-sm" @click="removeSlot(index)">
                            <el-icon class="el-icon-delete"><Delete /></el-icon>
                        </el-button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { DayPilot, DayPilotNavigator } from '@daypilot/daypilot-lite-vue';
import { Delete } from "@element-plus/icons";
import { ElButton } from 'element-plus/lib/index';
import 'element-plus/theme-chalk/index.css';
import axios from 'axios';
import { ReactiveEffect } from 'vue';

export default {
    name: 'AvailabilityPicker',
    props: {
        duration:{
            type: String,
            required: true
        }
    },
    watch: {
        duration(){
            this.loadAvailableSlot();
            this.selectedSlots=[];
        },
    },

    data: function () {
        return {
            availabilityList: [
              {start: "2023-01-29T09:00:00", end: "2023-01-29T13:30:00"},
              {start: "2023-01-29T14:00:00", end: "2023-01-29T19:00:00"},
              {start: "2023-01-30T09:00:00", end: "2023-01-30T13:30:00"},
              {start: "2023-01-31T09:00:00", end: "2023-01-31T13:30:00"},
              {start: "2023-01-31T14:00:00", end: "2023-01-31T19:00:00"},
              {start: "2023-02-01T09:00:00", end: "2023-02-01T13:30:00"},
              {start: "2023-02-01T14:00:00", end: "2023-02-01T19:00:00"},
            ],
    
            timeList: [],
            selectedSlots: [],
            //duration = this.$Appointment.request.duration,
            //duration: 20,
            open: "10:00",
            close: "18:00",
            disabledTimeEveryDay:[{start: "13:30", end: "14:00"}],
            disabledTime:[
              {start: "13:30", end: "14:00", date: "", type: "everyday"},
              {start: "", end: "", date: "2023-01-31", type: "day"},
              {start: "10:00", end: "11:00", date: "2023-01-31", type:"slot"},
              {start: "00:00", end: "11:00", date: "", type:"Thursday"},
              {start: "15:00", end: "23:59", date: "", type:"Thursday"},
            ],
            selectedDate: moment().format("YYYY-MM-DD"),
            selectionCount: 0,

            events: [],
            datePickerConfig: {
                showMonths: 1,
                skipMonths: 1,
                cellWidth: 35,
                cellHeight: 35,
                dayHeaderHeight: 35,
                titleHeight: 35,
                // "Day" highlights the selected day
                // "Week" highlights the week of the selected day
                selectMode: "Day",
                startDate: DayPilot.Date.today(),
                onTimeRangeSelected: args => {
                    // get selected day from navigator
                    if (args.day >= DayPilot.Date.today()) {
                        this.selectedDate = (moment(args.day.value).format("YYYY-MM-DD"));
                        this.loadAvailableSlot();
                    }
                },
                onBeforeCellRender: args=> {
                    if (args.cell.day < DayPilot.Date.today()) {
                        args.cell.cssClass = "navigator-disabled-cell";
                    }
                },
            },
        }
    },
    
    components: {
        Delete,
        DayPilotNavigator,
    },

    computed: {
        datePicker() {
            return this.$refs.datePicker.control;
        },
    },

    methods: {
        selectTime(index, start, end, date, day) {
            // check if there are three selected slots
            if (this.selectionCount >= 3) {
                // a hint for removing a slot first
                return;
            }
            // check if already selected
            for (let i = 0; i < this.selectedSlots.length; i++) {
              if (moment(this.selectedSlots[i].date).format("YYYY-MM-DD").toString() === this.selectedDate && // check date
                this.selectedSlots[i].start === start) { // check start time
                  return;
              }
            }
            this.selectionCount++;
            this.addSlot({start: start, end: end, date: date, day: day});
        },
        addSlot(slot) {
            this.selectedSlots.push(slot);
            this.$emit("slotSelection", this.selectedSlots);
            //console.log(this.selectedSlots[0].start);
        },
        removeSlot(index) {
            this.selectionCount--;
            this.selectedSlots.splice(index, 1);
            this.$emit("slotSelection", this.selectedSlots);
        },
        loadAvailableSlot() {
            // clear timeList
            this.timeList.length = 0;

            for (let i = 0; i < this.availabilityList.length; i++) {    
                let startOfSlot = moment(this.availabilityList[i].start);
                let endOfAvailibility = moment(this.availabilityList[i].end);
                let endOfSlot = startOfSlot.clone().add(this.duration, "minutes");

                // if it is not selected date's availability, continue
                if (startOfSlot.format("YYYY-MM-DD").toString() != this.selectedDate) {
                  continue;
                }

                // the end of a slot cannot be later than the end of availability
                while (!endOfSlot.isAfter(endOfAvailibility)) {  
                    // should be within openning hours
                    if (startOfSlot.format("HH:mm").toString() >= this.open && 
                        endOfSlot.format("HH:mm").toString() <= this.close) {
                        // initialise a slot struction and add it to timeList
                        let singleSlot = {start: startOfSlot.format("HH:mm"), 
                                          end: endOfSlot.format("HH:mm"),
                                          date: this.selectedDate,
                                          day: moment(this.selectedDate).toDate().toString().slice(0, 15), // day of week
                                          flag: false};       
                        this.timeList.push(singleSlot);
                }
                // find next possible slot
                startOfSlot = endOfSlot;
                endOfSlot = startOfSlot.clone().add(this.duration, "minutes");
              }
            }
        },
        // used for DayPilot Navigator
        loadEvents() {},
    },
    mounted() {
        this.loadEvents({});
        //this.loadAvailableSlot();
    }
    //Add this function to fetch data from semble

/*
    async created(){
        try{
            const response = await axios.get("http://");
            this.RealavailabilityList = response.data;
        
        } catch (error){
            console.error(error);
        }
    }
    */
}
</script>
<style>
.wrap {
    display: flex;
}
.left {
    margin-right: 10px;
}
.right {
    display: flex;
    flex-direction: column;
}
.content {
    flex-grow: 1;
}

.el-button:focus {
  background-color: #FFF;
  border-color: #DCDFE6;
  color: #606266;
}
.el-button:hover {
  color: white;
  border-color: #c6e2ff;
  background-color: rgb(3, 105, 161);
}
.el-button:active {
  color: #3a8ee6;
  border-color: #3a8ee6;
  outline: 0;
}

.navigator_default_main { 
  border-left: 1px solid #c0c0c0;
  border-right: 1px solid #c0c0c0;
  border-bottom: 1px solid #c0c0c0;
  background-color: white;
  color: #000000;
  box-sizing: content-box; }
.navigator_default_main *, 
.navigator_default_main *:before, 
.navigator_default_main *:after { 
  box-sizing: conent-box;
  font-size: 95%;
}
.navigator_default_busy.navigator_default_cell {
    background-color: #ee4f2e;
    border-radius: 15px;
    color: white;
}

.navigator_default_select {
    color: white;
}
.navigator_default_select .navigator_default_cell_box {
    background-color: rgb(3, 105, 161);
    border-radius: 50%;
    opacity: 1;
}

.navigator_default_todaybox {
    border: 2px solid rgb(3, 105, 161);
    border-radius: 50%;
}

.navigator_default_title, .navigator_default_titleleft, .navigator_default_titleright {
    background-color: rgb(3, 105, 161);
    color: white;
    font-size: 110%;
}
.navigator_default_cell.navigator-disabled-cell {
  background-color: #ddd !important;
  color: #888;
  cursor: not-allowed !important;
}
</style>
