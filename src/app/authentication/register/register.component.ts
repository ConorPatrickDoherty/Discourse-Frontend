import { Component, OnInit } from '@angular/core';
import { IconDefinition, faFeatherAlt } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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

  onCreateUser = async () => {
    await this.auth.SignUp(this.credentials.value)
    await this.auth.SignIn(this.credentials.value)
  }
}
