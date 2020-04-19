import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProfileRoutingModule } from './edit-profile-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EditProfileRoutingModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class EditProfileModule { }
