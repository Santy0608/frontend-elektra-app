import { Component, OnInit } from '@angular/core';
import { Sale } from '../../models/Sale';
import { ChartData, ChartOptions } from 'chart.js';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  sales: Sale[] = [];

  public chartType: 'bar' = 'bar';

  constructor(private dashboradService: DashboardService){

  }

  public chartData: ChartData<'bar'> = { 
    labels: [],
    datasets: [{
      label: 'Ventas Totales',
      data: [],
      backgroundColor: 'rgba(52, 152, 219, 0.8)',
      borderColor: 'rgba(52, 152, 219, 1)',
      borderWidth: 1,
      borderRadius: 4 
    }]
  };

  ngOnInit(): void {    
    this.dashboradService.getTotalSales().subscribe({ 
        next: (data) => {
            console.log("Datos del backend: ", data);
            
            const labels = data.map(v => this.dateFormatted(v.date)); 
            const valores = data.map(v => v.total);

            this.chartData.labels = labels;
            this.chartData.datasets[0].data = valores;

            this.chartData = { ...this.chartData }; 
        },
        error: (err) => { 
            console.error('Error al cargar las ventas:', err);
        }
    });
  }

   public chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Registro de Ventas Diarias',
        font: { size: 36, weight: 'bold' as const },
        color: '#34495e'
      },
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: { usePointStyle: true }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(44, 62, 80, 0.9)',
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || '';
            if (label) { label += ': '; }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false }, 
        ticks: { color: '#7f8c8d' }
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.08)' }, 
        ticks: {
          color: '#7f8c8d',
          callback: (value: any) => {
            if (value >= 1000) { return (value / 1000) + 'K'; }
            return value;
          }
        }
      }
    }
  };


  private dateFormatted(dateString: string): string {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short' }).format(date);
    } catch (e) {
      return dateString.substring(0, 10);
    }
  }



}
