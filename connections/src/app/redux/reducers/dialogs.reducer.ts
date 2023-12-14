import { createReducer, on } from '@ngrx/store';

import {
  addGroupDialog,
  addPeopleDialog, clearDialogs,
  deleteGroupDialog,
  updateGroupDialog,
  updatePeopleDialog
} from '../actions/dialogs.action';
import { IDialogState } from '../interfaces/message';

export const dialogState: IDialogState = {
  group: new Map(),
  people: new Map()
};

export const dialogsReducer = createReducer(
  dialogState,
  on(addGroupDialog, (state, { groupName, group }) => ({
    ...state,
    group: new Map(state.group).set(groupName, group)
  })),
  on(updateGroupDialog, (state, { groupName, messages, lastUpdate }) => {
    const dialog = state.group.get(groupName);
    if (dialog) {
      const updatedDialog = { ...dialog, Items: [...dialog.Items, ...messages], lastUpdate };
      return { ...state, group: new Map(state.group).set(groupName, updatedDialog) };
    }
    return state;
  }),
  on(deleteGroupDialog, (state, { groupName }) => {
    const group = new Map(state.group);
    group.delete(groupName);
    return { ...state, group };
  }),
  on(addPeopleDialog, (state, { peopleName, group }) => ({
    ...state,
    people: new Map(state.people).set(peopleName, group)
  })),
  on(updatePeopleDialog, (state, { peopleName, messages, lastUpdate }) => {
    const dialog = state.people.get(peopleName);
    if (dialog) {
      const updatedDialog = { ...dialog, Items: [...dialog.Items, ...messages], lastUpdate };
      return { ...state, people: new Map(state.people).set(peopleName, updatedDialog) };
    }
    return state;
  }),
  on(clearDialogs, (state) => ({ ...state, group: new Map(), people: new Map() }))
);
