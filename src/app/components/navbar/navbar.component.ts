import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Category } from '../../models/Category';
import { Customer } from '../../models/Customer';
import { Part } from '../../models/Part';
import { Supplier } from '../../models/Supplier';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router){

  }

  @Input() categories: Category[] = [];
  @Input() customers: Customer[] = [];
  @Input() parts: Part[] = [];
  @Input() suppliers: Supplier[] = [];




}
