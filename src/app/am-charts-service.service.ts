import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/Rx";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AmChartsServiceService {
  constructor(private httpClient: HttpClient) {}

  getPendingActions() {
    return this.httpClient
      .get("https://json-pull-49fc6.firebaseio.com/.json")
      .map(response => {
        return response;
      });
  }
}
