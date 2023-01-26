<template>
    <div class="wrap">
        <div class="left">
            <DayPilotNavigator id="nav" :config="datePickerConfig" ref="datePicker" :events="events" />
        </div>
        <!--<div class="content">
            <DayPilotCalendar id="dp" :config="calendarConfig" ref="calendar" :events="events" />
        </div>-->
        

        <div class="slot_picker">
    <div class="vue-time-slot-container">
      <div class="vue-time-slot-table-row-header">
        <span class="vue-time-slot-column-header">Time</span>
        <span class="vue-time-slot-row-header" v-for="value in slotRange" :key="value.label">
          {{value.label}}
        </span>
      </div>
      <div class="vue-time-slot-calendar-table" id="vue-time-slot-calendar-table">
        <div class="vue-time-slot-day-header" v-for="day in dayIndex" :key="day.label">
          <span class="vue-time-slot-column-header">{{day.label}}</span>
          <span class="vue-time-slot-cell" v-for="value in slotRange" :key="value.label" @click="slot($event, value, day)">
            {{value.label}} 
          </span>
        </div>
      </div>
<!--
    <div class="selection" id="selection">
        <ul class="selected_slots">
          <li class="slots" v-for="(slot, index) in selected_slots" :key='index'>{{slot.value}} {{slot.label}}</li>
        </ul>
      </div>
    -->
      

    </div>
  </div>
    </div>

</template>

<script>
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from '@daypilot/daypilot-lite-vue'


let selected_slots_count = 0;
let selection_count = 0;
//let lastDate = null;

export default {
    name: 'AvailabilityPicker',
    props: {
    min: {
      type: Number,
      default: 3
    }
  },
  watch: {},

    data: function () {
        return {
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
                        this.calendarConfig.startDate = args.day;
                    }
                },
                
                
                //need to block past days
                onTimeRangeSelect: args => {
                    if (args.day < DayPilot.Date.today()) {
                        args.preventDefault();
                        this.select(lastDate, {dontNotify: true, dontFocus: true});
                    } else {
                        lastDate = args.start;
                    }
                },
            
                onBeforeCellRender: args=> {
                    console.log(DayPilot.Date.today());
                    //console.log(args.cell.day);
                    if (args.cell.day = "2023-01-23T00:00:00") {
                        args.cell.cssClass = "navigator-disabled-cell";
                    }
                },
                

            },

        duration: 30, // only 10, 15, 20, 30 allowed
        open: 10, // set openning hours
        close: 18,      
        slotRange: [/*
            {
          label: "13:40 - 14:00",
          start_time: "13:40:00",
          end_time: "14:00:00"
        },*/
        ],
      dayIndex: [],
      todaysDate: this.formatDate(new Date(), "long"),
      dateIndex: 0,
      selected_slots: [],


        }
    },
    

    components: {
        //DayPilotCalendar,
        DayPilotNavigator
    },


    computed: {
        // DayPilot.Calendar object - https://api.daypilot.org/daypilot-calendar-class/
       /* calendar() {
            return this.$refs.calendar.control;
        },
        */
        datePicker() {
            return this.$refs.datePicker.control;
        }
    },

    methods: {
        loadEvents() {
            // placeholder for an HTTP call
            /*
            const busy = [
                {
                    id: 1,
                    start: "2023-01-05T10:00:00",
                    end: "2023-01-05T11:00:00",
                    text: "busy",
                    barColor: "#6aa84f",
                },

            ];
            this.events = busy;
            */ 
        },
        formatDate(date, type) {
      let monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      var day = date.getDate();
      var monthIndex = date.getMonth();
      let month =
        type == "short"
          ? monthNames[monthIndex].slice(0, 3)
          : monthNames[monthIndex];
      return {
        label: date.toString().slice(0, 3) + " " + month + " " + day,
        value: date.toString().slice(0, 16),
      };
    },
    addDate() {
      this.dayIndex.push(
        this.formatDate(this.nextDate(this.dateIndex), "short")
      );
      this.dateIndex++;
    },
    nextDate(index) {
        //console.log(new Date());
      return new Date(new Date().getTime() + index * 24 * 60 * 60 * 1000);
    },
    slot(event, value, day) {
      // select up to three slots
      // unselect a slot by clicking it
      console.log(event);
      if (event.target.classList[1] != "vue-time-slot-active-cell" && selection_count <=2) {
        selection_count++;
        event.target.classList.toggle("vue-time-slot-active-cell");
        value.date = day.value;
        this.$emit("callback", value);
        let slot = {label: value.label, value: value.date};
        this.addSlot(slot);
        return;
      } 
      if (event.target.classList[1] == "vue-time-slot-active-cell") {
        selection_count--;
        event.target.classList.toggle("vue-time-slot-active-cell");
        value.date = day.value;
        this.$emit("callback", value);
        let slot = {label: value.label, value: value.date};
        this.removeSlot(slot);
      }
    },
    initSlotRange() {
    // initialise dateRange with a duration of 20 min
      let start = "";
      let end = "";
    
      for (let hour = this.open; hour < this.close; hour++) {
        for (let min = 0; min <60; min += this.duration) {
          start = end;
          if(min != 0) {
            end = hour + ":" + min;
          } else {
            end = hour + ":0" + min
          }
          let label = start + " - " + end;
          let start_time = start + ":00";
          let end_time = end + ":00";
          let range = {label, start_time, end_time};
          if (start != "") {
            this.slotRange.push(range);
          }
        }
      }
      start = end;
      end = this.close + ":00";
      let label = start + " - " + end;
      let start_time = start + ":00";
      let end_time = end + ":00";
      let range = {label, start_time, end_time};
      this.slotRange.push(range);
    },
    addSlot(slot) {
      this.selected_slots.push(slot);
    },
    removeSlot(slot) {
    // get all slot data and then get index of selected slot in list
    let items = document.querySelectorAll(".slots");
    let item = [];
    for (let i = 0; i < items.length; i++) {
      item.push(items[i].innerHTML);
    }
    let slot_info = slot.value + " " + slot.label;
    let index = item.indexOf(slot_info);
    this.selected_slots.splice(index, 1);
    },
    /*
    blockSlot() {

    }
    */



    },
    mounted() {
        this.loadEvents();
        //2023-01-26T00:00:00'

    //let todaysDate = new Date(new Date().getTime() + 0 * 24 * 60 * 60 * 1000);
        for (let index = 0; index < this.min; index++) {
      this.dayIndex.push(
        this.formatDate(this.nextDate(this.dateIndex), "short")
      );
      this.dateIndex++;
    }

    this.initSlotRange();
    console.log(DayPilot.Date.today());
    //this.blockSlot();

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

.content {
    flex-grow: 1;
}
/*
.calendar_default_event_inner {
    border-radius: 5px;
}
*/
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

.vue-time-slot-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 13px;
  padding-left: 50px;
}
.vue-time-slot-row-header {
  border: none !important;
  text-align: left;
  cursor: pointer;
  background-color: #ccc;
  font-size: 12px;
  padding: 7px;
  color: #000;
  width: 120%;
  height: 35px;
}
.vue-time-slot-column-header {
  border: none !important;
  text-align: center;
  cursor: pointer;
  background-color: #ccc;
  font-size: 12px;
  padding: 10px 0;
  color: #000;
}
.vue-time-slot-cell{
  padding-top: 10px;
  background-color: #fff;
  border-style: solid;
  border-color: #ccc;
  border-width: 1px 1px 0 0;
  text-align: center;
  cursor: pointer;
  color: #fff;
  font-size: 13px;
  height: 100%;
}
.vue-time-slot-cell:last-child{
  border-width: 1px 1px 1px 0;
}
.vue-time-slot-cell:hover{
  background-color: rgb(3, 105, 161);
}
.vue-time-slot-active-cell {
  background-color: rgb(3, 105, 161);
  color: #fff;
}
.vue-time-slot-active-cell:hover{
  background-color: rgb(3, 105, 161);
}
.vue-time-slot-table-row-header {
  display: flex;
  flex-direction: column;
  width: 130px;
}
.vue-time-slot-day-header {
  display: flex;
  flex-direction: column;
  width: 100px;
}
.vue-time-slot-calendar-table {
  background-color: transparent;
  overflow: auto;
  white-space: nowrap;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.vue-time-slot-calendar-table .vue-time-slot-day-header:first-child{
  border-style: solid;
  border-color: #ccc;
  border-width: 0 0 0 1px;
}
.arrow-block {
  font-size: 25px;
  font-weight: bolder;
  color: #ef4144;
  cursor: pointer;
  margin: -10px 15px;
}
.selection {
  width: 200px;
  padding-right: 50px;
}
.selection .selected_slots{
  list-style-type: none;
  text-align: center;
  font-size: 17px;
  width: 100%;
}

</style>
