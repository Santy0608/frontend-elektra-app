import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SharingDataServiceUser } from '../../services/sharing-data-user.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Customer } from '../../models/Customer';
import { User } from '../../models/User';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{

  errors: any;
  users: User[] = [];

  constructor(private userService: UserService, private sharingDataService: SharingDataServiceUser, private router: Router, private authService: AuthService){
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state){
      this.users = navigation.extras.state['users'];
    }
  }

  ngOnInit(): void {
    if (this.users == undefined || this.users == null || this.users.length == 0){
      console.log('User List');
      this.userService.userList().subscribe(user => this.users = user);
    }
  }

  OnRemoveUser(id: number){
    const user = this.users.find(u => u.idUser === id);
    if (!user){
      console.log('User not found by id: ', id);
      return
    }

    Swal.fire({
      title: "¿Estás Seguro?",
      text: "Cuidado, este usuario será eliminado del sistema.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí,eliminar"
        }).then((result) => {
          if (result.isConfirmed) {
            this.userService.deleteUser(id).subscribe({
              next: () => {
                this.users = this.users.filter(u => u.idUser !== id);
        
                  // Navegación (si es necesaria)
                this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
                  this.router.navigate(['/users'], { state: { users: this.users } });
                });
        
              Swal.fire("¡Elimminado!", "El usuario ha sido eliminado exitosamente", "success");
              },
              error: (err) => {
                console.error(err);
                Swal.fire("Error", "Hubo un problema al eliminar el usuario", "error");
              }
            });
          }
      });
  }

  OnSelectedUser(user: User): void{
    this.router.navigate(['/users/edit', user.idUser]);
  }

  get admin(){
    return this.authService.isAdmin();
  }

}
