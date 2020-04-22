import { Component, OnInit } from '@angular/core';
import { IconDefinition, faFeatherAlt, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  credentials: FormGroup
  hidden = true;
  
  logo: IconDefinition = faFeatherAlt
  showPassword: IconDefinition = faEye;
  hidePassword: IconDefinition = faEyeSlash;

  constructor(
    private formBuilder: FormBuilder, 
    public auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onCreateUser = () => {
    this.auth.SignUp(this.credentials.value)
  }

  GetEmailErrorMessage() {
    if (this.credentials.get('email').hasError('required')) {
      return 'You must enter a value';
    }

    return this.credentials.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  get Username() { return this.credentials.get('username') }
  get Email() { return this.credentials.get('email') }
  get Password() { return this.credentials.get('password') }
}
