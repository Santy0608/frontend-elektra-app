import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Category } from '../../models/Category';
import { Part } from '../../models/Part';
import { PartService } from '../../services/part.service';
import { SharingDataServicePart } from '../../services/sharing-data-part.service';
import { CategoryService } from '../../services/category.service';
import Swal from 'sweetalert2';
import { Supplier } from '../../models/Supplier';
import { SupplierService } from '../../services/supplier.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-part-form',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './part-form.component.html',
})
export class PartFormComponent implements OnInit{

  categories: Category[] = [];
  errors:any;
  parts: Part[] = [];
  part: Part;
  suppliers: Supplier[] = [];

  constructor(private partService: PartService, private router: Router, private sharingDataService: SharingDataServicePart, private route: ActivatedRoute, private categoryService: CategoryService, private supplierService: SupplierService){
    this.part = new Part();
  }

  ngOnInit(): void {
    this.sharingDataService.errorsPartFormEventEmitter.subscribe(errors => this.errors = errors);
    this.sharingDataService.selectPartEventEmitter.subscribe(part => this.part = part);
    this.route.paramMap.subscribe(params => {
      const id:number = +(params.get('idPart') || '0');
      if (id > 0){
        this.partService.findPartById(id).subscribe(part => this.part = part);
      }
    })
    this.chargeCategories();
    this.chargeSuppliers();
  }

  onSubmit(partForm: NgForm): void{
    if (!this.part.categoryId){
      Swal.fire("Error","Debe seleccionar una categoría", "error");
      return;
    }

    if (!this.part.supplierId){
      Swal.fire("Error", "Debe seleccionar un proveedor", "error");
    }

    const partToSend = {
      idPart: this.part.idPart,
      name: this.part.name,
      code: this.part.code,
      brand: this.part.brand, 
      compatibleModel: this.part.compatibleModel,
      price: this.part.price,
      stock: this.part.stock,
      status: this.part.status,
      minimumStock: this.part.minimumStock,
      category: { idCategory: Number(this.part.categoryId) },
      supplier: { idSupplier: Number(this.part.supplierId) }
    }

    if (this.part.idPart > 0){
      this.partService.updatePart(partToSend).subscribe(partUpdated => {
        this.parts = this.parts.map(p =>
        p.idPart === partUpdated.idPart ? {...partUpdated } : p
      );
      this.router.navigate(['/parts'], { state: { parts: this.parts } });
      Swal.fire("Actualizado!", "¡Repuesto Actualizado Exitosamente!", "success");
      }, error => {
        this.sharingDataService.errorsPartFormEventEmitter.emit(error);
      })    
    } else {
      this.partService.savePart(partToSend).subscribe(partNew => {
        console.log(partNew);
        this.parts.push(partNew);
        this.router.navigate(['parts']);
        Swal.fire("Creado Nuevo Repuesto!", "¡Repuesto guardado exitosamente!", "success");
      }, error => {
        this.sharingDataService.errorsPartFormEventEmitter.emit(error);
      });
    }
  }


  onClear(partForm: NgForm):void{
    this.part = new Part();
    partForm.reset();
    partForm.resetForm();
  }

  chargeCategories(): void {
    this.categoryService.categoryList().subscribe(categories => {
    this.categories = categories;
    console.log('Categories charged: ', this.categories);
  }, error => {
    console.error('Error while charging categories:', error);
  });
  }

  chargeSuppliers(): void {
    this.supplierService.supplierList().subscribe(suppliers => {
      this.suppliers = suppliers;
      console.log('Suppliers Charged: ', this.suppliers);
    }, error => {
      console.error('Error while charging suppliers: ', error);
    })
  }



}
