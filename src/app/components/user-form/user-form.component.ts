import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { SharingDataServiceUser } from '../../services/sharing-data-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule, RouterModule, CommonModule, RouterLink],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit{

  errors: any;
  user: User = new User();
  modo: 'agregar' | 'editar' = 'agregar';


  constructor(private userService: UserService, private sharingDataService: SharingDataServiceUser, private route: ActivatedRoute, private router: Router){
    this.user = new User();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +(params.get('idUser') || '0');
      if (id > 0) {
        this.userService.findUserById(id).subscribe(user => {
          this.user = user;
          this.modo = 'editar';
        });
      } else {
        this.user = new User(); 
        this.modo = 'agregar';
      }
    });
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.invalid) return;

    const user = userForm.value;

    if (this.user.idUser > 0) {
      this.userService.updateUser(this.user).subscribe(
        userUpdated => {
          Swal.fire({
            title: "¡Actualizado!",
            text: "¡Usuario actualizado exitosamente!",
            icon: "success"
          });
          this.router.navigate(['/users']);
        },
        error => {
          this.sharingDataService.errorsUserFormEventEmitter.emit(error);
        }
      );
    } else {
      this.userService.saveUser(this.user).subscribe(
        newUser => {
          Swal.fire({
            title: "¡Creado!",
            text: "¡Usuario creado exitosamente!",
            icon: "success"
          });
          this.router.navigate(['/users']);
        },
        error => {
          this.sharingDataService.errorsUserFormEventEmitter.emit(error);
        }
      );
    }
  }


  onClear(userForm: NgForm): void{
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }

  showPasswordField(): boolean{
    return this.modo === 'agregar';
  }

}
