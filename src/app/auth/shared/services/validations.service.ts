import { Injectable } from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Injectable()
export class ValidationsService {

  constructor() { }

  validateFields(field: AbstractControl) {
    return (field.invalid && field.dirty);
  }

}
