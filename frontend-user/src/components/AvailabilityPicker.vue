<template>
    <div class="wrap">
        <div class="left">
            <DayPilotNavigator id="nav" :config="datePickerConfig" ref="datePicker" :events="events" />
        </div>

    <div class="flex-col pl-3">
        <div class="flex-col p-0 mb-2">
            <span class="" v-for="(item,index) in timeList" :key="item.id">
                <span class="">
                    <el-button class="m-1" :disabled="item.flag"
                            @click="selectTime(index, item.start, item.end, item.date, item.day)">{{item.start}}</el-button>
                </span>
                <!--
        <span v-if="(index+1)%8==0">
          <br>
        </span>
      -->
            </span>
        </div>
    
    <div class="pl-2 flex-row" id="selection">
      <p class="font-bold text-base mt-1 mb-1"> Your Selected Slots</p>
        <ul class="">
          <li class="mt-2 text-sm" v-for="(slot, index) in selectedSlots" :key='slot.id'>  {{slot.day}}
            {{slot.start}}-{{slot.end}}
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

export default {
    name: 'AvailabilityPicker',
    props: {},
    watch: {},

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
            duration: 20,
            open: "10:00",
            close: "18:00",
            disabledTime: {start: "13:30", end: "14:00", date: ""},
            selectedDate: moment().format("YYYY-MM-DD"),
            selectionCount: 0,

            events: [],
            datePickerConfig: {
                showMonths: 1,
                skipMonths: 1,
                // "Day" highlights the selected day
                // "Week" highlights the week of the selected day
                selectMode: "Day",
                startDate: DayPilot.Date.today(),
                selectionDay: DayPilot.Date.today(),
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
        DayPilotNavigator
    },

    computed: {
        datePicker() {
            return this.$refs.datePicker.control;
        }
    },

    methods: {
        selectTime(index, start, end, date, day) {
            // check if there are three selected slots
            if (this.selectionCount >= 3) {
                // a hint for removing a slot first
                return;
            }
            this.selectionCount++;
            this.addSlot({start: start, end: end, date: date, day: day});
        },
        addSlot(slot) {
            this.selectedSlots.push(slot);
        },
        removeSlot(index) {
            this.selectionCount--;
            console.log(index);
            this.selectedSlots.splice(index, 1);
        },
        loadAvailableSlot() {
            // clear timeList
            this.timeList.length = 0;

            for (let i = 0; i < this.availabilityList.length; i++) {    
              //if(moment(this.availabilityList[i].start).format("YYYY:MM:DD").toString() != this.selectedDate) {
                //continue;
              //} 
              
                let startOfSlot = moment(this.availabilityList[i].start);
                let endOfAvailibility = moment(this.availabilityList[i].end);
                let endOfSlot = startOfSlot.clone().add(this.duration, "minutes");

                if (startOfSlot.format("YYYY-MM-DD").toString() != this.selectedDate) {
                  continue;
                }

                while (!endOfSlot.isAfter(endOfAvailibility)) {  
                    if (startOfSlot.format("HH:mm").toString() >= this.open && 
                        endOfSlot.format("HH:mm").toString() <= this.close) {
                        let singleSlot = {start: startOfSlot.format("HH:mm"), 
                                          end: endOfSlot.format("HH:mm"),
                                          date: this.selectedDate,
                                          day: moment(this.selectedDate).toDate().toString().slice(0, 15),
                                          flag: false};       
                        this.timeList.push(singleSlot);
                }
                startOfSlot = endOfSlot;
                endOfSlot = startOfSlot.clone().add(this.duration, "minutes");
              }
            }
        },
        loadEvents() {},
    },
    mounted() {
        this.loadEvents();
        this.loadAvailableSlot();
        //2023-01-26T00:00:00'
    }
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
  /*box-sizing: content-box; */
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
