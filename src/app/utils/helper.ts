import { FormGroup } from '@angular/forms';

/**
 * Mark all FormGroup controls as touched and also controls of their childs.
 * @param formGroup FormGroup instance.
 */
export const markFormGroupTouched = (formGroup: FormGroup) => {
    (<any>Object).values(formGroup.controls).forEach(control => {
        control.markAsTouched();

        if (control.controls) {
            markFormGroupTouched(control);
        }
    });
};