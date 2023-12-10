import { createReducer, on } from '@ngrx/store';
import {IGroupItem} from "../interfaces/items";
import {addGroup, clearGroup, deleteGroup, setGroups} from "../actions/groups.action";

export const groupsState: IGroupItem[] = [] as IGroupItem[];

export const groupsReducer = createReducer(
  groupsState,
  on(setGroups, (_, { groups }) => [...groups]),
  on(addGroup, (state, {group}) => [group, ...state]),
  on(deleteGroup, (state, {groupID}) => state
    .filter((e: IGroupItem) => e.id.S !== groupID)),
  on(clearGroup, () => [])
)
