import {NgModule} from '@angular/core';

import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {UserService} from './services/user.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {PageLoginComponent} from './pages/page-login/page-login.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {NavbarComponent} from './navbar/navbar.component';
import {AlertModule} from 'ngx-bootstrap';
import {PageHomeComponent} from './pages/page-home/page-home.component';
import {FilterPipe} from './pipes/filter.pipe';
import {PrixPipe} from './pipes/prix.pipe';
import {CommandeService} from './services/commande.service';
import {ScriptService} from './services/script.service';

const appRoutes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: PageLoginComponent},
  {path: 'home', component: PageHomeComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,

    FilterPipe,

    PageLoginComponent,
    PageNotFoundComponent,
    PageHomeComponent,
    PrixPipe,
  ],
  imports: [
    AlertModule,
    BsDropdownModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    BrowserModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService, CommandeService, ScriptService],
  bootstrap: [AppComponent],
  exports: [BsDropdownModule, TooltipModule, ModalModule]
})
export class AppModule {
}
