import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastro-pecas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cadastro-pecas.component.html',
  styleUrls: ['./cadastro-pecas.component.css']
})
export class CadastroPecasComponent {
  mensagem = '';
  mensagemEnvio = '';
  pecaASerExcluida: number | null = null;
  pecaEmEdicao: any = null;
  menuAberto = false;

  pecas = [
    { id: 1, nome: 'Filtro de Óleo', categoria: 'Motor', quantidade: 12 },
    { id: 2, nome: 'Pastilha de Freio', categoria: 'Freios', quantidade: 30 },
    { id: 3, nome: 'Amortecedor Traseiro', categoria: 'Suspensão', quantidade: 8 }
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      categoria: ['', Validators.required],
      quantidade: [0, [Validators.required, Validators.min(1)]],
    });
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dados = this.form.value;

    if (this.pecaEmEdicao) {
      const index = this.pecas.findIndex(p => p.id === this.pecaEmEdicao.id);
      if (index !== -1) {
        this.pecas[index] = { ...dados, id: this.pecaEmEdicao.id };
      }
      this.mensagem = 'Peça atualizada com sucesso!';
      this.pecaEmEdicao = null;
    } else {
      const novaPeca = { ...dados, id: Date.now() };
      this.pecas.push(novaPeca);
      this.mensagem = 'Peça adicionada com sucesso!';
    }

    this.form.reset({ quantidade: 0 });
    setTimeout(() => this.mensagem = '', 3000);
  }

  editar(peca: any) {
    this.pecaEmEdicao = peca;
    this.form.patchValue(peca);
  }

  pedirConfirmacaoExclusao(id: number) {
    this.pecaASerExcluida = id;
    setTimeout(() => {
      if (this.pecaASerExcluida === id) {
        this.cancelarExclusao();
      }
    }, 5000);
  }

  confirmarExclusao(id: number) {
    this.pecas = this.pecas.filter(p => p.id !== id);
    this.pecaASerExcluida = null;
    this.mensagem = 'Peça excluída com sucesso!';
    setTimeout(() => this.mensagem = '', 3000);
  }

  cancelarExclusao() {
    this.pecaASerExcluida = null;
  }

  cancelarEdicao() {
    this.pecaEmEdicao = null;
    this.form.reset({ quantidade: 0 });
  }

  enviarParaSeparacao() {
    this.mensagemEnvio = 'Pedido enviado para separação!';
    setTimeout(() => this.mensagemEnvio = '', 3000);
  }
}
