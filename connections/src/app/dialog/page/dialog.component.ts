import {Component, OnInit} from '@angular/core';

import { ChatComponent } from '../components/chat/chat.component';
import { DialogHeadlineComponent } from '../components/headline/headline.component';
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {TRoutDialog} from "../../groups/components/group-card/group-card.component";
import {ColumnType} from "../../groups/components/group/group.component";
import {QueriesService} from "../../api/services/queries.service";
import {AlertsService} from "../../shared/services/alerts.service";
import {IDialog, IMessage} from "../../redux/interfaces/message";
import {IPeople} from "../../redux/interfaces/groups";
import {setPeople} from "../../redux/actions/people.action";
import {Store} from "@ngrx/store";
import {AppState} from "../../redux/interfaces/state";
import {selectPeople} from "../../redux/selectors/people.selector";
import {take} from "rxjs";


@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogHeadlineComponent,
    ChatComponent
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit{
  dialogID: string = '';
  type: string = '';
  dialog: IMessage[] = [];

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>,
              private router: Router,
              private  query: QueriesService,
              private alertService: AlertsService,) {
  }


  getPeople(){
    this.store.select(selectPeople).pipe(take(1))
      .subscribe((state) => {
        if(state.length){
           const map = state
             .reduce((s, c) => s.set(c.uid.S, c.name.S),
               new Map<string, string>())
           this.getDialog(map);
        } else {
          this.query.getPeople().subscribe(
            (response) => {
              const data = response as IPeople
              this.store.dispatch(setPeople({people: data.Items}));
              const map = data.Items
                .reduce((s, c) => s.set(c.uid.S, c.name.S),
                  new Map<string, string>())
              this.getDialog(map);
            },
            () => {
              const message = 'Failed to load people names';
              this.alertService.updateAlert({ message, type: 'error', isShow: true });
            }
          )
        }
      })


  }

  getDialog(map: Map<string, string>){
    const query = this.type === 'group'
      ? this.query.getGroupByID(this.dialogID)
      : this.query.getPeopleByID(this.dialogID);

    query.subscribe(
      (response) => {
        const data = response as IDialog;
        this.dialog = data.Items.map((e) => ({...e, authorName: map.get(e.authorID.S) || ''}));
      },
      (error) => {
        const message = error.error?.message || `Failed to load data`;
        if(error.error?.type === 'InvalidIDException'){
          this.router.navigateByUrl('**', { skipLocationChange: true });
        }
        this.alertService.updateAlert({ message, type: 'error', isShow: true });
      }
    )
  }

  ngOnInit() {
    [this.type, this.dialogID] = this.route.snapshot.url.map(e => e.path);
    this.getPeople();
  }
}
