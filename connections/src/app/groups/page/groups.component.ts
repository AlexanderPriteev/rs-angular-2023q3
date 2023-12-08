import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { IColumn, IGroups, IPeoples } from '../../redux/interfaces/groups';
import { GroupComponent } from '../components/group/group.component';

const mockPeopleList = {
  Count: 2,
  Items: [
    {
      id: {
        S: '123'
      },
      companionID: {
        S: 'string'
      }
    },
    {
      id: {
        S: '124'
      },
      companionID: {
        S: 'me'
      }
    }
  ]
} as IPeoples;

const mockGroupList = {
  Count: 2,
  Items: [
    {
      id: {
        S: '122'
      },
      name: {
        S: 'me'
      },
      createdAt: {
        S: 'me'
      },
      createdBy: {
        S: 'me'
      }
    },
    {
      id: {
        S: '123'
      },
      name: {
        S: 'test'
      },
      createdAt: {
        S: 'test'
      },
      createdBy: {
        S: 'test'
      }
    }
  ]
} as IGroups;

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule, GroupComponent],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})

export class GroupsComponent {
  groupList: IColumn = {
    type: 'group',
    items: mockGroupList.Items
  };
  peopleList: IColumn = {
    type: 'people',
    items: mockPeopleList.Items
  };
}
