import {AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {delay, map, Observable} from "rxjs";
import {ajax} from "rxjs/internal/ajax/ajax";
import {AuthService} from "../../shared/services/auth.service";
import {environment as env} from "../../../environments/environment";

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

export function isEmailPresent(): AsyncValidatorFn{
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return checkEmailPresence().pipe(map(res => {
      return res.response.email === control.value ? {emailExists: true} : null
    }))
  }
  function checkEmailPresence(): Observable<any>{
    return ajax.get("https://jsonplaceholder.typicode.com/users/1").pipe(delay(1000));
  }
}


