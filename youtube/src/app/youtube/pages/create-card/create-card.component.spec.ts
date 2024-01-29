import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';

import { favoriteReducer } from '../../../redux/reducers/favorite.reducer';
import { ButtonModule } from '../../../shared/modules/button.module';
import { CreateCardComponent } from './create-card.component';

describe('CreateCardComponent', () => {
  let component: CreateCardComponent;
  let fixture: ComponentFixture<CreateCardComponent>;
  let store: Store;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCardComponent],
      imports: [
        ReactiveFormsModule,
        ButtonModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('favorites', favoriteReducer),
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(CreateCardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true', () => {
    const key = 'title';
    const result = component.setErrorLabel(true, null, key, null);
    expect(result).toBeTruthy();

    const index = 0;
    component.errorValue[key] = [];
    component.setErrorLabel(true, null, key, index);
    expect(component.errorValue[key][index]).toContain('');
  });

  it('should return false ( case required)', () => {
    const key = 'title';
    const result = component.setErrorLabel(true, { required: true }, key, null);
    expect(result).toBeFalsy();
    expect(component.errorValue[key]).toContain('Please enter a');
    component.setErrorLabel(true, { minlength: true }, key, null);
    expect(component.errorValue[key]).toContain('short');
    component.setErrorLabel(true, { maxlength: true }, key, null);
    expect(component.errorValue[key]).toContain('long');
    component.setErrorLabel(true, { test: true }, key, null);
    expect(component.errorValue[key]).toContain('invalid');
  });

  it('should reset the form and error values', () => {
    component.tags.push(new FormControl('', [Validators.required]));
    component.createForm.setValue({
      title: 'title',
      description: 'description',
      img: 'link',
      video: 'link',
      dateCreation: 'Test Date',
      tags: ['test', 'test']
    });
    component.errorValue = { title: 'error' };

    component.reset();
    expect(component.createForm.value).toEqual({
      title: null,
      description: null,
      img: null,
      video: null,
      dateCreation: null,
      tags: [null]
    });
    expect(component.errorValue['title']).toEqual('');
  });

  it('should add a tag to the tags', () => {
    const initialLength = component.tags.length;
    component.addTagInput();
    expect(component.tags.length).toEqual(initialLength + 1);
    component.addTagInput();
    expect(component.tags.length).toEqual(initialLength + 2);
    for (let i = 0; i < 10; i += 1) component.addTagInput();
    expect(component.tags.length).toEqual(5);
  });

  it('should remove a tag from the tags', () => {
    const initialLength = component.tags.length;
    component.addTagInput();
    component.removeTagInput(1);
    expect(component.tags.length).toEqual(initialLength);
  });

  it('should create a new card and navigate to favorites', () => {
    jest.spyOn(store, 'dispatch').mockImplementation();
    jest.spyOn(component.router, 'navigate');

    component.createForm.setValue({
      title: 'title',
      description: 'description',
      img: 'link',
      video: 'link',
      dateCreation: 'Test Date',
      tags: ['test']
    });

    component.create();
    expect(store.dispatch).toHaveBeenCalled();
    expect(component.router.navigate).toHaveBeenCalledWith(['/favorite']);
  });
});
