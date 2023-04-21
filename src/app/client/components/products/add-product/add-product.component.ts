import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ProductService} from "../../../../shared/services/product.service";
import {Router} from "@angular/router";
import {regexValid} from "../../../../core/validators/signup.validator";
import { AuthService } from "../../../../shared/services/auth.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  //form controls
  addProductForm!: FormGroup;
  name!: FormControl;
  description!: FormControl;
  price!: FormControl;
  images!: FormControl;
  user:any;
  userImageUrl!: string;



  constructor(private authService: AuthService, private productService: ProductService,private router: Router) {
    this.initform();
    this.createForm();
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((req)=>{

      this.user = req.data.user;
      if (this.user.images.length > 0) {
        this.userImageUrl = this.user.images[0];
      }
    });
  }
  initform(): void {
    this.name = new FormControl('', [Validators.required,regexValid(/[0-9]/g)]);
    this.description = new FormControl('', [Validators.required]);
    this.price = new FormControl('', [Validators.required,regexValid(/[A-Za-z]/g)]);
    this.images = new FormControl('', [Validators.required]);
  }
  createForm(): void {
    this.addProductForm = new FormGroup({
      name: this.name,
      description: this.description,
      price: this.price,
      images: this.images,
    });
  }
  onSubmit(): void {
    const formData = new FormData();
    formData.append('name', this.addProductForm.value.name);
    formData.append('description', this.addProductForm.value.description);
    formData.append('price', this.addProductForm.value.price);
    const images = this.addProductForm.get('images');
    if (images && images.valid) {
      formData.append('images', images.value, images.value.name);
    }

    this.productService.addProduct('products/', formData).subscribe((response: any) => this.router.navigate(['/productSubmission']));
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.images.setValue(file);
    this.images.markAsTouched();
  }

}

