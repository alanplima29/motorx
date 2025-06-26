import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // <-- IMPORTAR MÓDULOS AQUI
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required]
    }, { validators: this.senhasIguais });
  }

  senhasIguais(group: FormGroup) {
    const senha = group.get('senha')?.value;
    const confirmar = group.get('confirmarSenha')?.value;
    return senha === confirmar ? null : { senhasDiferentes: true };
  }

  submit() {
    if (this.form.valid) {
      console.log('Cadastro válido:', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
