import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


import { AppComponent } from './app.component';
import { HideRowPipe } from './pipes/hide-row.pipe';
import { SetBooleansPipe } from './pipes/set-booleans.pipe';
import { SetNoValuePipe } from './pipes/set-no-value.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HideRowPipe,
    SetBooleansPipe,
    SetNoValuePipe
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
