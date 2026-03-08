import { Component, OnInit } from '@angular/core';
import { Engine } from '../../models/Engine';
import { EngineService } from '../../services/engine.service';
import { SharingDataServiceEngine } from '../../services/sharing-data-engine.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-engine',
  imports: [RouterModule, CommonModule],
  templateUrl: './engine.component.html',
})
export class EngineComponent implements OnInit{

  errors: any;
  engines: Engine[] = [];

  constructor(private engineService:EngineService, private sharingDataService: SharingDataServiceEngine, private authService: AuthService, private router: Router){
     const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.engines = navigation.extras.state['engines'];
    }
  }

  ngOnInit(): void {
    if (this.engines == undefined || this.engines == null || this.engines.length == 0){
      console.log("Brand List");
      this.engineService.engineList().subscribe(engines => this.engines = engines);
    }
  }

  onRemoveEngine(id: number){
      const engine = this.engines.find(e => e.idEngine === id);
      if (!engine) {
        console.error(`Engine not found by id: ${id}`);
        return;
      }
    
      Swal.fire({
        title: "¿Estás Seguro?",
        text: "Cuidado, este motor será eliminado del sistema",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.engineService.deleteEngineById(id).subscribe({
            next: () => {
              this.engines = this.engines.filter(e => e.idEngine !== id);
    
              this.router.navigate(['/engines/create'], { skipLocationChange: true }).then(() => {
                this.router.navigate(['/engines'], { state: { engines: this.engines } });
              });
    
              Swal.fire("¡Eliminado!", "El motor ha sido eliminado exitosamente", "success");
            },
            error: (err) => {
              console.error(err);
              Swal.fire("Error", "Hubo un problema al eliminar el motor", "error");
            }
          });
        }
      });
      }

  OnSelectedEngine(engine: Engine): void{
    this.router.navigate(['/engines/edit', engine.idEngine]);
  }

  get admin(){
    return this.authService.isAdmin();
  }

}
