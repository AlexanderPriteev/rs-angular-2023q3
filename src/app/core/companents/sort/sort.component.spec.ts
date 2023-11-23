import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortComponent } from './sort.component';
import {SortService} from "../../services/sort.service";


class MockSortService {
  triggerSort(): void {}
  triggerFilter(): void {}
}


describe('SortComponent', () => {
  let component: SortComponent;
  let fixture: ComponentFixture<SortComponent>
  let sortService: SortService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortComponent],
      providers: [
        { provide: SortService, useClass: MockSortService }
      ]
    });
    fixture = TestBed.createComponent(SortComponent);
    component = fixture.componentInstance;
    sortService = TestBed.inject(SortService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call sortService', () => {
    const triggerSortSpy = jest.spyOn(sortService, 'triggerSort');
    component.onSort('date');
    expect(triggerSortSpy).toHaveBeenCalledWith('date');
    component.onSort('count');
    expect(triggerSortSpy).toHaveBeenCalledWith('count');
  });

  it('should call sortService', () => {
    const triggerFilterSpy = jest.spyOn(sortService, 'triggerFilter');
    const inputElement = document.querySelector('.sorting__search') as HTMLInputElement;
    inputElement.value = 'test';

    const event = new Event('input');
    jest.spyOn(event, 'target', 'get').mockReturnValue(inputElement);
    component.onInput(event);

    expect(triggerFilterSpy).toHaveBeenCalledWith('test');
  });

});
