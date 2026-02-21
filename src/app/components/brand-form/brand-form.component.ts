import { Component, OnInit } from '@angular/core';
import { Brand } from '../../models/Brand';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SharingDataServiceBrand } from '../../services/sharing-data-brand.service';
import { BrandService } from '../../services/brand.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brand-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.css'
})
export class BrandFormComponent implements OnInit{

  errors: any;
  brand!: Brand;

  constructor(private router: Router, private sharingDataService: SharingDataServiceBrand, private route: ActivatedRoute, private brandService: BrandService){
    this.brand = new Brand();
  }



  ngOnInit(): void {
    this.sharingDataService.errorsBrandFormEventEmitter.subscribe(errors => this.errors = errors);
    this.sharingDataService.selectBrandEventEmitter.subscribe(brand => this.brand = brand);
    this.route.paramMap.subscribe(params => {
      const id:number = +(params.get('idBrand') || '0');
      if (id > 0){
        this.brandService.findBrandById(id).subscribe(brand => this.brand = brand);
      }
    })
  }

  onSubmit(brandForm: NgForm): void{
    if (brandForm.invalid) return;

    const brand = brandForm.value;
    
    if (this.brand.idBrand > 0) {
      this.brandService.updateBrand(this.brand).subscribe(
        categoryUpdated => {
          Swal.fire({
              title: "¡Updated!",
              text: "¡Brand updated succesfully!",
              icon: "success"
          });
          this.router.navigate(['/brands']);
        },
        error => {
          this.sharingDataService.errorsBrandFormEventEmitter.emit(error);
        }
      );
    } else {
      this.brandService.saveBrand(this.brand).subscribe(
        newBrand => {
          Swal.fire({
            title: "¡Created!",
            text: "¡Brand created succesfully!",
            icon: "success"
          });
          this.router.navigate(['/brands']);
        }, error => {
          this.sharingDataService.errorsBrandFormEventEmitter.emit(error);
        }
      );
    }

  }

}
