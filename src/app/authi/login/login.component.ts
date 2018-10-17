import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthiService } from "../authi.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  isLoading = false;

  constructor(public authService: AuthiService) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
  }
}
