import { Component } from "@angular/core";
import { HttpService } from "./dashboard.service";
import { Observable } from "rxjs/Rx";

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {
  constructor(private httpser: HttpService) {}
  flagVal = false;
  public users$: any = [];
  public err$: Observable<any>;
  showSpinner: boolean = true;
  list: String[] = [];
  ngAfterViewInit() {
    this.httpser.getPendingActions().subscribe(
      (servers$: any) => {
        this.showSpinner = false;

        if (servers$.res) {
          servers$.res.forEach(element => {
            this.users$.push({
              token: element.token,
              organization: element.organization,
              site_url_list: element.site_url_list,
              google_cx: ""
            });
          });
        } else if (servers$.errorcode) {
          // TODO: Display error
        }
      },
      error => {
        this.showSpinner = false;
        console.error(error);
        this.err$ = error;
      }
    );
  }
  onInvoke(token, google_cx) {
    this.httpser.getUpdateActions(token, google_cx).subscribe(
      (serversnew$: Observable<any>) => {
        this.showSpinner = false;
        this.list.push(token);
      },
      error => {
        this.showSpinner = false;
        console.error(error);
        this.err$ = error;
      }
    );
  }
}
