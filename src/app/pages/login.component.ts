import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
  login: ['', [Validators.required, Validators.email]],
  senha: ['', [Validators.required, Validators.minLength(6)]],
});

  }

  submit() {

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

}

}
