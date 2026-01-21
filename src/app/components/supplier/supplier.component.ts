import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Supplier } from '../../models/Supplier';
import { SupplierService } from '../../services/supplier.service';
import { SharingDataServiceSupplier } from '../../services/sharing-data-supplier.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-supplier',
  imports: [RouterModule, FormsModule],
  templateUrl: './supplier.component.html',
})
export class SupplierComponent implements OnInit{

  errors: any;
  suppliers: Supplier[] = [];
  nameSearch: string = '';

 constructor(private supplierService: SupplierService, private router: Router, private sharingDataService: SharingDataServiceSupplier, private authServie: AuthService){
    const navigation = router.getCurrentNavigation();
    if (navigation?.extras?.state){
      this.suppliers = navigation.extras.state['suppliers'];
    }
  }

  ngOnInit(): void {
    if (this.suppliers == undefined || this.suppliers == null || this.suppliers.length == 0){
      console.log("Suppliers List");
      this.supplierService.supplierList().subscribe(suppliers => this.suppliers = suppliers);
    }
  }

  onRemoveSupplier(id: number){
       // Buscar la categoría dentro del listado
    const supplier = this.suppliers.find(s => s.idSupplier === id);
    if (!supplier) {
      console.error(`No se encontró el proveedor con id ${id}`);
      return;
    }

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Cuidado, este proveedor será eliminado del sistema.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.supplierService.deleteSupplierById(id).subscribe({
          next: () => {
            this.suppliers = this.suppliers.filter(p => p.idSupplier !== id);
  
            this.router.navigate(['/suppliers/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/suppliers'], { state: {suppliers: this.suppliers } });
            });
  
            Swal.fire("¡Eliminado!", "El proveedor ha sido eliminado exitosamente.", "success");
          },
          error: (err) => {
            console.error(err);
            Swal.fire("Error", "Hubo un problema al eliminar el proveedor.", "error");
          }
        });
      }
    });
    }
  
  chargeSuppliers(): void {
    this.supplierService.supplierList().subscribe(suppliers => {
      this.suppliers = suppliers;
      console.log("Suppliers charged to list", this.suppliers);
    }, error => {
      console.log("Error while chargint suppliers: ", error);
    })
  }

  OnSelectedSupplier(supplier: Supplier): void{
    this.router.navigate(['/suppliers/edit', supplier.idSupplier])
  }

  get admin(){
    return this.authServie.isAdmin();
  }
}
