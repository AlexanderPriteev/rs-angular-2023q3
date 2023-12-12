import { createAction, props } from '@ngrx/store';

import { IPeopleItem } from '../interfaces/items';

export const setPeople = createAction(
  '[People] Set',
  props<{ people: IPeopleItem[] }>()
);

export const addConversationPeople = createAction(
  '[People] Add Conversation',
  props<{ uid: string, conversation: string }>()
);

export const clearPeople = createAction(
  '[People] Clear',
);
