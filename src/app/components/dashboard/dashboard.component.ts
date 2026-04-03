import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Sale } from '../../models/Sale';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { TopPart } from '../../models/TopPart';
import { CriticalStock } from '../../models/CriticalStock';
import { TopCustomer } from '../../models/TopCustomer';
import { MonthlySale } from '../../models/MonthlySale';

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
  private topCustomersChart: Chart | null = null;
  private monthlySalesChart: Chart | null = null;

  currentYear: number = new Date().getFullYear();


  public chartType: 'bar' = 'bar';

  constructor(private dashboradService: DashboardService){

  }

  ngAfterViewInit(): void {
    this.loadTop5();
    this.loadCriticalStock();
    this.loadTopCustomers();
    this.loadSalesByMonth();
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

  loadTopCustomers(): void{
    this.dashboradService.getTopCustomers().subscribe(data => {
      console.log('Top customers:', data);
      this.renderTopCustomersChart(data);
    })
  }

  loadSalesByMonth(): void{
    this.dashboradService.getSalesByMonth().subscribe(data => {
      this.renderMonthlySalesChart(data);
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

  renderTopCustomersChart(data: TopCustomer[]): void {
    if (this.topCustomersChart) {
      this.topCustomersChart.destroy();
    }

    this.topCustomersChart = new Chart('topCustomersChart', {
      type: 'bar',
      data: {
        labels: data.map(c => c.fullName),
        datasets: [
          {
            label: 'Total Gastado ($)',
            data: data.map(c => c.totalSpent),
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 2,
            borderRadius: 6,
            xAxisID: 'xLeft'  
          },
          {
            label: 'Cantidad de Compras',
            data: data.map(c => c.totalOrders),
            backgroundColor: 'rgba(153, 102, 255, 0.7)',
            borderColor: 'rgb(153, 102, 255)',
            borderWidth: 2,
            borderRadius: 6,
            xAxisID: 'xRight' 
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                if (ctx.dataset.label === 'Total Gastado ($)') {
                  return ` $${Number(ctx.raw).toLocaleString('es-CL')}`;
                }
                return ` ${ctx.raw} compras`;
              }
            }
          }
        },
        scales: {
          xLeft: {           
            type: 'linear',
            position: 'bottom',  
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total ($)'
            }
          },
          xRight: {          
            type: 'linear',
            position: 'top', 
            beginAtZero: true,
            grid: { drawOnChartArea: false },
            title: {
              display: true,
              text: 'Compras'
            }
          }
        }
      }
    });
  }

  renderMonthlySalesChart(data: MonthlySale[]): void {
    if (this.monthlySalesChart) {
      this.monthlySalesChart.destroy();
    }

    this.monthlySalesChart = new Chart('monthlySalesChart', {
      type: 'line',
      data: {
        labels: data.map(s => this.dashboradService.translateMonth(s.month)),
        datasets: [
          {
            label: 'Ingresos ($)',
            data: data.map(s => s.totalRevenue),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.1)',
            borderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: true,
            tension: 0.4,       
            yAxisID: 'yRevenue'
          },
          {
            label: 'Cantidad de Ventas',
            data: data.map(s => s.totalOrders),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            borderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: true,
            tension: 0.4,
            yAxisID: 'yOrders'
          }
        ]
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index',        
          intersect: false
        },
        plugins: {
          legend: { display: true },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                if (ctx.dataset.label === 'Ingresos ($)') {
                  return ` $${Number(ctx.raw).toLocaleString('es-CL')}`;
                }
                return ` ${ctx.raw} ventas`;
              }
            }
          }
        },
        scales: {
          yRevenue: {
            type: 'linear',
            position: 'left',
            beginAtZero: true,
            title: {
              display: true,
              text: 'Ingresos ($)'
            },
            ticks: {
              callback: (value) => `$${Number(value).toLocaleString('es-CL')}`
            }
          },
          yOrders: {
            type: 'linear',
            position: 'right',
            beginAtZero: true,
            grid: { drawOnChartArea: false },
            title: {
              display: true,
              text: 'Ventas'
            },
            ticks: { stepSize: 1 }
          }
        }
      }
    });
  }

}
