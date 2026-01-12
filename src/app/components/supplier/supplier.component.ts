import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Supplier } from '../../models/Supplier';

@Component({
  selector: 'app-supplier',
  imports: [RouterModule, FormsModule],
  templateUrl: './supplier.component.html',
})
export class SupplierComponent implements OnInit{

  errors: any;
  suppliers: Supplier[] = [];
  

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
