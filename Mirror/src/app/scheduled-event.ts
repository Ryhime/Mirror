import {Time} from "@angular/common";
export interface ScheduledEvent {
    startTime: Time,
    endTime: Time,
    days:Array<number>,
    everyWeek: boolean,
    name: string
}