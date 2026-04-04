import { Component, OnInit } from '@angular/core';
import { Phone } from '../../models/Phone';
import { Router, RouterModule } from '@angular/router';
import { PhoneService } from '../../services/phone.service';
import { SharingDataServicePhone } from '../../services/sharing-data-service-phone.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-phone',
  imports: [CommonModule, FormsModule,  RouterModule],
  templateUrl: './phone.component.html',
})
export class PhoneComponent implements OnInit{

  phones: Phone[] = [];
  errors: any;
  phoneSearch: string = '';

  constructor(private router: Router, private phoneService: PhoneService, private sharingDataService: SharingDataServicePhone, private authService: AuthService){
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.phones = navigation.extras.state['phones'];
    }
  }

  ngOnInit(): void {
    if (this.phones == undefined || this.phones == null || this.phones.length == 0){
      console.log("Category List");
      this.phoneService.phoneList().subscribe(phones => this.phones = phones);
    }
  }

  searchPhones(): void {
    this.phoneService.searchPhone(this.phoneSearch)
    .subscribe(data => {
      this.phones = data;
    })
  }

  OnSelectedPhone(phone: Phone): void{
    this.router.navigate(['/phones/edit', phone.idPhone]);
  }

  onRemovePhone(id: number){
       // Buscar el teléfono dentro del listado
    const phone = this.phones.find(p => p.idPhone === id);
    if (!phone) {
      console.error(`Teléfono no encontrado con el Id: ${id}`);
      return;
    }
  
    Swal.fire({
      title: "¿Estás Seguro?",
      text: "Cuidado, este teléfono será eliminada del sistema",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.phoneService.deletePhoneById(id).subscribe({
          next: () => {
            this.phones = this.phones.filter(p => p.idPhone !== id);
  
            this.router.navigate(['/phones/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/phones'], { state: { categories: this.phones } });
            });
  
            Swal.fire("¡Eliminado!", "El número de teléfono ha sido eliminada exitosamente", "success");
          },
          error: (err) => {
            console.error(err);
            Swal.fire("Error", "Hubo un problema al eliminar el número de teléfono", "error");
          }
        });
      }
    });
    }

    get admin(){
      return this.authService.isAdmin();
    }

}
