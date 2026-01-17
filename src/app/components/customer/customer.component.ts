import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/Customer';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  imports: [],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{

  errors: any;
  customers: Customer[] = [];

  constructor(private customerService: CustomerService, private router: Router){
  
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
