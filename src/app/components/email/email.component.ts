import { Component, OnInit } from '@angular/core';
import { Email } from '../../models/Email';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmailService } from '../../services/email.service';
import { SharingDataServiceEmail } from '../../services/sharing-data-service-email.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-email',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './email.component.html',
  styleUrl: './email.component.css'
})
export class EmailComponent implements OnInit{

  emails: Email[] = [];
  errors: any;
  emailSearch: string = '';

  constructor(private router: Router, private emailService: EmailService, private sharingDataService: SharingDataServiceEmail, private authService: AuthService){
    if (this.emails == undefined || this.emails == null || this.emails.length == 0){
      console.log("Category List");
      this.emailService.emailList().subscribe(emails => this.emails = emails);
    }
  }

  searchEmails(): void{
    this.emailService.searchEmail(this.emailSearch)
      .subscribe(data => {
        this.emails = data;
      })
  }

  ngOnInit(): void {
    if (this.emails == undefined || this.emails == null || this.emails.length == 0){
      console.log("Category List");
      this.emailService.emailList().subscribe(emails => this.emails = emails);
    }
  }

  OnSelectedEmail(email: Email): void{
    this.router.navigate(['/emails/update', email.idEmail]);
  }

   onRemoveEmail(id: number){
         // Buscar el correo dentro del listado
      const email = this.emails.find(p => p.idEmail === id);
      if (!email) {
        console.error(`Email no encontrado con el Id: ${id}`);
        return;
      }
    
      Swal.fire({
        title: "¿Estás Seguro?",
        text: "Cuidado, este correo será eliminada del sistema",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.emailService.deleteEmailById(id).subscribe({
            next: () => {
              this.emails = this.emails.filter(e => e.idEmail !== id);
    
              this.router.navigate(['/emails/create'], { skipLocationChange: true }).then(() => {
                this.router.navigate(['/emails'], { state: { emails: this.emails } });
              });
    
              Swal.fire("¡Eliminado!", "El correo electrónico ha sido eliminada exitosamente", "success");
            },
            error: (err) => {
              console.error(err);
              Swal.fire("Error", "Hubo un problema al eliminar el correo electrónico", "error");
            }
          });
        }
      });
      }
  
      get admin(){
        return this.authService.isAdmin();
      }

}
