import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Sale } from '../../models/Sale';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { TopPart } from '../../models/TopPart';

Chart.register(...registerables);


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements AfterViewInit{

  sales: Sale[] = [];

  public chartType: 'bar' = 'bar';

  constructor(private dashboradService: DashboardService){

  }

  ngAfterViewInit(): void {
    this.loadTop5();
  }


  loadTop5(): void{
    this.dashboradService.getTopParts().subscribe(data =>{
      this.renderChart(data);
    })
  }

  renderChart(data: TopPart[]): void {
    new Chart('topPartsChart', {
      type: 'bar',
      data: {
        labels: data.map(p => `${p.name} (${p.code})`),
        datasets: [{
          label: 'Unidades Vendidas',
          data: data.map(p => p.totalSold),
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(255, 205, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(54, 162, 235, 0.7)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)'
          ],
          borderWidth: 2,
          borderRadius: 6
        }]
      },
      options: {
        indexAxis: 'y', // barras horizontales
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.raw} unidades vendidas`
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: { stepSize: 1 }
          }
        }
      }
    });
  }

}
