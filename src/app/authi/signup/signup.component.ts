import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthiService } from "../authi.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent {
  isLoading = false;
  constructor(public authiService: AuthiService) {}
  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authiService.createUser(form.value.email, form.value.password);
  }
}
