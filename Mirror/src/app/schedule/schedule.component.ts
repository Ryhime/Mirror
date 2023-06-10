import { Component } from '@angular/core';
import { ScheduledEvent } from '../scheduled-event';
import { ScheduleService } from '../schedule-service/schedule.service';
import { Time } from '@angular/common';
import { TimeService } from '../time-service/time.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  events:Array<ScheduledEvent> | undefined = undefined;
  date:Date = new Date();
  hours:Array<Time> = [];

  constructor(scheduleService:ScheduleService){
    for (let hour:number=0;hour<24;hour++){
      this.hours.push({hours:hour,minutes:0});
    }
    this.events = scheduleService.getEvents();
    this.events = this.sortEvents(this.events);

    setInterval(()=>{
      this.date = new Date();
    },1000);
  }

  getTimePosition():number{
    return (this.date.getHours()*3600+this.date.getMinutes()*60+this.date.getSeconds())/200;
  }

  getEventPosition(time:Time):number{
    return (time.hours*3600+time.minutes*60)/200;
  }

  getEventTitle(event:ScheduledEvent):string{
    let title:string = event.name;
    return title+' - '+TimeService.getFormattedTime(event.startTime)+" to "+TimeService.getFormattedTime(event.endTime);
  }

  getHourTitle(hour:number):string{
    let newHour:string = TimeService.getFormattedHour(hour);
    let afternoon:string = TimeService.getAfternoon(hour);
    return newHour+' '+afternoon;
  }
  
  sortEvents(toSortEvents:Array<ScheduledEvent> | undefined):Array<ScheduledEvent> | undefined{
    if (toSortEvents===undefined) return undefined;
    toSortEvents.sort((a:ScheduledEvent,b:ScheduledEvent)=>{
      return (a.startTime.hours*60+a.startTime.minutes)-(b.startTime.hours*60+b.startTime.minutes);
    });
    return toSortEvents;
  }
}