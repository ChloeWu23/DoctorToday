<template>
    <div class="wrap">
        <div class="left">
            <DayPilotNavigator id="nav" :config="datePickerConfig" ref="datePicker" :events="events" />
        </div>

    <div class="flex-col pr-2">
        <div class="p-0 mb-2">
            <span class="w-32 border-2 rounded-md" v-for="(item,index) in timeList" :key="index">
                <span style="padding-left: 5px">
                    <button size="medium" style="width: 80px" :disabled="item.flag"
                            @click="selectTime(index, item.start, item.end, item.date, item.day)">{{item.start}}</button>
            </span>
        </span>
    </div>

    <div class="pl-6 flex-row" id="selection">
      <p class="font-bold text-bg mt-2"> Your Selected Slots</p>
        <ul class="text-bg">
          <li class="mt-2" v-for="(slot, index) in selectedSlots" :key='slot.id'>  {{slot.day}}
            {{slot.start}}-{{slot.end}}
            <button @click="removeSlot(index)" class="remove"> x</button>
          </li>
        </ul>
    </div>

  </div>
  </div>

</template>

<script>
import moment from 'moment';
import { DayPilot, DayPilotNavigator } from '@daypilot/daypilot-lite-vue'

let selection_count = 0;

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
            ],
            timeList: [],
            selectedSlots: [],
            duration: 20,
            open: "10:00",
            close: "18:00",
            busy: {start: "13:30", end: "14:00", date: ""},
            selectedDate: moment().format("YYYY-MM-DD"),

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
                  console.log(args.day.value);
                    // get selected day from navigator
                    if (args.day >= DayPilot.Date.today()) {
                        this.selectedDate = (moment(args.day.value).format("YYYY-MM-DD"));
                        this.loadAvailableSlot();
                    }
                },
                onBeforeCellRender: args=> {
                    //console.log(args.cell.day);
                    if (args.cell.day < DayPilot.Date.today()) {
                        args.cell.cssClass = "navigator-disabled-cell";
                    }
                },
            },
        }
    },
    
    components: {
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
            if (selection_count >= 3) {
            // a hint for removing a slot first
            return;
            }
            selection_count++;
            this.addSlot({start: start, end: end, date: date, day: day});
        },
        addSlot(slot) {
            this.selectedSlots.push(slot);
        },
        removeSlot(index) {
            selection_count--;
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
        removeSlot(slot) {
            // get all slot data and then get index of selected slot in list
            let items = document.querySelectorAll(".slots");
            let item = [];
            for (let i = 0; i < items.length; i++) {
                item.push(items[i].innerHTML);
            }
            let slot_info = slot.start + "-" + slot.end;
            let index = item.indexOf(slot_info);
            this.selected_slots.splice(index, 1);
        },
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
