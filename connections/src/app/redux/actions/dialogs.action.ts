import { createAction, props } from '@ngrx/store';

import { IDialog, IMessage } from '../interfaces/message';

export const addGroupDialog = createAction(
  '[Dialogs] Add Group',
  props<{ groupName: string, group: IDialog }>()
);

export const updateGroupDialog = createAction(
  '[Dialogs] Update Group',
  props<{ groupName: string, messages: IMessage[], lastUpdate: number }>()
);

export const deleteGroupDialog = createAction(
  '[Dialogs] Delete Group',
  props<{ groupName: string }>()
);

export const addPeopleDialog = createAction(
  '[Dialogs] Add People',
  props<{ peopleName: string, group: IDialog }>()
);

export const updatePeopleDialog = createAction(
  '[Dialogs] Update People',
  props<{ peopleName: string, messages: IMessage[], lastUpdate: number }>()
);

export const clearDialogs = createAction(
  '[Dialogs] Clear',
);
