import { Component } from '@angular/core';
import {
  FormArray, FormControl, FormGroup, ValidationErrors, Validators
} from '@angular/forms';

import { dateValidate } from './validator';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent {
  tags: FormArray = new FormArray([
    new FormControl('', [Validators.required])
  ]);
  createForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    description: new FormControl('', [Validators.maxLength(255)]),
    img: new FormControl('', [Validators.required]),
    video: new FormControl('', [Validators.required]),
    dateCreation: new FormControl('', [Validators.required, dateValidate()]),
    tags: this.tags
  });

  errorValue: { [k: string]: string | string[] } = {
    title: '',
    description: '',
    img: '',
    video: '',
    dateCreation: '',
    tags: ['']
  };
  private errorTitle: { [k: string]: string } = {
    title: 'title',
    description: 'description',
    img: 'link to the image',
    video: 'link to the video',
    dateCreation: 'creation date',
    tags: 'tag'
  };

  reset(): void {
    this.createForm.reset();
    Object.keys(this.errorValue).forEach((key) => {
      this.errorValue[key] = '';
    });
    for (let index = this.tags.length - 1; index > 0; index -= 1) {
      this.tags.removeAt(index);
    }
  }

  create(): void {
    let isCreate = true;
    const setErrorLabel = (errors: ValidationErrors | null, key: string, index: number | null = null): void => {
      let value = '';
      if (errors) {
        isCreate = false;
        switch (Object.keys(errors)[0]) {
          case 'required':
            value = `Please enter a ${this.errorTitle[key]}`;
            break;
          case 'minlength':
            value = `The ${this.errorTitle[key]} is too short`;
            break;
          case 'maxlength':
            value = `The ${this.errorTitle[key]} is too long`;
            break;
          default:
            value = `The ${this.errorTitle[key]} is invalid`;
        }
      } else {
        value = '';
      }
      if (typeof index === 'number') {
        (this.errorValue[key] as string[])[index] = value;
      } else {
        this.errorValue[key] = value;
      }
    };

    Object.keys(this.createForm.controls).forEach((key) => {
      if (key === 'tags') {
        this.tags.controls.forEach((tag, index) => {
          setErrorLabel(tag.errors, key, index);
        });
      } else {
        const { errors } = this.createForm.controls[key];
        setErrorLabel(errors, key);
      }
    });
    if (isCreate) {
      console.log(`New card: ${JSON.stringify((this.createForm.value))}`);
    }
  }

  addTagInput(): void {
    if (this.tags.length < 5) {
      this.tags.push(new FormControl('', [Validators.required]));
    }
  }

  removeTagInput(index: number): void {
    this.tags.removeAt(index);
  }
}
