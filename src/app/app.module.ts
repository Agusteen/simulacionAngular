import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SpinnerModule } from 'angular2-spinner';

import { AppComponent } from './app.component';
import { HideRowPipe } from './pipes/hide-row.pipe';
import { SetBooleansPipe } from './pipes/set-booleans.pipe';
import { SetNoValuePipe } from './pipes/set-no-value.pipe';
import { FormsModule } from '@angular/forms';


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
    AngularFontAwesomeModule,
    FormsModule,
    SpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
