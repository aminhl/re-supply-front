import {AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {delay, map, Observable} from "rxjs";
import  {environment as env} from "../../../environments/environment";
import {ajax} from "rxjs/internal/ajax/ajax";
import {AuthService} from "../../shared/services/auth.service";

export function regexValid(regExp: RegExp): ValidatorFn{
  return (control: AbstractControl): { [key: string]: boolean } | null =>{
    if (control.value.match(regExp)) return { invalidData: true}
    return null;
  }
}

export function validatePassword(primaryControl: string, secondaryControl: string){
  return (formGroup: FormGroup): { [key: string]: boolean } | null => {
    const password = formGroup.controls[primaryControl];
    const confirmPassword = formGroup.controls[secondaryControl];
    if (password.dirty && confirmPassword.dirty && confirmPassword.value !== password.value)
      confirmPassword.setErrors({wrongPassword: true});
    return null;
  }
}

export function emailExistsValidator(userService: AuthService) {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {
    const email = control.value;

    return userService.checkEmail(email)
      .pipe(
        map(res => {
          // @ts-ignore
          if (res.exists) return { emailExists: true };
          else return {};
        })
      )
      .toPromise();
  };
}


