import { Component,  ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import {SearchResultComponent} from "./search/search-result/search-result.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(SearchResultComponent);
    const componentRef = factory.create(this.viewContainerRef.parentInjector);
    this.viewContainerRef.insert(componentRef.hostView);
  }
}
