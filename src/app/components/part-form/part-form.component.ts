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
import { Brand } from '../../models/Brand';
import { BrandService } from '../../services/brand.service';
import { Model } from '../../models/Model';
import { ModelService } from '../../services/model.service';
import { Engine } from '../../models/Engine';
import { Vehicle } from '../../models/Vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { forkJoin } from 'rxjs';

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
  brands: Brand[] = [];
  models: Model[] = [];


  years: number[] = [];
  engines: Engine[] = [];

  selectedBrandId?: number;
  selectedModelId?: number;
  selectedYear?: number;
  selectedEngineId?: number;

  vehiclesSelected: Vehicle[] = [];

  constructor(private partService: PartService, private router: Router, private sharingDataService: SharingDataServicePart, private route: ActivatedRoute, private categoryService: CategoryService, private supplierService: SupplierService, private brandService: BrandService, private modelService: ModelService, private vehicleService: VehicleService){
    this.part = new Part();
  }

 ngOnInit(): void {
    this.sharingDataService.errorsPartFormEventEmitter.subscribe(errors => this.errors = errors);
    this.sharingDataService.selectPartEventEmitter.subscribe(part => this.part = part);

    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('idPart') || '0');

      if (id > 0) {
        forkJoin({
          categories: this.categoryService.categoryList(),
          suppliers: this.supplierService.supplierList(),
          brands: this.brandService.brandList(),
          part: this.partService.findPartById(id)
        }).subscribe(({ categories, suppliers, brands, part: partData }) => {

          this.categories = categories;
          this.suppliers = suppliers;
          this.brands = brands;

          this.part = partData;
          this.part.categoryId = Number(partData.categoryId);
          this.part.supplierId = Number(partData.supplierId);
          console.log('RAW partData completo:', JSON.stringify(partData));
          console.log('categoryId raw:', partData.categoryId);
          console.log('supplierId raw:', partData.supplierId);

          if (partData.vehicles) {
            this.vehiclesSelected = [...partData.vehicles];
            console.log('Primer vehículo RAW:', JSON.stringify(partData.vehicles[0]));

          }

          // Cascada para los selects de vehículo
          if (this.vehiclesSelected.length > 0) {
            const firstVehicle = this.vehiclesSelected[0];
            this.selectedBrandId = firstVehicle.brandId;

            if (this.selectedBrandId) {
              this.modelService.getModelsByBrand(this.selectedBrandId).subscribe(models => {
                this.models = models;
                this.selectedModelId = firstVehicle.modelId;

                if (this.selectedModelId) {
                  this.vehicleService.getYearsByModel(this.selectedModelId).subscribe(years => {
                    this.years = years;
                    this.selectedYear = firstVehicle.year;

                    if (this.selectedYear) {
                      this.vehicleService.getEnginesByModelAndYear(this.selectedModelId!, this.selectedYear)
                        .subscribe(engines => {
                          this.engines = engines;
                          this.selectedEngineId = firstVehicle.engineId;
                        });
                    }
                  });
                }
              });
            }
          }
        });

      } else {
        forkJoin({
          categories: this.categoryService.categoryList(),
          suppliers: this.supplierService.supplierList(),
          brands: this.brandService.brandList()
        }).subscribe(({ categories, suppliers, brands }) => {
          this.categories = categories;
          this.suppliers = suppliers;
          this.brands = brands;
        });
      }
    });
  }

  compareIds(a: any, b: any): boolean {
    return Number(a) === Number(b);
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
      price: this.part.price,
      stock: this.part.stock,
      status: this.part.status,
      minimumStock: this.part.minimumStock,

      categoryId: Number(this.part.categoryId),
      supplierId: Number(this.part.supplierId),
      vehicleIds: this.vehiclesSelected.map(v => v.idVehicle)
    }

    if (this.part.idPart > 0){
      this.part.vehicleIds = this.vehiclesSelected.map(v => v.idVehicle);
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
      this.part.vehicleIds = this.vehiclesSelected.map(v => v.idVehicle);
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

  chargeBrands(): void {
    this.brandService.brandList().subscribe(brands => {
      this.brands = brands;
      console.log('Brands Charged: ', this.brands);
    }, error => {
      console.error('Error while charging brands: ', error);
    })
  }

    loadModels(): void {
      if (!this.selectedBrandId) {
        this.models = [];
        return;
      }
      this.modelService.getModelsByBrand(this.selectedBrandId)
        .subscribe(data => {
          this.models = data;
        });
    }

    loadYears() {
      if (!this.selectedModelId) return;
      this.vehicleService.getYearsByModel(this.selectedModelId)
        .subscribe(years => this.years = years);
    }

    loadEngines() {
      if (!this.selectedModelId || !this.selectedYear) return;

      this.vehicleService.getEnginesByModelAndYear(this.selectedModelId, this.selectedYear)
          .subscribe({
            next: (engines) => this.engines = engines,
            error: (err) => console.error('Error al cargar motores', err)
          });
    }

    addCompatibility() {
      if(!this.selectedModelId || !this.selectedYear || !this.selectedEngineId){
        return;
      }
      this.vehicleService
          .getVehicleByFilters(this.selectedModelId, this.selectedYear, this.selectedEngineId)
          .subscribe(vehicle => {

            if(vehicle){
              this.vehiclesSelected.push(vehicle);
            }

          });
    }

    removeCompatibility(vehicle: Vehicle){

      this.vehiclesSelected =
      this.vehiclesSelected.filter(v => v.idVehicle !== vehicle.idVehicle);

    }

}
