import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { SharingDataServiceCustomer } from '../../services/sharing-data-customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../models/Customer';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-form',
  imports: [],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent implements OnInit{

  errors!: any;
  customer!: Customer;
  
  constructor(private customerService: CustomerService, private sharingDataService: SharingDataServiceCustomer, private route: ActivatedRoute, private router: Router){
    this.customer = new Customer();
  } 

  ngOnInit(): void {
    this.sharingDataService.errorsCustomerFormEventEmitter.subscribe(errors => this.errors = errors);
    this.sharingDataService.selectCustomerEventEmitter.subscribe(customer => this.customer = customer);
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('idCustomer') || '0');
      if (id > 0){
        this.customerService.findCustomerById(id).subscribe(customer => this.customer = customer);
      }
    })
  }


  onSubmit(customerForm: NgForm): void {
  if (customerForm.invalid) return;

  const customer = customerForm.value;

  if (this.customer.idCustomer > 0) {
    this.customerService.updateCustomer(this.customer).subscribe(
      customerUpdated => {
        Swal.fire({
          title: "¡Actualizado!",
          text: "¡Cliente actualizado exitosamente!",
          icon: "success"
        });
        this.router.navigate(['/customers']);
      },
      error => {
        this.sharingDataService.errorsCustomerFormEventEmitter.emit(error);
      }
    );
  } else {
    this.customerService.saveCustomer(this. customer).subscribe(
      newCustomer => {
        Swal.fire({
          title: "¡Creado!",
          text: "¡Cliente creado exitosamente!",
          icon: "success"
        });
        this.router.navigate(['/customers']);
      },
      error => {
        this.sharingDataService.errorsCustomerFormEventEmitter.emit(error);
      }
    );
  }
}

  onClear(customerForm: NgForm): void{
    this.customer = new Customer();
    customerForm.reset();
    customerForm.resetForm();
  }

}
