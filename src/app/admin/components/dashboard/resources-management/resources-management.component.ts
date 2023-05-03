import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AuthService } from "../../../../shared/services/auth.service";
import { AdminService } from "../../../services/admin.service";
import { ProductService } from "../../../../shared/services/product.service";
import { RequestService } from "../../../../shared/services/request.service";
import { HttpClient } from "@angular/common/http";
import { ScheduleMeetingService } from "../../../../shared/services/KnowledgeService/schedule-meeting.service";
import Swal from "sweetalert2";
import { environment as env } from "../../../../../environments/environment";

@Component({
  selector: 'app-resources-management',
  templateUrl: './resources-management.component.html',
  styleUrls: ['./resources-management.component.css']
})
export class ResourcesManagementComponent implements OnInit {
  currentPage = 1;
  verified: Boolean;
  role: String;
  ressources: any;
  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private SchuduleService: ScheduleMeetingService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getAllRessources()
  }
  deleteRessource(ressourceid: any) {
    Swal.fire({
      title: 'Are you sure you want to delete this Ressource?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.SchuduleService.deleteres(ressourceid).subscribe((res)=>
        {
          console.log(res)
          this.getAllRessources();
        })
            Swal.fire('Ressource deleted', '', 'success');

      }
    });
  }
  acceptRessource(ressourceid: string) {
    const ressource = this.ressources.find((p: any) => p._id === ressourceid);
    if (ressource.status === 'accepted') {
      Swal.fire('Product already accepted', '', 'warning');
      return;
    }
    Swal.fire({
      title: 'Are you sure you want to accept this product?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, accept it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .patch(`${env.apiRoot}resources/accept/${ressourceid}`, {})
          .subscribe(() => {
            this.getAllRessources();
            Swal.fire('Product accepted', '', 'success');
          });
      }
    });
  }
  getAllRessources() {
    return this.SchuduleService.getRessources().subscribe((response: any) => {
      console.log(response)
      this.ressources = response.data.resources.map((product: any) => {
        if (product.status === 'pending') {
          product.color = '#ffe6e6';
        } else if (product.status === 'accepted') {
          product.color = '#e6ffed';
        }
        return product;
      });
    });
  }
}
