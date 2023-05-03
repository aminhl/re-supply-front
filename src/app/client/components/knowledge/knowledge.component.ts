import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { regexValid } from "../../../core/validators/signup.validator";
import { ScheduleMeetingService } from "../../../shared/services/KnowledgeService/schedule-meeting.service";
import Swal from "sweetalert2";
import { AuthService } from "../../../shared/services/auth.service";
interface RessResponse {
  data: {
    resources: Array<any>
  }
}
@Component({
  selector: 'app-home',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.css']
})
export class KnowledgeComponent implements OnInit {
  id: string;
  searchTerm = '';
  showModal = false;
  showModaledit = false;
  addRessourceForm!: FormGroup;
  title!: FormControl;
  description!: FormControl;
  image!: FormControl;
  files!: FormControl;
  Ressbject= [];
  userconnected:any;
  constructor(private router: Router,private ScheduleService:ScheduleMeetingService,private authservice: AuthService) {
    this.id=uuidv4()
  }

  ngOnInit(): void {
    this.userconnected=this.authservice.getConnectedUserData();
    console.log(this.userconnected)
    this.initform();
    this.createForm();
    this.setRessources();
  }
  setRessources()
{
  this.ScheduleService.getRessources().subscribe(
    (res:RessResponse) => {

      for (let i = 0; i < res.data.resources.length; i++)
      {
        if (res.data.resources[i].status=="accepted")
        {

          this.Ressbject.push(res.data.resources[i])
console.log( this.Ressbject)
        }
      }
    },
    (err) => {
      console.log('Error:', err);
      // Handle error response here
    })
}
  initform(): void {
    this.title = new FormControl('', [Validators.required, regexValid(/[0-9]/g),]);
    this.description = new FormControl('', [Validators.required]);
    this.image = new FormControl('', [Validators.required]);
    this.files = new FormControl('', [Validators.required]);
  }
  createForm(): void {
    this.addRessourceForm = new FormGroup({
      title: this.title,
      description: this.description,
      image: this.image,
      files: this.files,
    });
  }
  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }


  onSubmit() {

    const formData = new FormData();
    formData.append('title', this.addRessourceForm.value.title);
    formData.append('description', this.addRessourceForm.value.description);
    const image = this.addRessourceForm.get('image');
    if (image && image.valid) {
      formData.append('image', image.value, image.value.name);
    }
    const files = this.addRessourceForm.get('files');
    if (files && files.valid) {
      for (let i = 0; i < files.value.length; i++) {
        formData.append('files', files.value[i], files.value[i].name);
      }
    }
    Swal.fire({
      title: 'Are you sure you want to publish this course?',
      text: 'This action cannot be undone',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, Do it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ScheduleService.addRes(formData).subscribe(
          (res) => {

            // Handle success response here
          },
          (err) => {
            console.log('Error:', err);
            // Handle error response here
          }
        );
        Swal.fire('Course pushed', '', 'success');
        this.closeModal();
        setTimeout(()=>{
         location.reload();
        }, 3000);

      }
      if (result.isDenied) {
        this.closeModal();
      }
    });
  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.image.setValue(file);
    this.image.markAsTouched();
  }
  onFilesSelected(event) {
    const files = event.target.files;
    this.addRessourceForm.get('files').setValue(files);
  }



  deleteRes(res: any) {
    console.log(res._id)
    Swal.fire({
      title: 'Are you sure you want to delete this course?',
      text: 'This action cannot be undone',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, Do it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ScheduleService.deleteres(res._id).subscribe(
          (res) => {
            // Handle success response here
          },
          (err) => {
            console.log('Error:', err);
            // Handle error response here
          }
        );
        Swal.fire('Course pushed', '', 'success');
        this.closeModal();
        location.reload();
      }

    }
    )
    ;
  }
}
