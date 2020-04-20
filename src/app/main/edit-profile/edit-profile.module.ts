import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProfileRoutingModule } from './edit-profile-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgxFileHelpersModule } from 'ngx-file-helpers';
import { FileDropDirective } from 'src/app/directives/file-drop.directive';
import { EditProfileComponent } from '../edit-profile/edit-profile/edit-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditProfileComponent,
    FileDropDirective
  ],
  imports: [
    CommonModule,
    NgxFileHelpersModule,
    EditProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class EditProfileModule { }
