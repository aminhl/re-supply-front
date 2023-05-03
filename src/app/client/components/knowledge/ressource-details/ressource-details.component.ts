import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../../shared/services/auth.service";
import { ScheduleMeetingService } from "../../../../shared/services/KnowledgeService/schedule-meeting.service";
interface RessResponse {
  data: {
    resource: Array<any>
  }
}
@Component({
  selector: 'app-ressource-details',
  templateUrl: './ressource-details.component.html',
  styleUrls: ['./ressource-details.component.css']
})
export class RessourceDetailsComponent implements OnInit {
   ressourceid: any;
  ressource: any;
  constructor(
    private route: ActivatedRoute ,
    private Authservice:AuthService,
    private ScheduleService:ScheduleMeetingService,) { }

  ngOnInit(): void {
    this.ressourceid = this.route.snapshot.paramMap.get('id');
    this.ScheduleService.getRessource(this.ressourceid).subscribe((res:RessResponse)=>{
      this.ressource=res.data.resource;
    })
  }





}
