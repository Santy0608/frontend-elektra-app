import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Supplier } from '../../models/Supplier';
import { SharingDataServiceSupplier } from '../../services/sharing-data-supplier.service';
import { SupplierService } from '../../services/supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier-form',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './supplier-form.component.html'
})
export class SupplierFormComponent implements OnInit{

  errors:any;
  supplier!: Supplier;

  constructor(private router: Router, private sharingDataService: SharingDataServiceSupplier, private supplierService: SupplierService, private route: ActivatedRoute){
    this.supplier = new Supplier();
  }

  ngOnInit(): void {
    this.sharingDataService.errorsSupplierFormEventEmitter.subscribe(errors => this.errors = this.errors);
    this.sharingDataService.selectSupplierEventEmitter.subscribe(supplier => this.supplier = supplier);
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('idSupplier') || '0');
      if (id > 0){
        this.supplierService.findSupplierById(id).subscribe(supplier => this.supplier = supplier);
      }
    })
  }

  onSubmit(supplierForm: NgForm): void {
  if (supplierForm.invalid) return;

  const supplier = supplierForm.value;

  if (this.supplier.idSupplier > 0) {
    this.supplierService.updateSupplier(this.supplier).subscribe(
      supplierUpdated => {
        Swal.fire({
          title: "¡Actualizado!",
          text: "¡Proveedor actualizado exitosamente!",
          icon: "success"
        });
        this.router.navigate(['/suppliers']);
      },
      error => {
        this.sharingDataService.errorsSupplierFormEventEmitter.emit(error);
      }
    );
  } else {
    this.supplierService.saveSupplier(this.supplier).subscribe(
      supplierNew => {
        Swal.fire({
          title: "¡Creada!",
          text: "¡Proveedor guardado exitosamente!",
          icon: "success"
        });
        this.router.navigate(['/supplier']);
      },
      error => {
        this.sharingDataService.errorsSupplierFormEventEmitter.emit(error);
      }
    );
  }
}

}
