import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dialog-headline',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.scss'
})
export class DialogHeadlineComponent {
  @Input() isMyGroup: boolean = false;
}
