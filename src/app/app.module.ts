import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { AmChartsServiceService } from "./am-charts-service.service";
import { HomeComponent } from "./home/home.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HttpService } from "./dashboard/dashboard.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { LoadingSpinnerComponent } from "./ui/loading-spinner/loading-spinner.component";
import { NavbarComponent } from "./ui/navbar/navbar.component";
import { LoginComponent } from "./authi/login/login.component";
import { SignupComponent } from "./authi/signup/signup.component";
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthiService } from "./authi/authi.service";
import { AuthInterceptor } from "./authi/authi-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    LoadingSpinnerComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmChartsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    BrowserAnimationsModule
  ],
  providers: [
    AmChartsServiceService,
    HttpService,
    AuthiService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
