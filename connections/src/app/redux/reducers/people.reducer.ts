import { createReducer, on } from '@ngrx/store';

import { clearPeople, setPeople } from '../actions/people.action';
import { IPeopleItem } from '../interfaces/items';

export const peopleState: IPeopleItem[] = [] as IPeopleItem[];

export const peopleReducer = createReducer(
  peopleState,
  on(setPeople, (_, { people }) => [...people]),
  on(clearPeople, () => [])
);
