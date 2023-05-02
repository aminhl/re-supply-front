import { Component,ChangeDetectorRef, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid'
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { ScheduleMeetingService } from "../../../../shared/services/KnowledgeService/schedule-meeting.service";
import { map, Observable } from "rxjs";
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { EventInput } from '@fullcalendar/core';
import { AuthService } from "../../../../shared/services/auth.service";

@Component({
  selector: 'app-schedule-meeting',
  templateUrl: './schedule-meeting.component.html',
  styleUrls: ['./schedule-meeting.component.css']
})
export class ScheduleMeetingComponent implements OnInit {
  allowparticipate:boolean;
  displayModal: boolean = false;
  selectedEvent: any;
  INITIAL_EVENTS: EventInput[] = []
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: this.INITIAL_EVENTS,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventClick: this.handleEventClick.bind(this),
    validRange: {
      start: new Date(),
      end: '2100-01-01'
    }
  };
  private userconnected: any;
  handleEventClick(eventInfo: any) {
    const event = eventInfo.event;
    const title = event.title;
    const date = event.start.toLocaleDateString();
    const description = event.extendedProps.description;
    this.selectedEvent = {
      title: title,
      date: date,
      description: description
    };
    this.ScheduleService.getuserInEvent(title,description).subscribe((res)=>
    {
      console.log(res)
      this.allowparticipate=!res['data'].result;
    })
    this.displayModal = true;
  }
  currentEvents: EventApi[] = [];
  ScheduleForm: FormGroup;
  displayMaximizable: boolean;
  onDateClick(res: { dateStr: string; }) {
    alert('You clicked on : ' + res.dateStr)
  }
  constructor(private ScheduleService:ScheduleMeetingService,private formBuilder: FormBuilder,private changeDetector: ChangeDetectorRef,    private Authservice:AuthService,
  ) {
    this.createForm();
  }
  ngOnInit() {
    this.setCalendar().subscribe((events: any[]) => {
      this.currentEvents = events;
      this.calendarOptions = {
        initialView: "dayGridMonth",
        plugins: [dayGridPlugin],
        dateClick: this.onDateClick.bind(this),
        events: this.currentEvents,
      };
    });
  }

  participate(title: string | HTMLTitleElement | SVGTitleElement, date: string, description: string) {

  Swal.fire({
    title: 'Are you sure you want to participate this event ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'Discard',
  }).then((result) => {
    if (result.isConfirmed) {
      this.ScheduleService.participateToEvent(title,date,description).subscribe((res)=>
      {
        Swal.fire('You will receive an email in the date '+date+' that contains the link to the meet', '', 'success');
      })
    }
    if (!result.isConfirmed) {
      this.cancel();
    }
  });
    this.displayModal = false;
  }
  cancel() {
    this.displayModal = false;
  }
  showMaximizableDialog() {
    this.displayMaximizable = true;
  }
  createForm() {
    this.ScheduleForm = this.formBuilder.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  onSubmit() {

    let title= this.ScheduleForm.get('title').value
    let date= this.ScheduleForm.get('date').value
    let description= this.ScheduleForm.get('description').value
    console.log('Form data:', this.ScheduleForm.get('date').value);
    this.ScheduleService.addSchedule("ScheduleMeeting",title,date,description).subscribe(
      (data) => {
        console.log('Response:', data);
        this.ScheduleService.participateToEvent(title,date,description).subscribe((res)=>
        {
          console.log('Response:', res);
          location.reload()
        })

      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  setCalendar(): Observable<any[]> {
    const colors = ["red", "blue", "green",  "orange", "purple"]; // array of colors to choose from
    return this.ScheduleService.getEvents().pipe(
      map((res: any) => {
        return res.data.schedulemeeting.map((schedulemeeting) => {
          const date = new Date(schedulemeeting.date);
          const isoDate = date.toISOString().slice(0, 10); // get YYYY-MM-DD
          const randomColor = colors[Math.floor(Math.random() * colors.length)]; // generate a random color from the array
          return {
            title: schedulemeeting.title,
            date: isoDate,
            description: schedulemeeting.description,
            color: randomColor, // assign the random color to the event
          };
        });
      })
    );
  }

  confirm2() {
    Swal.fire({
      title: 'Are you sure you want to cancel your work?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Discard',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Meet Deleted', '', 'success');
      }
      if (!result.isConfirmed) {
        this.showMaximizableDialog();
      }
    });
  }
  confirm1() {
    Swal.fire({
      title: 'Are you sure you want to publish this Meet event?',
      text: 'This action cannot be undone',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, Do it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.onSubmit();
        Swal.fire('Meet event created', '', 'success');
      }
      if (result.isDenied) {
        this.confirm2();
      }
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.displayMaximizable = true;
    this.ScheduleForm.get('date').setValue(selectInfo.startStr)
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
}
