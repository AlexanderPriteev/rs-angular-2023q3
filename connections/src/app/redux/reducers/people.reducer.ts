import { createReducer, on } from '@ngrx/store';
import { IPeopleItem} from "../interfaces/items";
import {clearPeople, setPeople} from "../actions/people.action";

export const peopleState: IPeopleItem[] = [] as IPeopleItem[];

export const peopleReducer = createReducer(
  peopleState,
  on(setPeople, (_, { people }) => [...people]),
  on(clearPeople, () => [])
)
