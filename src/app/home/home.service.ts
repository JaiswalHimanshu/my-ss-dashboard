import { Injectable } from "@angular/core";
import "rxjs/Rx";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AmChartsServiceService {
  constructor(private httpClient: HttpClient) {}

  getPartialjsonDataGraph1() {
    return this.httpClient
      .post("http://localhost:3000/api/authi/graph1", null)
      .map(response => {
        return response;
      });
  }

  getPartialjsonDataGraph2() {
    return this.httpClient
      .post("http://localhost:3000/api/authi/graph2", null)
      .map(response => {
        return response;
      });
  }
}
