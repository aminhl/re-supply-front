import { Component, ElementRef, OnInit, ViewChild,NgZone } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { environment as env } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, Observable } from "rxjs";

import Swal from "sweetalert2";
declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  fbReady = false;

  @ViewChild('loginref',{static : true}) loginElement: ElementRef;
  auth2: any;
  token!: string;
  errorMessage!: string;

  loginForm!: FormGroup;
  email!: FormControl;
  password!: FormControl;
  recaptcha!: FormControl;
  code?: number;
  captchaSiteKey: string = env.CAPTCHA_SITE_KEY
  submitted: boolean = false;
  user: SocialUser;
  loggedIn: boolean;
  userProfile: any = null;
  myImageFile: File;

  constructor(public authService: AuthService, private router: Router,private authServiceSocial: SocialAuthService, private http: HttpClient,private ngZone: NgZone) {
    this.authServiceSocial.authState.subscribe(user => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    this.initControls();
    this.createForm();
  }
  ngOnInit(): void {
    this.loadFacebookSDK();
    this.googleInitialize();
  }
  /*Google Sign in */
  /*SDK Configuration for Google */
  googleInitialize() {
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '631867203803-gfnbuj33563dmuorhmfm6cv2prqasulq.apps.googleusercontent.com',
          cookie_policy: 'single_host_origin',
          scope: 'profile email '
        });
        this.prepareLogin();
      });
    }
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }
  /*Sign in method */
  prepareLogin() {
    let exist = false;
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        /*Sign up*/
        this.authService.checkEmail(profile.getEmail()).subscribe(
          (response)=> {
            if (response.exists==false)
            {
              const formData = new FormData();
              formData.append('firstName',profile.getGivenName() );
              formData.append('lastName',profile.getFamilyName() );
              formData.append('email',profile.getEmail());
              formData.append('phoneNumber', "00000000");
              formData.append('password',env.PasswordGoogleGenerator);
              formData.append('confirmPassword',env.PasswordGoogleGenerator);
              this.createImageFile(this.imageProxyUrl(profile.getImageUrl()),profile.getGivenName()+profile.getFamilyName()).subscribe(result => {
                const imageFileValue = result.value;
                const imageFileName = result.name;
                formData.append('images',imageFileValue,imageFileName );
                this.authService.signup('users/signupoAuth', formData).subscribe((responsesingup: any) =>
                {
                  const loginData = {
                    email: profile.getEmail(),
                    password: env.PasswordGoogleGenerator,
                  };
                  this.authService.login('users/login', loginData).subscribe(
                    (response: any) => {
                      if ( response != null &&((response.data != null &&response.data.user != null &&response.data.usertwoFactorAuth===true) ||(response.user != null && response.user.twoFactorAuth === true))
                      ) {
                        localStorage.setItem('email', loginData.email);
                        localStorage.setItem('password', loginData.password);
                        this.router.navigate(['twoFactor']);
                      } else {
                        localStorage.setItem('jwt', response.token);
                        this.ngZone.run(() => {
                          this.router.navigate(['']);
                        });
                      }
                    },
                  );
                });
              });

            }
            else
            {
              const loginData = {
                email: profile.getEmail(),
                password: env.PasswordGoogleGenerator,
              };
              this.authService.login('users/login', loginData).subscribe(
                (response: any) => {
                  if ( response != null &&((response.data != null &&response.data.user != null &&response.data.usertwoFactorAuth===true) ||(response.user != null && response.user.twoFactorAuth === true))
                  ) {
                    localStorage.setItem('email', loginData.email);
                    localStorage.setItem('password', loginData.password);
                    this.router.navigate(['twoFactor']);
                  } else {
                    localStorage.setItem('jwt', response.token);
                    this.ngZone.run(() => {
                      // Perform navigation code here
                      this.router.navigate(['']);
                    });
                  }
                },
              );
            }
          }
        );
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
  /*Facebook Sign in */
  /*SDK Configuration for Facebook */
  loadFacebookSDK(): void {
    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '759249972475126',
        cookie: true,
        xfbml: true,
        version: 'v13.0'
      });
      FB.AppEvents.logPageView();
      FB.getLoginStatus(response => {
        this.fbReady = true;
      });
    };
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
  /*Sign in method */
  loginWithFacebook(): void {
    FB.login((response) => {
      if (response.authResponse) {
        FB.api('/me?fields=name,email,picture', (response) => {
          this.userProfile = response;
          const nameArr = this.userProfile.name.split(' ');
          const firstName = nameArr[0];
          const lastName = nameArr[nameArr.length - 1];
          this.authService.checkEmail(this.userProfile.email).subscribe(  (response)=>
          {
            if (response.exists==false)
            {
              this.createImageFile(this.imageProxyUrl(this.userProfile.picture.data.url),this.userProfile.name+this.userProfile.name).subscribe(result => {
                const imageFileValue = result.value;
                const imageFileName = result.name;
                const formData = new FormData();
                formData.append('firstName',firstName );
                formData.append('lastName',lastName );
                formData.append('email',this.userProfile.email);
                formData.append('phoneNumber', "00000000");
                formData.append('password',env.PasswordFacebookGenerator );
                formData.append('confirmPassword',env.PasswordFacebookGenerator );
                formData.append('images',imageFileValue,imageFileName );
                this.authService.signup('users/signupoAuth', formData).subscribe(responsesingup =>
                {
                  const loginData = {
                    email: this.userProfile.email,
                    password: env.PasswordFacebookGenerator,
                  }
                  this.authService.login('users/login', loginData).subscribe(
                    (response: any) => {
                        localStorage.setItem('jwt', response.token);
                        this.ngZone.run(() => {
                          this.router.navigate(['']);
                        });
                    },
                  );
                });
              })
            }
            else
            {
              const loginData = {
                email: this.userProfile.email,
                password: env.PasswordFacebookGenerator,
              };
              this.authService.login('users/login', loginData).subscribe(
                (response: any) => {
                  if ( response != null &&((response.data != null &&response.data.user != null &&response.data.usertwoFactorAuth===true) ||(response.user != null && response.user.twoFactorAuth === true))
                  ) {
                    localStorage.setItem('email', loginData.email);
                    localStorage.setItem('password', loginData.password);
                    this.router.navigate(['twoFactor']);
                  } else {
                    localStorage.setItem('jwt', response.token);
                    this.ngZone.run(() => {
                      // Perform navigation code here
                      this.router.navigate(['']);
                    });
                  }
                },
              );
            }
          });

        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  }

  /*Basic Sign in */
  initControls(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.recaptcha = new FormControl('', [Validators.required]);
  }
  createForm(): void {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
      recaptcha: this.recaptcha
    });
  }
  onSubmit() {
    this.submitted = true;
    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    if(this.recaptcha.value !== ""){
      this.authService.login('users/login', loginData).subscribe(
        (response: any) => {
          if ( response != null &&((response.data != null &&response.data.user != null &&response.data.usertwoFactorAuth===true) ||(response.user != null && response.user.twoFactorAuth === true))
          ) {
            localStorage.setItem('email', loginData.email);
            localStorage.setItem('password', loginData.password);
            this.router.navigate(['twoFactor']);
          } else {
            localStorage.setItem('jwt', response.token);
            this.router.navigate(['']);
          }
        },
        () => {
          this.errorMessage = 'Invalid username or password.';
          this.router.navigate(['login']);
        }
      );
    }
  }

  createImageFile(photoUrl: string, fileName: string): Observable<{ value: File, name: string }> {
    // Make a GET request for the image and convert it to a blob
    return this.http.get(photoUrl, {
      responseType: 'blob'
    }).pipe(
      map(blob => {
        // Create a new File object using the blob and the file name
        const imageFile = new File([blob], fileName, { type: blob.type });
        return { value: imageFile, name: imageFile.name };
      })
    );
  }

  imageProxyUrl(url: string): string {
    const proxyUrl = 'http://localhost:8080/';
    return proxyUrl + url;
  }
}


