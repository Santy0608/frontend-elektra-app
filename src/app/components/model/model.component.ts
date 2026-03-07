import { Component, OnInit } from '@angular/core';
import { Model } from '../../models/Model';
import { Router, RouterModule } from '@angular/router';
import { ModelService } from '../../services/model.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-model',
  imports: [RouterModule],
  templateUrl: './model.component.html',
})
export class ModelComponent implements OnInit{

  errors: any;
  models: Model[] = [];

  constructor(private router: Router, private modelService: ModelService, private authService: AuthService){
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.models = navigation.extras.state['models'];
    }
  }

  ngOnInit(): void {
    if (this.models == undefined || this.models == null || this.models.length == 0){
      console.log("Model List ");
      this.modelService.modelList().subscribe(models => this.models = models);
    }
  }

  onRemoveModel(id: number): void{
         // Buscar el repuesto dentro del listado
        const model = this.models.find(m => m.idModel === id);
        if (!model) {
          console.error(`Model not found by id: ${id}`);
          return;
        }
    
      
        Swal.fire({
          title: "¿Estás seguro?",
          text: "Cuidado, este modelo será eliminado del sistema",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminar"
        }).then((result) => {
          if (result.isConfirmed) {
            this.modelService.deleteModelById(id).subscribe({
              next: () => {
                this.models = this.models.filter(m => m.idModel !== id);
      
                // Navegación (si es necesaria)
                this.router.navigate(['/models/create'], { skipLocationChange: true }).then(() => {
                  this.router.navigate(['/models'], { state: { models: this.models } });
                });
      
                Swal.fire("¡Eliminado!", "El modelo ha sido eliminado exitosamente.", "success");
              },
              error: (err) => {
                console.error(err);
                Swal.fire("Error", "Hubo un error al eliminar el modelo del sistema.", "error");
              }
            });
          }
        }); 
    }
  
  onSelectedModel(model: Model): void{
    this.router.navigate(['/models/edit', model.idModel]);
  }

  get admin(){
    return this.authService.isAdmin();
  }

}
