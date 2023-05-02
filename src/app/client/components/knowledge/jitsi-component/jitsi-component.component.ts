import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../../shared/services/auth.service";
import * as stream from "stream";
import * as sgMail from '@sendgrid/mail';
import { ScheduleMeetingService } from "../../../../shared/services/KnowledgeService/schedule-meeting.service";
import * as crypto from 'crypto-js';

declare var JitsiMeetExternalAPI: any;
@Component({
  selector: 'app-jitsi-component',
  templateUrl: './jitsi-component.component.html',
  styleUrls: ['./jitsi-component.component.css']
})
export class JitsiComponentComponent implements OnInit , AfterViewInit {
  selectedItems: string[] = [];

  domain: string = "meet.jit.si"; // For self hosted use your domain
  room: any;
  options: any;
  api: any;
  user: any;
  userconnected: any;
fullname:any;
  // For Custom Controls
  isAudioMuted = false;
  isVideoMuted = false;
  urltoSend: string;
  users: any;

  private readonly secretKey = 'XXAAA32423412396qsdqsdqsdqsdaz&klklbkofdiobjoisdokp2342KSDK?FSO7DFIHJBçè-&éQSDQSJIDHQSJHI'; // Replace with your own secret key
  encryptedCode: string;
  title: string;
  description: string;
  constructor(
    private router: Router,
    private Authservice:AuthService,
    private ScheduleService:ScheduleMeetingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userconnected= this.Authservice.getConnectedUserData();
    console.log(this.userconnected.email);
    this.encryptedCode = this.route.snapshot.paramMap.get('id');
    const decryptedCode = this.decrypt(this.encryptedCode);
    const codeParts = decryptedCode.split('%');
    this.title = codeParts[0];
    this.description = codeParts[1];
    console.log(this.title,this.description)

    this.ScheduleService.getEmailsForEvent(this.title,this.description ).subscribe(
      (response: any) => {
        this.users = response.data.result;
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i] === this.userconnected.email) {
            this.users.splice(i, 1); // remove the email at index i
            break; // exit the loop after removing one email
          }
        }
        console.log(this.users);

      },
      (error) => console.error(error)
    );

  }

  ngAfterViewInit(): void {
    console.log(this.users);
    this.fullname = this.userconnected?.firstName + ' ' + this.userconnected?.lastName;
    this.room = this.userconnected.firstName+' '+this.userconnected.lastName;
    this.options = {
      roomName: this.room,
      width: 900,
      height: 700,
      configOverwrite: { prejoinPageEnabled: false },
      interfaceConfigOverwrite: {

      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: this.fullname
      }
    };


    this.api = new JitsiMeetExternalAPI(this.domain, this.options);
    this.urltoSend=this.api._url.split('#')[0];


    // Event handlers
    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleMuteStatus,
      videoMuteStatusChanged: this.handleVideoStatus
    });
  }
  handleClose = () => {
  }

  handleParticipantLeft = async (participant) => {
    const data = await this.getParticipants();
  }

  handleParticipantJoined = async (participant) => {
    const data = await this.getParticipants();
  }

  handleVideoConferenceJoined = async (participant) => {
    const data = await this.getParticipants();
  }

  handleVideoConferenceLeft = () => {
    this.router.navigate(['/knowledge']);
  }

  handleMuteStatus = (audio) => {
  }

  handleVideoStatus = (video) => {
  }

  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo()); // get all participants
      }, 500)
    });
  }
  executeCommand(command: string) {
    this.api.executeCommand(command);;
    if(command == 'hangup') {
      this.router.navigate(['/knowledge']);
      return;
    }

    if(command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
    }

    if(command == 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
    }
  }

  returnSelectedItems() {
  console.log(this.selectedItems)
    for (let i = 0; i < this.selectedItems.length; i++) {
      this.sendemail(this.selectedItems[i])
    }
  }
  sendemail(email:string)
  {
    return this.Authservice.sendemail("users/Sendmeetlink",this.urltoSend,email).subscribe((res:any)=>{
    console.log("Email sent")
    })
  }

  decrypt(encryptedText: string): string {
    const decrypted = crypto.AES.decrypt(encryptedText, this.secretKey);
    return decrypted.toString(crypto.enc.Utf8);
  }
}
