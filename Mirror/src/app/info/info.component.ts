import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  date:Date = new Date();
  maxNumSecondBlocks:number = 10;
  blinkBlockSeconds:number = 2;


  constructor(){
    setInterval(()=>{
      this.date = new Date();
    },1000);
  }
  //Returns the current date
  getDate():string{
    return (this.date.getMonth()+1)+'/'+this.date.getDate()+'/'+this.date.getFullYear();
  }
  //Returns the current time
  getTime():string{
    let hour:string = (this.date.getHours()%12).toString();
    let minute:string = (this.date.getMinutes()).toString();
    minute = (minute.length==1?'0':'')+minute;
    return hour+':'+minute+(this.date.getHours()>=12?' PM':' AM');
  }
  //Returns how many second 
  getNumSecondBlocks(maxBlocks:number):number{
    let eachBlockSeconds:number = 60/maxBlocks;
    console.log(this.date.getSeconds()/eachBlockSeconds);
    return Math.floor(this.date.getSeconds()/eachBlockSeconds);
  }
}
