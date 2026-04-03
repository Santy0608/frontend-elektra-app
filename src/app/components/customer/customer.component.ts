import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/Customer';
import { CustomerService } from '../../services/customer.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { SharingDataServiceCustomer } from '../../services/sharing-data-customer.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer',
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{

  errors: any;
  customers: Customer[] = [];
  nameSearch: string = '';
  phoneSearch: string = '';
  emailSearch: string = '';

  constructor(private customerService: CustomerService, private router: Router, private sharingDataService: SharingDataServiceCustomer, private authService: AuthService){
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.customers = navigation.extras.state['customers'];
    }
  }

  ngOnInit(): void {
    if (this.customers == undefined || this.customers == null || this.customers.length == 0){
      console.log("Customer List");
      this.customerService.customerList().subscribe(customers => this.customers = customers);
    }
  }

  onRemoveCustomer(id: number) {
    if (!id) {
      Swal.fire("Error", "No se pudo encontrar el ID del cliente", "error");
      return;
    }

    Swal.fire({
      title: "¿Estás Seguro?",
      text: "Cuidado, este cliente será eliminado del sistema.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.deleteCustomer(id).subscribe({
          next: () => {
            // Filtramos la lista localmente para que desaparezca de la tabla de inmediato
            this.customers = this.customers.filter(c => c.idCustomer !== id);
            Swal.fire("¡Eliminado!", "El cliente ha sido eliminado exitosamente", "success");
          },
          error: (err) => {
            console.error("Error al eliminar:", err);
            Swal.fire("Error", "Hubo un problema al eliminar el cliente", "error");
          }
        });
      }
    });
  }

  OnSelectedCustomer(customer: Customer): void {
      this.router.navigate(['/customers/edit', customer.idCustomer]);
  }

  searchCustomers(): void{
    this.customerService.searchCustomers(this.nameSearch, this.phoneSearch, this.emailSearch)
    .subscribe(data => {
      this.customers = data;
    })
  }

  get admin(){
    return this.authService.isAdmin();
  }

}
