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
import {Validators, FormBuilder} from '@angular/forms';
import {FimsValidators} from '../../../../components/validator/validators';
import {DateOfBirth} from '../../../../services/customer/domain/date-of-birth.model';
import {extractDate, formatDate} from '../helper/date-helper';
import {todayAsISOString} from '../../../../services/domain/date.converter';

export interface CustomerDetailFormData{
  identifier: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: DateOfBirth;
}

@Component({
  selector: 'fims-customer-detail-form',
  templateUrl: './detail.component.html'
})
export class CustomerDetailFormComponent extends FormComponent<CustomerDetailFormData> {

  other: string = "2016-02-01";

  today: string = todayAsISOString();

  @Input() set formData(formData: CustomerDetailFormData) {
    const dateOfBirth: DateOfBirth = formData.dateOfBirth;

    this.form = this.formBuilder.group({
      identifier: [formData.identifier, [Validators.required, Validators.minLength(3), Validators.maxLength(32), FimsValidators.urlSafe()]],
      firstName: [formData.firstName, Validators.required],
      middleName: [formData.middleName],
      lastName: [formData.lastName, Validators.required],
      dayOfBirth: [dateOfBirth ? formatDate(dateOfBirth.year, dateOfBirth.month, dateOfBirth.day) : '', Validators.required],
    })
  };

  @Input() editMode: boolean;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  get formData(): CustomerDetailFormData{
    const birthDateAsString: string = this.form.get('dayOfBirth').value;

    const date = extractDate(birthDateAsString);

    return {
      identifier: this.form.get('identifier').value,
      firstName: this.form.get('firstName').value,
      middleName: this.form.get('middleName').value,
      lastName: this.form.get('lastName').value,
      dateOfBirth: {
        year: date.year,
        month: date.month,
        day: date.day,
      }
    }
  }

}
