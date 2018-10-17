import { Injectable } from "@angular/core";
import "rxjs/Rx";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  getPendingActions() {
    return (
      this.httpClient
        // .post("http://192.168.1.15:3001/d-cs/admin/pendingDashboardActions", null)
        .post("http://localhost:3000/api/authi/pendingActions", null)
        .map(response => {
          return response;
        })
    );
  }

  getUpdateActions(token, google_cx) {
    return (
      this.httpClient
        // .post("http://192.168.1.15:3001/d-cs/admin/updateDashboardActions", {
        //   token: token,
        //   google_cx: google_cx
        // })
        .post("http://localhost:3000/api/authi/updateActions", {
          token: token,
          google_cx: google_cx
        })
        .map(response => {
          console.log(response);
          return response;
        })
    );
  }
}
