import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../shared/services/auth.service";
import { ScheduleMeetingService } from "../../../../shared/services/KnowledgeService/schedule-meeting.service";
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto-js';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from "rxjs";

interface MeetingResponse {
  data: {
    result: Array<any>
  }
}
@Component({
  selector: 'app-list-meeting',
  templateUrl: './list-meeting.component.html',
  styleUrls: ['./list-meeting.component.css']
})
export class ListMeetingComponent implements OnInit {
    userconnected: any;
    Meetingobject:any
  id: string;
  private readonly secretKey = 'XXAAA32423412396qsdqsdqsdqsdaz&klklbkofdiobjoisdokp2342KSDK?FSO7DFIHJBçè-&éQSDQSJIDHQSJHI'; // Replace with your own secret key

  constructor(private authservice:AuthService,private Scheduleservice : ScheduleMeetingService,private router:Router) {
    this.id=uuidv4()

  }

  ngOnInit(): void {
    this.authservice.getUser().subscribe((res)=>
    {
      this.userconnected=res
      this.Scheduleservice.getMeetingforUserConnected(this.userconnected.data['user']._id).subscribe((req: MeetingResponse) => {
        this.Meetingobject = req.data.result; // extract the result array from the data object
        console.log(this.Meetingobject);
      });
    })
  }

  isToday(date: string): boolean {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const parts = date.split(/-|T/); // Split the string using "-" and "T" as separators
    const year1 = parts[0];
    const month1 = parts[1];
    const day1 = parts[2];

    const formattedDate1 = `${year1}-${month1}-${day1}`;
    return formattedDate==formattedDate1;
  }


  encrypt(plainText: string): string {
    const encrypted = crypto.AES.encrypt(plainText, this.secretKey);
    return encrypted.toString();
  }



  StartMeet(title: string, description: string) {
    const code = title + '%' + description;
    const encryptedCode = this.encrypt(code);
    this.router.navigate(["knowledge/jitsi/",encryptedCode]);
  }

  getParticipationCount(title: string, description: string): Observable<number> {
    return this.Scheduleservice.getEmailsForEvent(title, description).pipe(
      map((response: any) => response.data.result.length),
      catchError((error) => {
        console.error(error);
        return of(0);
      })
    );
  }
}
