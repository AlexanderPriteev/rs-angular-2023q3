import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { GroupComponent } from '../components/group/group.component';


@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule, GroupComponent],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})

export class GroupsComponent {
}
