/**
 * Copyright 2017 The Mifos Initiative.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Component, Input} from '@angular/core';
import {FormComponent} from '../../../../components/forms/form.component';
import {FormBuilder, Validators} from '@angular/forms';
import {IdentificationCard} from '../../../../services/customer/domain/identification-card.model';
import {extractDate, formatDate} from '../helper/date-helper';
import {ExpirationDate} from '../../../../services/customer/domain/expiration-date.model';

@Component({
  selector: 'fims-customer-identity-card-form',
  templateUrl: './identity-card.component.html'
})
export class CustomerIdentityCardFormComponent extends FormComponent<IdentificationCard>{

  @Input() set formData(identificationCard: IdentificationCard) {
    identificationCard = identificationCard || { type: 'id', number: '', expirationDate: undefined };

    const expirationDate: ExpirationDate = identificationCard.expirationDate;

    this.form = this.formBuilder.group({
      type: [identificationCard.type, [Validators.required]],
      number: [identificationCard.number, Validators.required],
      expirationDate: [expirationDate ? formatDate(expirationDate.year, expirationDate.month, expirationDate.day) : '', Validators.required],
      issuer: [identificationCard.issuer, Validators.required]
    })
  };

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  /**
   * Returns identification card if form is not pristine
   * @returns {any}
   */
  get formData(): IdentificationCard{
    if(this.form.pristine) return undefined;

    const expirationDate: string = this.form.get('expirationDate').value;
    const date = extractDate(expirationDate);

    return {
      type: this.form.get('type').value,
      number: this.form.get('number').value,
      expirationDate: {
        day: date.day,
        month: date.month,
        year: date.year
      },
      issuer: this.form.get('issuer').value
    }
  }

}
