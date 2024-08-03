import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrl: './statistical.component.scss'
})
export class StatisticalComponent implements OnInit {
  constructor() { }
  public configBar: any = {
    type: 'bar',
    data: {
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
      datasets: [{
        label: 'Số lượng bán',
        data: [65, 59, 80, 81, 56, 55, 40, 50, 65, 59, 80, 81],
        fill: false,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
        tension: 0.1
      },
      {
        label: 'Doanh thu',
        data: [28, 48, 40, 19, 86, 27, 80, 50, 65, 59, 80, 81],
        fill: false,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgb(153, 102, 255)',
        borderWidth: 1,
        tension: 0.1
      }
    ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  public configLine: any = {
    type: 'line',
    data: {
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
      datasets: [{
        label: 'Tỉ lệ đơn hoàn thành',
        data: [65, 59, 80, 81, 56, 55, 40, 50, 65, 59, 80, 81],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
        tension: 0.1
      },
      {
        label: 'Tỉ lệ đơn bị hủy',
        data: [28, 48, 40, 19, 86, 27, 80, 50, 65, 59, 80, 81],
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
        tension: 0.1
      }
    ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }

  chartBar: any;
  chartLine: any;
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.chartBar = new Chart('canvas', this.configBar);
    this.chartLine = new Chart('canvas2', this.configLine);
  }
}
