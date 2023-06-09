import { Component } from '@angular/core';
import { TimeService } from '../time-service/time.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  date:Date = new Date();
  readonly maxNumSecondBlocks:number = 10;
  readonly blinkBlockSeconds:number = 2;
  readonly daysOfTheWeek:Array<string> = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


  constructor(){
    setInterval(()=>{
      this.date = new Date();
    },1000);
  }

  //Returns the welcome text
  getWelcomeText():string{
    let dayOfTheWeek = this.daysOfTheWeek[this.date.getDay()];
    let hours = this.date.getHours();
    if (hours>=6 && hours<=11) return "Happy "+dayOfTheWeek+", Have a Good Morning!";
    else if (hours>=12 && hours<=17) return "Happy "+dayOfTheWeek+", Have a Good Afternoon!";
    else if (hours>=18 && hours<=21) return "Happy "+dayOfTheWeek+", Have a Good Evening!";
    else return "Happy "+dayOfTheWeek+", Have a Good Night!";
  }

  //Returns the current date
  getDate():string{
    return (this.date.getMonth()+1)+'/'+this.date.getDate()+'/'+this.date.getFullYear();
  }

  //Returns the current time
  getTime():string{
    return TimeService.getFormattedTime({hours: this.date.getHours(),minutes:this.date.getMinutes()});
  }

  //Returns how many second
  getNumSecondBlocks(maxBlocks:number):number{
    let eachBlockSeconds:number = 60/maxBlocks;
    return Math.ceil(this.date.getSeconds()/eachBlockSeconds);
  }
}