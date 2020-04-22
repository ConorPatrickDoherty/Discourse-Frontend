import { Component, OnInit } from '@angular/core';
import { faFeatherAlt, IconDefinition, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials: FormGroup;
  loading: boolean = false;
  hidden = true;

  logo: IconDefinition = faFeatherAlt;
  showPassword: IconDefinition = faEye;
  hidePassword: IconDefinition = faEyeSlash;

  constructor(
    private formBuilder: FormBuilder, 
    public auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSignIn = () => {
    this.loading = true;
    this.auth.SignIn(this.credentials.value)
  }

  GetEmailErrorMessage() {
    if (this.credentials.get('email').hasError('required')) {
      return 'You must enter a value';
    }

    return this.credentials.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  get Email() { return this.credentials.get('email') }
  get Password() { return this.credentials.get('password') }
}
