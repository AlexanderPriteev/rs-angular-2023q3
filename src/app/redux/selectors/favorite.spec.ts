import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from '../interfaces/app-store.interface';
import { ISearchItem } from '../../youtube/interfaces/search-item.interface';
import {testItem} from "../../youtube/companents/search-item/search-item.component.spec";
import { selectItemById} from "./favorite.selector";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {first} from "rxjs";

describe('Favorite Selectors', () => {
  const mockState: ISearchItem[] = [
    {...testItem, id: {...testItem.id, videoId: '1'}},
    {...testItem, id: {...testItem.id, videoId: '2'}},
  ];

  let store: MockStore<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [provideMockStore()],
    });
    store = TestBed.inject(Store) as MockStore<AppState>;
  });

  it('should select favorite items (correct)', async () => {
    store.setState({ favorites: mockState });
    const result = store.select(selectItemById('2'));
    const selectedItem = await result.pipe(first()).toPromise();
    expect(selectedItem).toEqual(mockState[1]);
  });

  it('should select favorite items (invalid)', async () => {
    store.overrideSelector(selectItemById('2'), mockState[1]);
    const result = store.select(selectItemById('3'));
    const selectedItem = await result.pipe(first()).toPromise();
    expect(selectedItem).toBeUndefined();
  });
});
