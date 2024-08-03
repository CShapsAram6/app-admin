import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'chart.js';
import { StatisticalService } from '../../../services/statistical.service';
import { TopProductDto } from '../../../model/statistical.model';
Chart.register(...registerables);
@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrl: './statistical.component.scss'
})
export class StatisticalComponent implements OnInit {
  constructor(private statisticalService: StatisticalService) { }
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
  statistical: any;
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number | null = null;
  topProduct: TopProductDto[] = [];
  totalOrder: any;
  ngOnInit(): void {
    this.loadData();
    this.loadRevenue(this.selectedYear);
    this.loadTopProduct();
    this.loadRatioOrder();
    this.loadTotalOrder();
  }
  ngAfterViewInit(): void {
    this.chartBar = new Chart('canvas', this.configBar);
    this.chartLine = new Chart('canvas2', this.configLine);
  }
  loadData() {
    this.statisticalService.getData().subscribe(res => {
      this.statistical = res.data;
    })
  }
  onYearSelect(year: number) {
    this.selectedYear = year;
    this.selectedMonth = null; // Bỏ chọn tháng khi chọn năm mới
    this.loadRevenue(year); // Tải dữ liệu theo năm
  }

  onMonthSelect(month: number) {
    this.selectedMonth = month;
    this.loadRevenueMonthYear(this.selectedYear, this.selectedMonth);
  }
  loadRevenue(year: number) {
    this.statisticalService.getRevenue(year).subscribe(res => {
      this.configBar.data.labels = res.data.month;
      this.configBar.data.datasets[0].data = res.data.quantitySold;
      this.configBar.data.datasets[1].data = res.data.revenue;
      this.chartBar.update();
      console.log(res);
    })
  }

  loadRevenueMonthYear(year: number, month: number) {
    this.statisticalService.getRevenueByMonthYear(year, month).subscribe(res => {
      this.configBar.data.labels = res.data.month;
      this.configBar.data.datasets[0].data = res.data.quantitySold;
      this.configBar.data.datasets[1].data = res.data.revenue;
      this.chartBar.update();
      console.log(res);
    })
  }

  loadTopProduct() {
    this.statisticalService.getTopProduct().subscribe(res => {
      this.topProduct = res.data;
      console.log(this.topProduct);
    })
  }

  loadRatioOrder() {
    this.statisticalService.getRatioOrder().subscribe(res => {
      this.configLine.data.datasets[0].data = res.data.orderComplete;
      this.configLine.data.datasets[1].data = res.data.orderCancel;
      this.chartLine.update();
      console.log(res.data);
    })
  }

  loadTotalOrder() {
    this.statisticalService.getTotalOrder().subscribe(res => {
      this.totalOrder = res.data;
      console.log(res);
    })
  }
}
