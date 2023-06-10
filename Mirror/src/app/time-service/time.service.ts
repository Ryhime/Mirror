import { Time } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  static getAfternoon(hour:number):string{
    return hour<12?"AM":"PM";
  }
  static getFormattedHour(hour:number):string{
    if (hour==0 || hour==12) return "12";
    return (hour%12).toString();
  }
  static getFormattedMinutes(minutes:number):string{
    let newMinutes:string = minutes.toString();
    if (newMinutes.length===1) return '0'+newMinutes;
    return newMinutes;
  }
  static getFormattedTime(time:Time):string{
    let hours:string = this.getFormattedHour(time.hours);
    let minutes:string = this.getFormattedMinutes(time.minutes);
    let afternoon:string = this.getAfternoon(time.hours);
    return hours+':'+minutes+' '+afternoon;
  }
}
