import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminModule } from './components/admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    AdminComponent,
  ],
  imports: [BrowserModule, AdminModule, AppRoutingModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
