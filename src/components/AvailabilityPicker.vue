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

export default {
    name: 'AvailabilityPicker',
    data: function () {
        return {
            events: [],
            datePickerConfig: {
                showMonths: 1,
                skipMonths: 1,
                selectMode: "Week",
                startDate: "2023-01-01",
                selectionDay: "2023-01-07",
                onTimeRangeSelected: args => {
                    this.calendarConfig.startDate = args.day;
                }
            },
            calendarConfig: {
                viewType: "Week",
                startDate: "2023-01-01",
                timeRangeSelectedHandling: "Enabled",
                onTimeRangeSelected: async (args) => {
                    const modal = await DayPilot.Modal.prompt("Create a new appointment choice:", "choice");
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
                },
                eventDeleteHandling: "Disabled",
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
            const busy = [
                {
                    id: 1,
                    start: "2023-01-05T10:00:00",
                    end: "2023-01-05T11:00:00",
                    text: "busy",
                    barColor: "#6aa84f",
                },
                {
                    id: 2,
                    start: "2023-01-09T13:00:00",
                    end: "2023-01-09T16:00:00",
                    text: "busy",
                    barColor: "#f1c232",
                },
                {
                    id: 3,
                    start: "2023-01-10T13:30:00",
                    end: "2023-01-10T16:30:00",
                    text: "busy",
                    barColor: "#cc4125",
                },

            ];
            this.events = busy;
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
</style>

