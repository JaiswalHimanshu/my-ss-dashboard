import { Component, OnInit } from "@angular/core";
import { AmChartsService } from "@amcharts/amcharts3-angular";
import { AmChartsServiceService } from "./am-charts-service.service";
import * as firebase from "firebase";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyBnn9DNlv6lOfuHPH3Lb7QqMeVc8YBCRRw",
      authDomain: "auth-d2d1f.firebaseapp.com"
    });
  }

  constructor(
    private AmCharts: AmChartsService,
    private serverService: AmChartsServiceService
  ) {}

  ngAfterViewInit() {
    this.serverService.getPendingActions().subscribe(
      (servers: any[]) => {
        this.AmCharts.makeChart("chartdiv1", {
          type: "serial",
          theme: "light",
          autoMargins: false,
          marginLeft: 30,
          marginRight: 8,
          marginTop: 10,
          marginBottom: 26,

          fontFamily: "Open Sans",
          color: "#888",
          dataProvider: [
            servers[0],
            servers[1],
            servers[2],
            servers[3],
            servers[4],
            servers[5]
          ],
          valueAxes: [
            {
              axisAlpha: 0,
              position: "left"
            }
          ],
          startDuration: 1,
          graphs: [
            {
              alphaField: "alpha",
              balloonText:
                "<span style='font-size:13px;'>[[title]] in [[category]]:<b>[[value]]</b> [[additional]]</span>",
              dashLengthField: "dashLengthColumn",
              fillAlphas: 1,
              title: "Income",
              type: "column",
              valueField: "income"
            },
            {
              balloonText:
                "<span style='font-size:13px;'>[[title]] in [[category]]:<b>[[value]]</b> [[additional]]</span>",
              bullet: "round",
              dashLengthField: "dashLengthLine",
              lineThickness: 3,
              bulletSize: 7,
              bulletBorderAlpha: 1,
              bulletColor: "#FFFFFF",
              useLineColorForBulletBorder: true,
              bulletBorderThickness: 3,
              fillAlphas: 0,
              lineAlpha: 1,
              title: "Expenses",
              valueField: "expenses"
            }
          ],
          categoryField: "year",
          categoryAxis: {
            gridPosition: "start",
            axisAlpha: 0,
            tickLength: 0
          }
        });
      },
      error => console.error(error)
    );
  }

  ngOnDestroy() {}
}
