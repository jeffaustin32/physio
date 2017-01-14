import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

// Services
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth-guard/auth-guard.service';

// Layout Components
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

// Content components
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientComponent } from './clients/client/client.component';
import { SessionComponent } from './sessions/session/session.component';
import { InvoiceComponent } from './invoices/invoice/invoice.component';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    HeaderComponent,
    ClientComponent,
    SessionComponent,
    InvoiceComponent,
    AccountComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
      { path: 'client', canActivate: [AuthGuard], component: ClientComponent },
      { path: 'session', canActivate: [AuthGuard], component: SessionComponent },
      { path: 'invoice', canActivate: [AuthGuard], component: InvoiceComponent },
      { path: 'account', canActivate: [AuthGuard], component: AccountComponent },
      { path: '**', redirectTo: 'login' }
    ]),
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
