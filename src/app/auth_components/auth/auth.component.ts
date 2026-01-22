import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/User';
import { SharingDataServiceUser } from '../../services/sharing-data-user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  user!: User;

  constructor(private sharingDataService: SharingDataServiceUser, private authService: AuthService, private router: Router){
    this.user = new User();
  }

  onSubmit() {
    if (!this.user.username || !this.user.password) {
      Swal.fire('Error de validación', 'Usuario o Contraseña requeridos', 'error');
      return; 
    }

    this.authService.loginUsuario({ 
      username: this.user.username, 
      password: this.user.password 
    }).subscribe({
      next: (response: { token:any; } ) => {
        const token = response.token;
        const payload = this.authService.getPayload(token);
        
       this.authService.token = token;

        //Guardar token en local storage
        this.authService.user = { 
          user: { username: payload.sub },
          isAuth: true,
          isAdmin: payload.isAdmin
       };
                                                  
        this.router.navigate(['/users']);
      }, 
      error: error => {
        if (error.status === 401) {
          Swal.fire('Error en el Login', error.error.message, 'error');
      } else {
         throw error; 
        }
      }
    });
  }


}
