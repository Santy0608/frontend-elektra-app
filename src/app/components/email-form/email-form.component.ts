import { Component, OnInit } from '@angular/core';
import { Email } from '../../models/Email';
import { EmailService } from '../../services/email.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharingDataServiceEmail } from '../../services/sharing-data-service-email.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-email-form',
  imports: [],
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.css'
})
export class EmailFormComponent implements OnInit{

  email!: Email;
  errors: any;

  constructor(private emailService: EmailService, private router: Router, private route: ActivatedRoute, private sharingDataService: SharingDataServiceEmail){
    this.email = new Email();
  }

  ngOnInit(): void {
    this.sharingDataService.errorsEmailFormEventEmitter.subscribe(errors => this.errors = errors);
    this.sharingDataService.selectEmailEventEmitter.subscribe(email => this.email = email);
    this.route.paramMap.subscribe(params => {
      const id:number = +(params.get('idEmail') || '0');
      if (id > 0){
        this.emailService.findEmailById(id).subscribe(email => this.email = email);
      }
    })
  }

   onSubmit(emailForm: NgForm): void {
    if (emailForm.invalid) return;

    const email = emailForm.value;

    if (this.email.idEmail > 0) {
      this.emailService.updateEmail(this.email).subscribe(
        emailUpdated => {
          Swal.fire({
            title: "¡Actualizado!",
            text: "¡Correo Actualizado Exitosamente!",
            icon: "success"
          });
          this.router.navigate(['/emails']);
        },
        error => {
          this.sharingDataService.errorsEmailFormEventEmitter.emit(error);
        }
      );
    } else {
      this.emailService.saveEmail(this.email).subscribe(
        newEmail => {
          Swal.fire({
            title: "¡Creado!",
            text: "¡Correo creado exitosamente!",
            icon: "success"
          });
          this.router.navigate(['/emails']);
        },
        error => {
          this.sharingDataService.errorsEmailFormEventEmitter.emit(error);
        }
      );
    }
  }

  onClear(emailForm: NgForm): void{
      this.email = new Email();
      emailForm.reset();
      emailForm.resetForm();
  }


}
