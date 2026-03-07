import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Brand } from '../../models/Brand';
import { Model } from '../../models/Model';
import { ModelService } from '../../services/model.service';
import { SharingDataServiceModel } from '../../services/sharing-data-model.service';
import Swal from 'sweetalert2';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-model-form',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './model-form.component.html',
})
export class ModelFormComponent implements OnInit{

  brands: Brand[] = [];
  errors: any;
  model!: Model;
  models: Model[] = [];

  constructor(private modelService: ModelService, private router: Router, private route: ActivatedRoute, private sharingDataService: SharingDataServiceModel, private brandService: BrandService ){
    this.model = new Model();
  }

  ngOnInit(): void {
    this.sharingDataService.errorsModelFormEventEmitter.subscribe(errors => this.errors = errors);
    this.sharingDataService.selectModelEventEmitter.subscribe(model => this.model = model);
    this.route.paramMap.subscribe(params => {
      const id:number = +(params.get('idModel') || '0');
      if (id > 0){
        this.modelService.findModelById(id).subscribe(model => this.model = model);
      }
    })
    this.chargeBrands();
  }

  onSubmit(modelForm: NgForm): void{
    if (!this.model.brandId){
      Swal.fire("Error", "Debe seleccionar una marca", "error");
      return;
    }

    const modelToSend = {
      idModel: this.model.idModel,
      name: this.model.name,
      brand: { idBrand: Number(this.model.brandId) },
    }

    if (this.model.idModel > 0){
      this.modelService.updateModel(modelToSend).subscribe(modelUpdated => {
        this.models = this.models.map(m => 
          m.idModel == modelUpdated.idModel ? {...modelUpdated} : m
        );
        this.router.navigate(['/models'], { state: { models: this.models } });
        Swal.fire("Actualizado!", "¡Modelo Actualizado Exitosamente!", "success");
      }, error => {
          this.sharingDataService.errorsModelFormEventEmitter.emit(error);
      })
    } else {
      this.modelService.saveModel(modelToSend).subscribe(modelNew => {
        console.log(modelNew);
        this.models.push(modelNew);
        this.router.navigate(['models']);
        Swal.fire("Creado Nuevo Modelo!", "¡Modelo guardado exitosamente!", "success");
      }, error => {
        this.sharingDataService.errorsModelFormEventEmitter.emit(error);
      });
    }
  }

  chargeBrands(): void{
    this.brandService.brandList().subscribe(
      data => {
        this.brands = data;
        console.log('Brands Charged: ', this.model);
      }, error => {
        console.log("Error by loading the brands")
      }
    )
  }


}
