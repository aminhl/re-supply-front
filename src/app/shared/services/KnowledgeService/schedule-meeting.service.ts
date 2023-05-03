import { Injectable } from '@angular/core';
import { environment as env } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScheduleMeetingService {

  constructor( public http: HttpClient, private router: Router,) { }

  addSchedule(target: string, title:any,date:any,description:any) {
    const requestBody = {
      title,
      date,
      description
    };
  return this.http.post(env.apiRoot + target, requestBody, {
  withCredentials: true,
});
}

  getEvents() {
    return this.http.get(env.apiRoot+"ScheduleMeeting");
  }

  getuserInEvent(eventTitle:any,eventDescription:any)
  {
    const requestBody = {
      eventTitle,
      eventDescription
    };
    return this.http.post(env.apiRoot+"ParticipationEvents/getuserInEvent",requestBody);
  }
  participateToEvent(eventTitle:any,eventDate:any,eventDescription:any)
  {
    const requestBody = {
      eventTitle,
      eventDate,
      eventDescription
    };
    return this.http.post(env.apiRoot+"ParticipationEvents",requestBody);
  }
  getMeetingforUserConnected(user:any)
  {
    const requestBody = {
      user
    };
    return this.http.post(env.apiRoot+"ScheduleMeeting/findMeetWithIdUser",requestBody);
  }
  getEmailsForEvent(eventTitle:any,eventDescription:any)
  {
    const requestBody = {
      eventTitle,
      eventDescription
    };
    return this.http.post(env.apiRoot+"ParticipationEvents/getEmailsForEvent",requestBody)
  }
  addRes( requestBody: FormData){
    console.log(requestBody)
    return this.http.post(env.apiRoot + "resources", requestBody, {
      withCredentials: true,
    })
  };


  getRessources() {
    return this.http.get(env.apiRoot+ "resources");
  }

  deleteres(_id:number) {
    return this.http.delete(env.apiRoot+"resources/"+_id)
  }

  getRessource(id: any)
  {
    return this.http.get(env.apiRoot+"resources/get/"+id)
  }

  UdemyNotification() {
    return  this.http.get("http://localhost:8189/courses")
  }
}
