import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/Customer';
import { Part } from '../../models/Part';
import { Sale } from '../../models/Sale';
import { SaleService } from '../../services/sale.service';
import { SharingDataService } from '../../services/sharing-data-sale.service';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { PartService } from '../../services/part.service';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { SaleRequest } from '../../models/SaleRequest';
import { DetailRequest } from '../../models/DetailRequest';

@Component({
  selector: 'app-sale-form',
  imports: [FormsModule, RouterLink, RouterModule, CommonModule],
  templateUrl: './sale-form.component.html',
  styleUrl: './sale-form.component.css'
})
export class SaleFormComponent implements OnInit{

  errors: any;
  customers: Customer[] = [];
  parts: Part[] = [];

  sale: any = {
    customerId: 0,
    details: []
  };

  sales: Sale[] = [];

  constructor(private saleService: SaleService, 
    private sharingDataService: SharingDataService, 
    private route: ActivatedRoute, private router: Router, 
    private customerService: CustomerService, 
    private partService: PartService){

  }

  ngOnInit(): void {
    this.sharingDataService.errorsSaleFormEventEmitter.subscribe(errors => this.errors = errors);
    this.sharingDataService.selectSaleEventEmitter.subscribe(sale => this.sale = sale);

    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('idSale') || '0');
      if (id > 0) {
        this.saleService.findSaleById(id).subscribe(sale => this.sale = sale);
      } else {
        this.sale = {
          customerId: 0,
          details: [{ partId: null, quantity: 1 }]
        };
      }
    });

    this.loadCustomers();
    this.loadParts();

  }

  addDetail(): void {
    if (!this.sale.details){
      this.sale.details = [];
    }

    this.sale.details.push({
      partId: null,
      quantity: 1
    })
  }

  onSubmit(saleForm: NgForm): void {
    //Validations
    if (!this.sale.customerId) {
      Swal.fire("Error", "Debe seleccionar un cliente", "error");
      return;
    }

    if (!this.sale.details || this.sale.details.length === 0) {
      Swal.fire("Error", "Debe agregar al menos un repuesto a la venta", "error");
      return;
    }

    const saleToSend: SaleRequest = {
      customerId: this.sale.customerId,
      requests: this.sale.details.map((d: DetailRequest) => ({
        partId: Number(d.partId),
        quantity: d.quantity
      }))
    };

    
    console.log(saleToSend);
    this.saleService.saveSale(saleToSend).subscribe(saleNew => {
      this.sharingDataService.newSaleEventEmitter.emit(saleNew);

      this.router.navigate(['/sales']);

      Swal.fire("Creado", "Venta registrada exitosamente", "success");
    }, error => {
      this.sharingDataService.errorsSaleFormEventEmitter.emit(error);
    });
  }

  loadCustomers(): void {
    this.customerService.customerList().subscribe(customers => {
      this.customers = customers;
      console.log("Customers loaded: ", this.customers);
    }, error => {
      console.log("Error loading customers: ", error);
    })
  }

  loadParts(): void {
    this.partService.partsList().subscribe(parts => {
      this.parts = parts;
      console.log("Parts loaded: ", this.parts);
    }, error => {
      console.log("Error loading parts: ", error);
    })
  }

  deleteDetail(index: number): void{
    this.sale.details.splice(index, 1);
  }

}
