import {Component} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

import {PaymentDetail} from '../../shared/payment-detail.model';
import {PaymentDetailService} from '../../shared/payment-detail.service';

@Component({
    selector : 'app-payment-details-form',
    standalone : true,
    imports : [ FormsModule ],
    templateUrl : './payment-details-form.component.html',
    styles : ``
})
export class PaymentDetailsFormComponent {
    constructor(public service: PaymentDetailService,
                private toastr: ToastrService) {}

    onSubmit(form: NgForm) {
        this.service.formSubmitted = true;
        if (form.valid) {
            if (this.service.formData.paymentDetailId == 0) {
                this.insertRecord(form);
            } else {
                this.updateRecord(form);
            }
        }
    }

    insertRecord(form: NgForm) {

        this.service.postPaymentDetail().subscribe({
            next : res => {
                this.service.list = res as PaymentDetail[];
                this.service.resetForm(form);
                this.toastr.success(`Inserted Successfully`,
                                    `Payment Detail Register`);
            },
            error : error => console.error('Error adding payment detail', error)
        });
    }
    updateRecord(form: NgForm) {
      this.service.putPaymentDetail().subscribe({
        next : res => {
            this.service.list = res as PaymentDetail[];
            this.service.resetForm(form);
            this.toastr.info(`Updated Successfully`,
                                `Payment Detail Register`);
        },
        error : error => console.error('Error adding payment detail', error)
    });
    }
}
