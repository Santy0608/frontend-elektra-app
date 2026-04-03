import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Sale } from '../../models/Sale';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { TopPart } from '../../models/TopPart';
import { CriticalStock } from '../../models/CriticalStock';

Chart.register(...registerables);


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements AfterViewInit{

  sales: Sale[] = [];
  private criticalStockChart: Chart | null = null; 


  public chartType: 'bar' = 'bar';

  constructor(private dashboradService: DashboardService){

  }

  ngAfterViewInit(): void {
    this.loadTop5();
    this.loadCriticalStock();
  }


  loadTop5(): void{
    this.dashboradService.getTopParts().subscribe(data =>{
      this.renderChart(data);
    })
  }

  loadCriticalStock(): void{
    this.dashboradService.getCriticalStock().subscribe(data => {
      this.renderCriticalStockChart(data);
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

   renderCriticalStockChart(data: CriticalStock[]): void {
    if (this.criticalStockChart) {
      this.criticalStockChart.destroy();
    }

    this.criticalStockChart = new Chart('criticalStockChart', {
      type: 'bar',
      data: {
        labels: data.map(p => `${p.name} (${p.code})`),
        datasets: [
          {
            label: 'Stock Actual',
            data: data.map(p => p.stock),
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            borderRadius: 6
          },
          {
            label: 'Stock Mínimo',
            data: data.map(p => p.minimumStock),
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw} unidades`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 }
          }
        }
      }
    });
  }

}
