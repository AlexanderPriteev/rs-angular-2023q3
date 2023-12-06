import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from "@angular/common";


type TAlert = 'error' | 'success' | 'warning' | 'info'

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss'
})
export class AlertsComponent implements OnInit{
  @Input() value: string = '';
  @Input() type: TAlert = 'info';
  @Output() show = new EventEmitter<boolean>();

  close(): void {
    this.show.emit(false);
  }
  ngOnInit() {
    setTimeout(() => this.close(), 5000);
  }
}
