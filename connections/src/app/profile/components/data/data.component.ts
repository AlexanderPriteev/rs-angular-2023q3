import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-data',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss'
})
export class ProfileDataComponent {
  isEdit: boolean = false;
  nameValue: string = 'Alexander Priteev';
  editedNameValue: string = this.nameValue;
  @ViewChild('nameField') nameField!: ElementRef;

  editMode() {
    this.isEdit = true;
    this.nameField.nativeElement.select();
  }
  cancelEdit() {
    this.isEdit = false;
    this.nameValue = this.editedNameValue;
  }
  saveEdit() {
    this.isEdit = false;
    this.editedNameValue = this.nameValue;
  }
}
