import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  times:Array<number> = [];

  awakeTime:string = "6";
  awakeAfternoon:"AM" | "PM" = "AM";

  sleepTime:string = "10";
  sleepAfternoon:"AM" | "PM" = "PM";

  constructor(){
    for(let i:number=0;i<13;i++){
      this.times.push(i);
    }
  }

  changedAwakeTime(newValue:string):void{
    this.awakeTime = newValue;

  }
  changedAwakeAfternoon(newValue:string):void{
    if (newValue!=="AM" && newValue!=="PM") return;
    this.awakeAfternoon = newValue;
  }

  changedSleepTime(newValue:string):void{
    this.sleepTime = newValue;
  }
  changedSleepAfternoon(newValue:string):void{
    if (newValue!=="AM" && newValue!=="PM") return;
    this.sleepAfternoon = newValue;
  }
}
