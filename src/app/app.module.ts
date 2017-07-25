import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ResumeComponent } from './resume/resume.component';
import { PokerComponent} from "./poker/poker.component";
import { PayTableComponent } from './pay-table/pay-table.component';
import {SuitComponent} from "./poker/suit.component";
import {CardValueComponent} from "./poker/card-value.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResumeComponent,
    PokerComponent,
    PayTableComponent,
    SuitComponent,
    CardValueComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: 'resume', component: ResumeComponent},
        {path: 'poker', component: PokerComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'}
    ], {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
