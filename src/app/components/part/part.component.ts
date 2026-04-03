import { Component, OnInit } from '@angular/core';
import { Part } from '../../models/Part';
import { PartService } from '../../services/part.service';
import { Router, RouterModule } from '@angular/router';
import { SharingDataServicePart } from '../../services/sharing-data-part.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Vehicle } from '../../models/Vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { ModelService } from '../../services/model.service';
import { CommonModule } from '@angular/common';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-part',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './part.component.html',
})
export class PartComponent implements OnInit{

  errors!:any;
  parts: Part[] = [];
  nameSearch: string = '';
  brandSearch: string = '';
  codeSearch: string = '';

  brands:any[] = [];
  models:any[] = [];
  years:number[] = [];
  engines:any[] = [];

  selectedBrandId?:number;
  selectedModelId?:number;
  selectedYear?:number;
  selectedEngineId?:number;

  constructor(private partService: PartService, private router: Router, private sharingDataService: SharingDataServicePart, private authService: AuthService, private vehicleService: VehicleService, private modelService: ModelService, private brandService: BrandService){
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.parts = navigation.extras.state['parts'];
    }
  }

  ngOnInit(): void {
    if (this.parts == undefined || this.parts == null || this.parts.length == 0){
      console.log("Part List ");
      this.partService.partsList().subscribe(parts => this.parts = parts);
    }

    this.chargeBrands();
    this.chargeModels();
    this.loadParts();
    this.loadModels();
    this.loadYears();
    this.loadEngines();
  }

   chargeBrands(): void {
    this.brandService.brandList().subscribe(brands => {
      this.brands = brands;
      console.log('Brands Charged: ', this.brands);
    }, error => {
      console.error('Error while charging brands: ', error);
    })
  }

  chargeModels(): void{
    this.modelService.modelList().subscribe(models => {
      this.models = models;
    }, error => {
      console.error('Error while charging models: ', error);
    })
  }

  

  onRemovePart(id: number): void{
       // Buscar el repuesto dentro del listado
      const part = this.parts.find(p => p.idPart === id);
      if (!part) {
        console.error(`Part not found by id: ${id}`);
        return;
      }

       // Validar si la categoría está completada
      if (part.status === "Vendido") {
        Swal.fire({
          title: "Acción no permitida",
          text: "No puedes vender un repuesto vendido",
          icon: "error"
        });
        return; // Detener la ejecución
      }

    
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Cuidado, este repuesto será eliminado del sistema",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.partService.deletePart(id).subscribe({
            next: () => {
              this.parts = this.parts.filter(p => p.idPart !== id);
    
              // Navegación (si es necesaria)
              this.router.navigate(['/parts/create'], { skipLocationChange: true }).then(() => {
                this.router.navigate(['/parts'], { state: { parts: this.parts } });
              });
    
              Swal.fire("¡Eliminado!", "El repuesto ha sido eliminado exitosamente.", "success");
            },
            error: (err) => {
              console.error(err);
              Swal.fire("Error", "Hubo un error al eliminar el sistema.", "error");
            }
          });
        }
      }); 
  }

  onSelectedPart(part: Part): void{
    if (part.status === "Vendido"){
      Swal.fire({
        title: "Acción no permitida",
        text: "No se puede actualizar un repuesto vendido",
        icon: "error"
      })
      return;
    }

    this.router.navigate(['/parts/edit', part.idPart]);
  }

  searchParts(): void {
    this.partService.searchParts(this.nameSearch, this.brandSearch, this.codeSearch)
    .subscribe(data => {
      this.parts = data;
    })
  }

  searchPartsByFilters(){

  this.vehicleService
    .getVehicleByFilters(this.selectedModelId!, this.selectedYear!, this.selectedEngineId!)
    .subscribe(vehicle => {

        this.partService.getPartsByVehicle(vehicle.idVehicle)
          .subscribe(parts => {
            this.parts = parts;
          });

    });

}

    searchPartsByVehicle(){

      if(!this.selectedModelId || !this.selectedYear || !this.selectedEngineId){
        return;
      }

      this.vehicleService
          .getVehicleByFilters(
              this.selectedModelId,
              this.selectedYear,
              this.selectedEngineId
          )
          .subscribe(vehicle => {

              this.partService
                  .getPartsByVehicle(vehicle.idVehicle)
                  .subscribe(parts => {
                      this.parts = parts;
                  });

          });

    }

  get admin(){
    return this.authService.isAdmin();
  }


  loadParts(): void {
    this.partService.partsList().subscribe(parts => {
      this.parts = parts;
      console.log("Parts loaded: ", this.parts);
    }, error => {
      console.log("Error loading parts: ", error);
    })
  }

  getVehicleDescription(vehicleNames: string[]): string {
    if (!vehicleNames) return '';
    return vehicleNames
      .slice(0, 2)
      .join(', '); 
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

}
