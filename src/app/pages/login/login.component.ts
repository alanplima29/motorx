import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; 
import { MensagemService } from '../../services/mensagem.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  mensagemRecebida = '';
  isMenuOpen = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mensagemService: MensagemService
  ) {
    this.form = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {

    //REQUISITO 12
    this.mensagemService.mensagem$.subscribe(msg => {
      this.mensagemRecebida = msg;
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    localStorage.setItem('usuarioLogado', 'true');
    this.router.navigate(['/pecas']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
