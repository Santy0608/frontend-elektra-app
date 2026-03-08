import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/Vehicle';
import { AuthService } from '../../services/auth.service';
import { VehicleService } from '../../services/vehicle.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle',
  imports: [],
  templateUrl: './vehicle.component.html',
})
export class VehicleComponent implements OnInit{

  vehicles: Vehicle[] = [];
  errors: any;

  constructor(private authService: AuthService,
              private vehicleService: VehicleService,
              private router: Router
  ){
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.vehicles = navigation.extras.state['vehicles'];
    }
  }

  ngOnInit(): void {
    if (this.vehicles == undefined || this.vehicles == null || this.vehicles.length == 0){
      console.log("Vehicle List");
      this.vehicleService.vehicleList().subscribe(vehicles => this.vehicles = vehicles);
    }
  }

  onRemoveVehicle(id: number){
         // Buscar la categoría dentro del listado
      const vehicle = this.vehicles.find(v => v.idVehicle === id);
      if (!vehicle) {
        console.error(`Vehicle not found by id: ${id}`);
        return;
      }
    
      Swal.fire({
        title: "¿Estás Seguro?",
        text: "Cuidado, este vehículo será eliminado del sistema",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it"
      }).then((result) => {
        if (result.isConfirmed) {
          this.vehicleService.deleteVehicleById(id).subscribe({
            next: () => {
              this.vehicles = this.vehicles.filter(v => v.idVehicle !== id);
    
              this.router.navigate(['/vehicles/create'], { skipLocationChange: true }).then(() => {
                this.router.navigate(['/vehicles'], { state: { vehicles: this.vehicles } });
              });
    
              Swal.fire("¡Eliminado!", "El vehículo ha sido eliminado exitosamente", "success");
            },
            error: (err) => {
              console.error(err);
              Swal.fire("Error", "Hubo un problema al eliminar el vehículo", "error");
            }
          });
        }
      });
    }
      

  OnSelectedVehicle(vehicle: Vehicle): void {
    this.router.navigate(['/vehicles/edit', vehicle.idVehicle]);
  }

  get admin(){
    return this.authService.isAdmin();
  }

}
