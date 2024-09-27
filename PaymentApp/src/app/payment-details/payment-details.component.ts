import {JsonPipe, NgFor} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

import {PaymentDetail} from '../shared/payment-detail.model';
import {PaymentDetailService} from '../shared/payment-detail.service';

import {
    PaymentDetailsFormComponent
} from './payment-details-form/payment-details-form.component';

@Component({
    selector : 'app-payment-details',
    standalone : true,
    imports : [ PaymentDetailsFormComponent, JsonPipe, NgFor ],
    templateUrl : './payment-details.component.html',
    styles : ``
})
export class PaymentDetailsComponent implements OnInit {

    constructor(public service: PaymentDetailService,
                private toastr: ToastrService) {}
    ngOnInit(): void { this.service.refreshList(); }

    populateForm(selectedRecord: PaymentDetail) {
        this.service.formData = Object.assign({}, selectedRecord);
    }

    onDelete(id: number): void {
        if (confirm('Are you sure you want to delete this record?')) {
            this.service.deletePaymentDetail(id).subscribe({
                next : res => {
                    this.service.list = res as PaymentDetail[];
                    this.toastr.error(`Deleted Successfully`,
                                      `Payment Detail Register`);
                },
                error : error =>
                    console.error('Error adding payment detail', error)
            });
        }
    }
}
