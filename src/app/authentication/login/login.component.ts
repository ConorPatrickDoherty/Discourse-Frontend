import { Component, OnInit } from '@angular/core';
import { faFeatherAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logo: IconDefinition = faFeatherAlt
  credentials: FormGroup

  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService) {
    
  }

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  onSignIn = () => this.auth.SignIn(this.credentials.value)
}
