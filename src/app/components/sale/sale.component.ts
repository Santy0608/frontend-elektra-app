import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Sale } from '../../models/Sale';
import { Part } from '../../models/Part';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { SaleService } from '../../services/sale.service';
import { Router, RouterModule } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data-sale.service';
import { PartService } from '../../services/part.service';
import Swal from 'sweetalert2';
import { CommonModule, isPlatformBrowser } from '@angular/common';



@Component({
  selector: 'app-sale',
  imports: [RouterModule, CommonModule],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css'
})
export class SaleComponent {

  errors: any;
  sales: Sale[] = [];
  saleSelected?: Sale;
  notifications: any[] = [];
  parts: Part[] = [];
  filteredParts: Part[] = [];
  

   constructor(private snackBar: MatSnackBar, 
    private authService: AuthService, 
    private saleService: SaleService, 
    private router: Router, 
    private sharingDataService: SharingDataService, 
    @Inject(PLATFORM_ID) private platformId: Object, 
    private partServie: PartService){
    
  }

  ngOnInit(): void {
    this.saleService.saleList().subscribe(sales => this.sales = sales);
    this.sharingDataService.newSaleEventEmitter.subscribe(newSale => {
      this.sales = [newSale, ...this.sales]; 
    });

    this.getNotifications();
    //this.scriptsService.loadBootstrap();
    
  }

  onRemoveSale(id: number): void{
         // Buscar la venta dentro del listado
        const sale = this.sales.find(s => s.idSale === id);
        if (!sale) {
          console.error(`Sale not found with id: ${id}`);
          return;
        }
  
      
        Swal.fire({
          title: "¿Estás seguro?",
          text: "Cuidado, esta venta será eliminada del sistema.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminar"
        }).then((result) => {
          if (result.isConfirmed) {
            this.saleService.deleteSale(id).subscribe({
              next: () => {
                this.sales = this.sales.filter(s => s.idSale !== id);
      
                // Navegación (si es necesaria)
                this.router.navigate(['/sales/create'], { skipLocationChange: true }).then(() => {
                  this.router.navigate(['/sales'], { state: { sales: this.sales } });
                });
      
                Swal.fire("¡Eliminado!", "La venta ha sido eliminada exitosamente.", "success");
              },
              error: (err) => {
                console.error(err);
                Swal.fire("Error", "Hubo un problema al eliminar la venta.", "error");
              }
            });
          }
        });
    }

  viewDetails(sale: Sale) {
    this.saleSelected = sale;

    if (isPlatformBrowser(this.platformId)) {
        if ((window as any).bootstrap && (window as any).bootstrap.Modal) {
            const modalElement = document.getElementById('detallesModal');
            if (modalElement) {
                const modalInstance = new (window as any).bootstrap.Modal(modalElement);
                modalInstance.show();
            }
        }
    }
  }

  downloadInvoice(id: number): void{
    this.saleService.generatePDFInvoice(id).subscribe(
      (response: Blob) => {
        const fileUrl = URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = `factura_${id}.pdf`;
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(fileUrl);
        Swal.fire('Exito', 'Factura descargada exitosamente', 'success');
      },
      error => {
        console.error('Error al descargar la factura', error);
        Swal.fire('Error', 'Hubo un problema al descargar la factura', 'error');
      }
    );
  }

  getNotifications(): void {
  console.log("Verificando Stock Bajo");
  this.partServie.partsList().subscribe(data => {
    this.parts = data;

    const bajoStock = data.filter(p => p.stock <= p.minimumStock);
    console.log("Repuestos con bajo stock: ", bajoStock);

    this.filteredParts = bajoStock;

    if (this.filteredParts.length > 0) {
      setTimeout(() => {
        this.filteredParts = [];
        console.log("Notificación de bajo stock eliminada.");
      }, 10000); // 10000 milisegundos = 10 segundos
    }
  });
}

get admin() {
  return this.authService.isAdmin();
}
}
