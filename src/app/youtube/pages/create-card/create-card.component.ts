import { Component, OnInit } from '@angular/core';
import {
  FormArray, FormControl, FormGroup, ValidationErrors, Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { addNewToFavorites } from '../../../redux/actions/favorite.actions';
import { AppState } from '../../../redux/interfaces/app-store.interface';
import { selectFavoriteItems } from '../../../redux/selectors/favorite.selector';
import { ISearchItem } from '../../interfaces/search-item.interface';
import { dateValidate } from './validator';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {
  private itemTypeName = 'newItem';

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

  setErrorLabel = (
    isValid: boolean,
    errors: ValidationErrors | null,
    key: string,
    index: number | null = null
  ): boolean => {
    let [value, result] = ['', isValid];
    if (errors) {
      result = false;
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
    return result;
  };

  constructor(private store: Store<AppState>) {}

  reset(): void {
    this.createForm.reset();
    Object.keys(this.errorValue).forEach((key) => {
      if (Array.isArray(this.errorValue[key])) this.errorValue[key] = [''];
      else this.errorValue[key] = '';
    });
    for (let index = this.tags.length - 1; index > 0; index -= 1) {
      this.tags.removeAt(index);
    }
  }

  create(): void {
    let isCreate = true;
    Object.keys(this.createForm.controls).forEach((key) => {
      if (key === 'tags') {
        this.tags.controls.forEach((tag, index) => {
          isCreate = this.setErrorLabel(isCreate, tag.errors, key, index);
        });
      } else {
        const { errors } = this.createForm.controls[key];
        isCreate = this.setErrorLabel(isCreate, errors, key);
      }
    });
    if (isCreate) {
      const newCard: ISearchItem = {
        kind: this.itemTypeName,
        etag: this.createForm.controls['video'].value,
        id: {
          kind: 'myVideo',
          videoId: `id-${new Date().getTime()}`
        },
        snippet: {
          title: this.createForm.controls['title'].value,
          description: this.createForm.controls['description'].value || '',
          publishedAt: `${new Date(this.createForm.controls['dateCreation'].value)}`,
          publishedTime: `${new Date()}`,
          tags: this.createForm.controls['tags'].value,
          thumbnails: {
            default: this.createForm.controls['img'].value,
            medium: this.createForm.controls['img'].value,
            high: this.createForm.controls['img'].value,
          },
          categoryId: '',
          channelTitle: '',
          liveBroadcastContent: 'none',
        }
      } as ISearchItem;
      this.store.dispatch(addNewToFavorites({ searchItem: newCard }));
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
  ngOnInit() {
    this.store.select(selectFavoriteItems).subscribe((state) => {
      const myItems = state.filter((e) => e.kind === this.itemTypeName);
      localStorage.setItem('store', JSON.stringify(myItems));
    });
  }
}
