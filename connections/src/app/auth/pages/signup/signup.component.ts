import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  isHidePassword = true;
  togglePasswordType() {
    this.isHidePassword = !this.isHidePassword;
  }
}
