import { Component, OnInit, Input } from '@angular/core';

import { CurrencyService } from '../currency.service';
import { DateService } from '../date.service';

import { Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'currency-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() currencyID: number;

  startDate: Date = this.dateService.getDateNthDayAgo(7);
  endDate: Date = new Date();

  chart = [];

  constructor(private dateService: DateService,
              private currencyService: CurrencyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let param = this.route.snapshot.paramMap.get('id');

    if(param) {
      this.route.params.subscribe(p => {
        this.currencyID = p['id'];
        this.getDynamics();
      })
    } else {
      this.getDynamics();
    }
  }

  getDynamics(): void {
    this.currencyService.getDynamics(this.currencyID, this.startDate, this.endDate)
      .subscribe(dynamics => {
        let curOfficialRates: number[] = dynamics.map(item => item.Cur_OfficialRate);
        let dates: string[] = dynamics.map(item => {
        return item.Date.substring(0, 10);
        });

        Chart.defaults.global.defaultFontColor = '#FFC107';

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: dates,
            datasets: [
              {
                data: curOfficialRates,
                lineTension: 0,
                backgroundColor: '#FFC107',
                fill: true,
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                pointHoverBackgroundColor: '#fff',
              }
            ]
          },
          options: {
            events: ['click'],
            legend: {
              display: false,
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }
          }
        })
      });
  }

  onChange(type: string, event: any) {
    if(type === 'start') {
      this.startDate = event.value._d;
      this.getDynamics();
    } else {
      this.endDate = event.value._d;
      this.getDynamics();
    }
  }

}
