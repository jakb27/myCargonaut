import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "./app.component";
import {environment} from "../environments/environment";
import {ScreenTrackingService, UserTrackingService} from "@angular/fire/analytics";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {VerifyEmailComponent} from "./components/verify-email/verify-email.component";
import {AppRoutingModule} from "./app-routing.module";
import {AuthService} from "./shared/services/auth.service";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFirestoreModule, SETTINGS} from "@angular/fire/compat/firestore";
import {CaseService} from "./shared/services/case.service";
import {CaseListComponent} from "./components/case-list/case-list.component";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {NewCaseModalComponent} from "./components/new-case-modal/new-case-modal.component";
import {NgbDatepickerModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {MyCasesComponent} from "./components/my-cases/my-cases.component";
import {EditCaseModalComponent} from "./components/edit-case-modal/edit-case-modal.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DateTimePickerComponent} from "./components/custom/datetime-picker.component";
import {PrivacyPolicyComponent} from "./components/privacy-policy/privacy-policy.component";
import { NewVehicleModalComponent } from './components/new-vehicle-modal/new-vehicle-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    CaseListComponent,
    NewCaseModalComponent,
    HeaderComponent,
    FooterComponent,
    UserProfileComponent,
    MyCasesComponent,
    EditCaseModalComponent,
    DateTimePickerComponent,
    PrivacyPolicyComponent,
    NewVehicleModalComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    NgbDatepickerModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ScreenTrackingService, UserTrackingService, AuthService, CaseService,
    {
      provide: SETTINGS,
      useValue: environment.production ? undefined : {
        host: "localhost:8080",
        ssl: false
      }
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
