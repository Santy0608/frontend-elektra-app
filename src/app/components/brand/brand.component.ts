import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { SharingDataService } from '../../services/sharing-data-sale.service';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Brand } from '../../models/Brand';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brand',
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent implements OnInit{

  errors: any;
  brands: Brand[] = [];

  constructor(private brandService: BrandService, private sharingDataService: SharingDataService, private route: ActivatedRoute, private router: Router, private authService: AuthService){
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.brands = navigation.extras.state['brands'];
    }
  }

  ngOnInit(): void {
    if (this.brands == undefined || this.brands == null || this.brands.length == 0){
      console.log("Brand List");
      this.brandService.brandList().subscribe(brands => this.brands = brands);
    }
  }


    onRemoveBrand(id: number){
       // Buscar la categoría dentro del listado
    const brand = this.brands.find(b => b.idBrand === id);
    if (!brand) {
      console.error(`Brand not found by id: ${id}`);
      return;
    }
  
    Swal.fire({
      title: "¿Are you sure?",
      text: "Beware, this brand will be deleted from the system",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it"
    }).then((result) => {
      if (result.isConfirmed) {
        this.brandService.deleteBrandById(id).subscribe({
          next: () => {
            this.brands = this.brands.filter(b => b.idBrand !== id);
  
            this.router.navigate(['/brands/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/brands'], { state: { brands: this.brands } });
            });
  
            Swal.fire("¡Deleted!", "The brand has been deleted successfully", "success");
          },
          error: (err) => {
            console.error(err);
            Swal.fire("Error", "There were a problem by deleting the brand", "error");
          }
        });
      }
    });
    }
    

    OnSelectedBrand(brand: Brand): void {
      this.router.navigate(['/brands/edit', brand.idBrand])
    }

    get admin(){
      return this.authService.isAdmin();
    }


}
