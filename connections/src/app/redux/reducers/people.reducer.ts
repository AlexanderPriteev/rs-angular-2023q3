import { createReducer, on } from '@ngrx/store';

import {
  addConversationPeople, clearPeople, deleteConversationPeople, setPeople
} from '../actions/people.action';
import { IPeopleItem } from '../interfaces/items';

export const peopleState: IPeopleItem[] = [] as IPeopleItem[];

export const peopleReducer = createReducer(
  peopleState,
  on(setPeople, (_, { people }) => [...people]),
  on(addConversationPeople, (state, { uid, conversation }) => state
    .map((e) => (e.uid.S === uid ? { ...e, conversation } : e))),
  on(clearPeople, () => []),
  on(deleteConversationPeople, (state, { conversation }) => state
    .map((e) => (e.conversation === conversation ? { name: e.name, uid: e.uid } : e)))
);
