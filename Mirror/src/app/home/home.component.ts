import { Component } from '@angular/core';
import { TimeService } from '../time-service/time.service';
enum Weather{
  Sun = 'Sun',
  Cloud = 'Cloud',
  Rain = 'Rain',
  Snow = 'Snow'
}
enum Day{
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  //Date/Time
  date:Date = new Date();
  readonly maxNumSecondBlocks:number = 10;
  readonly blinkBlockSeconds:number = 2;

  //Weather
  readonly forecastURL = 'https://api.weather.gov/gridpoints/PHI/41,81/forecast';
  forecastJson:any | undefined | null = undefined;



  constructor(){
    //Get/Update date
    setInterval(()=>{
      this.date = new Date();
    },1000);

    try{
      fetch(this.forecastURL).then((response)=>{return response.text()}).     
      then((responseText)=>{this.forecastJson = JSON.parse(responseText);}); 
    }
    catch(e){
      this.forecastJson = null;
    }
  }

  //Returns the welcome text
  getWelcomeTextTop():string{
    let dayOfTheWeek = Day[this.date.getDay()];
    return "Happy "+dayOfTheWeek;
  }

  getWelcomeTextBottom():string{
    let hours = this.date.getHours();
    if (hours>=6 && hours<=11) return "Have a Good Morning!";
    else if (hours>=12 && hours<=17) return "Have a Good Afternoon!";
    else if (hours>=18 && hours<=21) return "Have a Good Evening!";
    else return "Have a Good Night!";
  }

  //Returns the current date
  getDate():string{
    return (this.date.getMonth()+1)+'/'+this.date.getDate()+'/'+this.date.getFullYear();
  }

  //Returns the current time
  getTime():string{
    return TimeService.getFormattedTime({hours: this.date.getHours(),minutes:this.date.getMinutes()});
  }

  //Returns how many second blocks
  getNumSecondBlocks(maxBlocks:number):number{
    let eachBlockSeconds:number = 60/maxBlocks;
    return Math.ceil(this.date.getSeconds()/eachBlockSeconds);
  }

  //Get the weather string
  getRawWeatherForecast(futureIndex:number):string | undefined | null{
    if (!this.forecastJson) return this.forecastJson;
    return this.forecastJson.properties.periods[futureIndex].detailedForecast;
  }

  //Gets a basic version of the forecast
  getWeatherForecast(futureIndex:number):string | undefined | null{
    if (!this.forecastJson) return this.forecastJson;
    const rawWeatherForecast = this.getRawWeatherForecast(futureIndex)!.toLowerCase();
    for (let weather in Weather){
      console.log(weather.toString());
      if (rawWeatherForecast.includes(weather.toLowerCase())) return weather;
    }
    return '';
  }

  //Get image url for the weather
  getWeatherImage(futureIndex:number):string{
    const forecast:string | undefined | null = this.getWeatherForecast(futureIndex);
    if (!forecast) return '';
    switch (forecast){
      case 'Cloud': return "../../assets/images/Cloudy.png";
      case 'Sun': return "../../assets/images/Sun.png";
      case 'Rain': return "../../assets/images/Rain.png";
      case 'Snow': return "../../assets/images/Snow.png";
    }
    return '';
  }

  //Get temperature
  getTemperature(futureIndex:number):number | undefined | null{
    if (!this.forecastJson) return this.forecastJson;
    return this.forecastJson.properties.periods[futureIndex].temperature;
  }

  //Get precipitation chance
  getPrecipitationChance(futureIndex:number):number | undefined | null{
    if (!this.forecastJson) return this.forecastJson;
    const prob = this.forecastJson.properties.periods[futureIndex].probabilityOfPrecipitation.value;
    if (!prob) return 0;
    return prob;
  }

  //Get wind speed
  getWindSpeed(futureIndex:number):string{
    if (!this.forecastJson) return this.forecastJson;
    return this.forecastJson.properties.periods[futureIndex].windSpeed;
  }

  //Get if the time period is day or not
  getIsDayTime(futureIndex:number):boolean{
    if (!this.forecastJson) return false;
    return this.forecastJson.properties.periods[futureIndex].isDaytime;
  }
}
