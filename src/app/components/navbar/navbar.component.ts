import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Category } from '../../models/Category';
import { Customer } from '../../models/Customer';
import { Part } from '../../models/Part';
import { Supplier } from '../../models/Supplier';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { Brand } from '../../models/Brand';
import { Phone } from '../../models/Phone';
import { Email } from '../../models/Email';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router, private authService: AuthService){

  }

  @Input() categories: Category[] = [];
  @Input() customers: Customer[] = [];
  @Input() parts: Part[] = [];
  @Input() suppliers: Supplier[] = [];
  @Input() users: User[] = [];
  @Input() brands: Brand[] = [];
  @Input() phones: Phone[] = [];
  @Input() emails: Email[] = [];

  get login(){
    return this.authService.user;
  }

  get admin(){
    return this.authService.isAdmin();
  }

  handlerLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
