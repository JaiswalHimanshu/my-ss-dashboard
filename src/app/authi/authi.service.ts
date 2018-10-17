import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "firebase";
import { HttpClient } from "@angular/common/http";
import { AuthiData } from "./authi-data.model";

@Injectable({ providedIn: "root" })
export class AuthiService {
  private isAuthenticated = false;
  private token: string;
  constructor(private router: Router, private http: HttpClient) {}

  getIsAuth() {
    return this.isAuthenticated;
  }

  getToken() {
    return this.token;
  }

  createUser(email: string, password: string) {
    const authiData: AuthiData = { email: email, password: password };
    this.http
      .post("http://localhost:3000/api/authi/signup", authiData)
      .subscribe((result: any) => {
        if (result.usercreated) {
          alert("User created with email and password");
        } else {
          alert("Error: User cannot be created");
        }
      });
  }

  login(email: string, password: string) {
    const authiData: AuthiData = { email: email, password: password };
    this.http
      .post("http://localhost:3000/api/authi/login", authiData)
      .subscribe((result: any) => {
        if (result.auth) {
          this.isAuthenticated = true;
          this.router.navigate(["/home"]);
          const token = result.token;
          this.token = token;
        } else {
          alert("Incorrect Username or password");
        }
      });
  }

  logout() {
    firebase.auth().signOut();
    this.isAuthenticated = false;
  }
}
