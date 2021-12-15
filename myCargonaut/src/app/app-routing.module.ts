import { NgModule } from "@angular/core";

import { Routes, RouterModule } from "@angular/router";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {VerifyEmailComponent} from "./components/verify-email/verify-email.component";
import { AuthGuard } from "./shared/guard/auth.guard";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {MyCasesComponent} from "./components/my-cases/my-cases.component";
import {PrivacyPolicyComponent} from "./components/privacy-policy/privacy-policy.component";

const routes: Routes = [
  { path: "", redirectTo: "/sign-in", pathMatch: "full"},
  { path: "sign-in", component: SignInComponent},
  { path: "register-user", component: SignUpComponent},
  { path: "user-profile", component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "my-cases", component: MyCasesComponent, canActivate: [AuthGuard] },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "verify-email-address", component: VerifyEmailComponent },
  { path: "privacy-policy", component: PrivacyPolicyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
