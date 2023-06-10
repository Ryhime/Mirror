import { Injectable } from '@angular/core';
import { ScheduledEvent } from '../scheduled-event';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private events:Array<ScheduledEvent> | undefined = undefined;
  constructor(){
    this.events = this.loadEvents();
  }
  loadEvents():Array<ScheduledEvent>{
    return [{
      startTime: {hours:7,minutes:30},
      endTime: {hours:16,minutes:30},
      days: [1,2,3,4],
      everyWeek: true,
      name:"Work"
    },
    {
      startTime: {hours:7,minutes:30},
      endTime: {hours:15,minutes:30},
      days: [5],
      everyWeek: true,
      name:"Work"
    },
    {
      startTime: {hours:14,minutes:30},
      endTime: {hours:15,minutes:30},
      days: [0,6],
      everyWeek: true,
      name: "Relaxation"
    },
    {
      startTime: {hours:1,minutes:30},
      endTime: {hours:2,minutes:30},
      days:[6],
      everyWeek:false,
      name:"One time event"
    },
    {
      startTime: {hours:9,minutes:20},
      endTime: {hours:19,minutes:50},
      days:[1,5,6,3,1],
      everyWeek: true,
      name: "Overlapping Event"
    },{
      startTime: {hours: 22,minutes:0},
      endTime: {hours:22,minutes:5},
      days:[1,2,3],
      everyWeek: false,
      name:"Night Stuff"
    }];
  }
  getEvents(){
    return this.events;
  }
}
