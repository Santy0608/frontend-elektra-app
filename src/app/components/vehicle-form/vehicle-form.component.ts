import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/Vehicle';
import { Engine } from '../../models/Engine';
import { Model } from '../../models/Model';
import { AuthService } from '../../services/auth.service';
import { EngineService } from '../../services/engine.service';
import { VehicleService } from '../../services/vehicle.service';
import { ModelService } from '../../services/model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharingDataServiceVehicle } from '../../services/sharing-data-vehicle.service';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle-form',
  imports: [FormsModule],
  templateUrl: './vehicle-form.component.html',
})
export class VehicleFormComponent implements OnInit{

  errors: any;
  vehicles: Vehicle[] = [];
  models: Model[] = [];
  engines: Engine[] = [];
  vehicle!: Vehicle;

  constructor(private authService: AuthService,
              private engineService: EngineService,
              private vehicleService: VehicleService,
              private modelService: ModelService,
              private route: ActivatedRoute,
              private router: Router,
              private sharingDataService: SharingDataServiceVehicle
  ){
    this.vehicle = new Vehicle();
  }


  ngOnInit(): void {
    this.sharingDataService.errorsVehicleFormEventEmitter.subscribe(errors => this.errors = errors);
    this.sharingDataService.selectVehicleEventEmitter.subscribe(vehicle => this.vehicle = vehicle);
    this.route.paramMap.subscribe(params => {
      const id:number = +(params.get('idVehicle') || '0');
      if (id > 0){
        this.vehicleService.findVehicleById(id).subscribe(vehicle => this.vehicle = vehicle);
      }
    })
    this.chargeModels();
    this.chargeEngines();
  }

  onSubmit(vehicleForm: NgForm): void{
    if (!this.vehicle.engineId){
      Swal.fire("Error","Debe seleccionar un motor", "error");
      return;
    }

    if (!this.vehicle.modelId){
      Swal.fire("Error", "Debe seleccionar un modelo", "error");
    }


    const vehicleToSend = {
      idVehicle: this.vehicle.idVehicle,
      year: this.vehicle.year,
      model: { idModel: Number(this.vehicle.modelId) },
      engine: { idEngine: Number(this.vehicle.engineId) },
    }

    if (this.vehicle.idVehicle > 0){
      this.vehicleService.updateVehicle(vehicleToSend).subscribe(vehicleUpdated => {
        this.vehicles = this.vehicles.map(v =>
        v.idVehicle === vehicleUpdated.idVehicle ? {...vehicleUpdated } : v
      );
      this.router.navigate(['/vehicles'], { state: { vehicles: this.vehicles } });
      Swal.fire("Actualizado!", "¡Vehiculo Actualizado Exitosamente!", "success");
      }, error => {
        this.sharingDataService.errorsVehicleFormEventEmitter.emit(error);
      })    
    } else {
      this.vehicleService.saveVehicle(vehicleToSend).subscribe(vehicleNew => {
        console.log(vehicleNew);
        this.vehicles.push(vehicleNew);
        this.router.navigate(['vehicles']);
        Swal.fire("Creado Nuevo Vhículo!", "¡Vehículo guardado exitosamente!", "success");
      }, error => {
        this.sharingDataService.errorsVehicleFormEventEmitter.emit(error);
      });
    }
  }

  chargeModels(): void {
    this.modelService.modelList().subscribe(models => {
    this.models = models;
    console.log('Models charged: ', this.models);
  }, error => {
    console.error('Error while charging models:', error);
  });
  }

  chargeEngines(): void{
    this.engineService.engineList().subscribe(engines => {
      this.engines = engines;
      console.log('Engines charged: ', this.engines);
    }, error => {
      console.log('Error while charging engines:', error);
    })
  }

}
