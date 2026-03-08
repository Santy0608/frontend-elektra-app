import { Component, OnInit } from '@angular/core';
import { Engine } from '../../models/Engine';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SharingDataServiceEngine } from '../../services/sharing-data-engine.service';
import { EngineService } from '../../services/engine.service';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-engine-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './engine-form.component.html',
})
export class EngineFormComponent implements OnInit{

  errors: any;
  engine!: Engine

  constructor(private router: Router,
              private route: ActivatedRoute,
              private sharingDataService: SharingDataServiceEngine,
              private engineService: EngineService
  ){
    this.engine = new Engine();
  }

  ngOnInit(): void {
    this.sharingDataService.errorsEngineFormEventEmitter.subscribe(errors => this.errors = errors);
    this.sharingDataService.selectEngineEventEmitter.subscribe(engine => this.engine = engine);
    this.route.paramMap.subscribe(params => {
      const id:number = +(params.get('idEngine') || '0');
      if (id > 0){
        this.engineService.findEngineById(id).subscribe(engine => this.engine = engine);
      }
    })
  }

  onSubmit(engineForm: NgForm): void {
  if (engineForm.invalid) return;

  const engine = engineForm.value;

  if (this.engine.idEngine > 0) {
    this.engineService.updateEngine(this.engine).subscribe(
      engineUpdated => {
        Swal.fire({
          title: "¡Actualizado!",
          text: "¡Motor actualizado exitosamente!",
          icon: "success"
        });
        this.router.navigate(['/engines']);
      },
      error => {
        this.sharingDataService.errorsEngineFormEventEmitter.emit(error);
      }
    );
  } else {
    this.engineService.saveEngine(this.engine).subscribe(
      newEngine => {
        Swal.fire({
          title: "¡Creado!",
          text: "¡Motor creado exitosamente!",
          icon: "success"
        });
        this.router.navigate(['/engines']);
      },
      error => {
        this.sharingDataService.errorsEngineFormEventEmitter.emit(error);
      }
    );
  }
}


}
