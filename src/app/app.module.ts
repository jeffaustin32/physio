import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
// Services
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth-guard/auth-guard.service';

// Layout Components
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

// Content components
import { LoginComponent } from './components/login/login.component';
import { MapsComponent } from './components/maps/maps.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { InvoiceModule, invoiceModuleRoutes } from './components/invoices/invoice.module';
import { DashboardModule, dashboardModuleRoutes } from './components/dashboard/dashboard.module';
import { ClientModule, clientModuleRoutes } from './components/clients/client.module';
import { SessionModule, sessionModuleRoutes } from './components/sessions/session.module';
import { AccountModule, accountModuleRoutes } from './components/account/account.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    MapsComponent,
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    SimpleNotificationsModule.forRoot(),
    FormsModule,
    HttpModule,
    InvoiceModule,
    RouterModule.forRoot(invoiceModuleRoutes),
    DashboardModule,
    RouterModule.forRoot(dashboardModuleRoutes),
    ClientModule,
    RouterModule.forRoot(clientModuleRoutes),
    SessionModule,
    RouterModule.forRoot(sessionModuleRoutes),
    AccountModule,
    RouterModule.forRoot(accountModuleRoutes),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'maps', component: MapsComponent },      
      { path: '404', component: NotFoundComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: '404'}
    ])
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
