import { Component, OnInit } from "@angular/core";
import { AuthiService } from "../../authi/authi.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  checkAuth = false;
  constructor(private auth: AuthiService) {}
  ngOnInit() {
    this.checkAuth = this.auth.getIsAuth();
  }
  onLogout() {
    this.auth.logout();
  }
}
