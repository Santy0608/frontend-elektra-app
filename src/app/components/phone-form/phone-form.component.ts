import { Component, OnInit } from '@angular/core';
import { Phone } from '../../models/Phone';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PhoneService } from '../../services/phone.service';
import { SharingDataServicePhone } from '../../services/sharing-data-service-phone.service';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-phone-form',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './phone-form.component.html',
  styleUrl: './phone-form.component.css'
})
export class PhoneFormComponent implements OnInit{

  phone!: Phone;
  errors: any;

  constructor(private router: Router, private phoneService: PhoneService, private route: ActivatedRoute, private sharingDataService: SharingDataServicePhone){
    this.phone = new Phone();
  }

  ngOnInit(): void {
    this.sharingDataService.errorsPhoneFormEventEmitter.subscribe(errors => this.errors = errors);
    this.sharingDataService.selectPhoneEventEmitter.subscribe(phone => this.phone = phone);
    this.route.paramMap.subscribe(params => {
      const id:number = +(params.get('idPhone') || '0');
      if (id > 0){
        this.phoneService.findPhoneById(id).subscribe(phone => this.phone = phone);
      }
    })
  }

  onSubmit(phoneForm: NgForm): void {
    if (phoneForm.invalid) return;

    const phone = phoneForm.value;

    if (this.phone.idPhone > 0) {
      this.phoneService.updatePhone(this.phone).subscribe(
        phoneUpdated => {
          Swal.fire({
            title: "¡Updated!",
            text: "¡Teléfono Actualizado Exitosamente!",
            icon: "success"
          });
          this.router.navigate(['/phones']);
        },
        error => {
          this.sharingDataService.errorsPhoneFormEventEmitter.emit(error);
        }
      );
    } else {
      this.phoneService.savePhone(this. phone).subscribe(
        newPhone => {
          Swal.fire({
            title: "¡Created!",
            text: "¡Teléfono creado exitosamente!",
            icon: "success"
          });
          this.router.navigate(['/phones']);
        },
        error => {
          this.sharingDataService.errorsPhoneFormEventEmitter.emit(error);
        }
      );
    }
  }

  onClear(phoneForm: NgForm): void{
      this.phone = new Phone();
      phoneForm.reset();
      phoneForm.resetForm();
  }


}
