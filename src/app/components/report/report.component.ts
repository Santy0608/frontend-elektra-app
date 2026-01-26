import { Component } from '@angular/core';
import { ReportService } from '../../services/report.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  
  startDate!: string;
  endDate!: string;

  constructor(private reportService: ReportService){

  }

  generateReport(): void {
      this.reportService.generateSalesReport(this.startDate, this.endDate)
      .subscribe(
        (response: Blob) => {
          const fileURL = URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = fileURL;
          a.download = `reporte_ventas.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(fileURL);
          Swal.fire('Éxito', 'Reporte descargado exitosamente', 'success');
        }, error => {
          console.error('Error al generar el reporte', error);
          Swal.fire('Error', 'Hubo un problema al generar el reporte', 'error')
        }
      )
  }

}
