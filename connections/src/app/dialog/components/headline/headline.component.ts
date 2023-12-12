import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { QueriesService } from '../../../api/services/queries.service';
import { deleteGroup } from '../../../redux/actions/groups.action';
import { deleteConversationPeople } from '../../../redux/actions/people.action';
import { AppState } from '../../../redux/interfaces/state';
import { AlertsService } from '../../../shared/services/alerts.service';

@Component({
  selector: 'app-dialog-headline',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.scss'
})
export class DialogHeadlineComponent implements OnInit {
  @Input() isMyGroup: boolean = false;
  type: string = '';
  dialogID: string = '';
  idDisabled: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private query: QueriesService,
    private alertService: AlertsService
  ) {
  }

  deleteDialog() {
    this.idDisabled = true;
    const query = this.type === 'group'
      ? this.query.deleteGroup(this.dialogID)
      : this.query.deleteConversation(this.dialogID);
    query.subscribe(
      () => {
        if (this.type === 'group') {
          this.store.dispatch(deleteGroup({ groupID: this.dialogID }));
        } else {
          this.store.dispatch(deleteConversationPeople({ conversation: this.dialogID }));
        }
        this.router.navigate(['/']);
      },
      (error) => {
        this.idDisabled = false;
        const message = error.error?.message || `Failed to remove this ${this.type}`;
        this.alertService.updateAlert({ message, type: 'error', isShow: true });
      }
    );
  }

  ngOnInit() {
    [this.type, this.dialogID] = this.route.snapshot.url.map((e) => e.path);
  }
}
