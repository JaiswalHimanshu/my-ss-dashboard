import { Component } from "@angular/core";
import { AmChartsService } from "@amcharts/amcharts3-angular";
import { AmChartsServiceService } from "./home.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  constructor(
    private AmCharts: AmChartsService,
    private serverService: AmChartsServiceService
  ) {}

  set_data = {
    grp: [
      {
        t: "2018-06-11",
        c: 6
      },
      {
        t: "2018-06-13",
        c: 20
      },
      {
        t: "2018-06-14",
        c: 30
      },
      {
        t: "2018-06-15",
        c: 4
      },
      {
        t: "2018-06-18",
        c: 20
      },
      {
        t: "2018-06-19",
        c: 2
      },
      {
        t: "2018-06-22",
        c: 6
      },
      {
        t: "2018-06-25",
        c: 37
      },
      {
        t: "2018-06-26",
        c: 7
      },
      {
        t: "2018-06-27",
        c: 11
      },
      {
        t: "2018-06-28",
        c: 11
      }
    ],
    top: {
      head: "Top 10 searches",
      body: [
        {
          s: "America",
          c: 51
        },
        {
          s: "Kuwait",
          c: 10
        },
        {
          s: "Aditya Kambagiri",
          c: 9
        },
        {
          s: "torque",
          c: 8
        },
        {
          s: "business",
          c: 6
        },
        {
          s: "(480) 884-152",
          c: 4
        },
        {
          s: "Sia",
          c: 2
        },
        {
          s: "force",
          c: 2
        },
        {
          s: "Aishwarya Raghuvara",
          c: 1
        },
        {
          s: "Sushmitha",
          c: 1
        },
        {
          s: "Sushmitha Raj",
          c: 1
        }
      ]
    },
    stats: {
      total_count: [
        {
          t: "Current day",
          c: 11
        },
        {
          t: "Current week",
          c: 29
        },
        {
          t: "Current month",
          c: 154
        },
        {
          t: "Total",
          c: 154
        }
      ]
    }
  };

  ngAfterViewInit() {
    this.serverService.getPartialjsonDataGraph1().subscribe(
      (servers: any[]) => {
        this.AmCharts.makeChart("chartdiv1", {
          type: "serial",
          theme: "dark",
          autoMargins: false,
          marginLeft: 30,
          marginRight: 8,
          marginTop: 10,
          marginBottom: 26,

          fontFamily: "Open Sans",
          color: "black",
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

    this.serverService.getPartialjsonDataGraph2().subscribe((servers: any) => {
      let pagedata = this.set_data.grp.map(function(elem) {
        return { date: elem.t, volume: elem.c };
      });

      this.AmCharts.makeChart("chartdiv2", {
        type: "stock",

        dataSets: [
          {
            title: "first data set",
            fieldMappings: [
              {
                fromField: "volume",
                toField: "volume"
              }
            ],
            dataProvider: pagedata,
            categoryField: "date"
          }
        ],
        panels: [
          {
            title: "Volume",
            stockGraphs: [
              {
                id: "g1",
                valueField: "volume",
                balloonText: "[[title]]:<b>[[value]]</b>"
              }
            ],
            stockLegend: {
              periodValueTextRegular: "[[value.close]]"
            }
          }
        ],
        chartScrollbarSettings: {
          graph: "g1"
        },
        chartCursorSettings: {
          valueBalloonsEnabled: true,
          fullWidth: true,
          cursorAlpha: 0.1
        },
        periodSelector: {
          position: "bottom",
          servers
        },
        export: {
          enabled: true
        }
      });
    });
  }

  ngOnDestroy() {}
}
