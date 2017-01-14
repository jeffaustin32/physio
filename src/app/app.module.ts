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
import { InvoiceModule, invoiceModuleRoutes } from './invoices/invoice.module';
import { DashboardModule, dashboardModuleRoutes } from './dashboard/dashboard.module';
import { ClientModule, clientModuleRoutes } from './clients/client.module';
import { SessionModule, sessionModuleRoutes } from './sessions/session.module';
import { AccountModule, accountModuleRoutes } from './account/account.module';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
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
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login' }
    ])
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
