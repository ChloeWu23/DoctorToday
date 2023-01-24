<template>
    <div class="wrap">
        <div class="left">
            <DayPilotNavigator id="nav" :config="datePickerConfig" ref="datePicker" :events="events" />
        </div>
        <div class="content">
            <DayPilotCalendar id="dp" :config="calendarConfig" ref="calendar" :events="events" />
        </div>
    </div>
</template>

<script>
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from '@daypilot/daypilot-lite-vue'


let selected_slots_count = 0;

let date = new Date();
let current_year = date.getFullYear();
let current_month = date.getMonth() + 1;
let current_date = date.getDate();
let day = current_year + "-0" + current_month + "-"+ current_date;

export default {
    name: 'AvailabilityPicker',
    data: function () {
        return {
            events: [],
            datePickerConfig: {
                showMonths: 1,
                skipMonths: 1,
                // "Day" highlights the selected day
                // "Week" highlights the week of the selected day
                selectMode: "Day",
                startDate: "2023-01-01",
                selectionDay: "2023-01-07",
                onTimeRangeSelected: args => {
                    // get selected day from navigator
                    this.calendarConfig.startDate = args.day;
                }
            },
            calendarConfig: {
                // "Days" displays a custom number of consecutive days
                // "WorkWeek" displays workdays
                // "Week" displays workdays & weekends
                viewType: "Days",
                days: 3,
                // startDate is set to current date
                startDate: day,
                // openning hours
                businessBeginsHour: 10,
                businessEndsHour: 18,
                // hide non-openning hours
                heightSpec: "BusinessHoursNoScroll",
                timeRangeSelectedHandling: "Enabled",
                
                onTimeRangeSelected: async (args) => {
                    // select up to three slots
                    selected_slots_count++;
                    if (selected_slots_count <= 3) {
                        const modal = await DayPilot.Modal.prompt("Create a new appointment choice:", "select");
                        const dp = args.control;
                        dp.clearSelection();
                        if (modal.canceled) {
                             return;
                        }
                        dp.events.add({
                            start: args.start,
                            end: args.end,
                            id: DayPilot.guid(),
                            text: modal.result
                        });
                    }
                },

                evenClickHandling: "Enabled",
                eventDeleteHandling: "Enabled",
                onEventMoved: () => {
                    console.log("Event moved");
                },
                onEventResized: () => {
                    console.log("Event resized");
                },
            },
        }
    },
    props: {
    },
    components: {
        DayPilotCalendar,
        DayPilotNavigator
    },
    computed: {
        // DayPilot.Calendar object - https://api.daypilot.org/daypilot-calendar-class/
        calendar() {
            return this.$refs.calendar.control;
        },
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
    },
    mounted() {
        this.loadEvents();
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

.calendar_default_event_inner {
    border-radius: 5px;
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
    background-color: rgba(0, 0, 255, 0.846);
    border-radius: 50%;
}

.navigator_default_todaybox {
    border: 2px solid rgb(57, 63, 182);
    border-radius: 50%;
}
</style>

