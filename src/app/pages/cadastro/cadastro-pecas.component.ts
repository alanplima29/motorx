import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-pecas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cadastro-pecas.component.html',
  styleUrls: ['./cadastro-pecas.component.css']
})
export class CadastroPecasComponent implements OnInit {
  mensagem = '';
  mensagemEnvio = '';
  pecaASerExcluida: number | null = null;
  pecaEmEdicao: any = null;
  menuAberto = false;

  pecas: any[] = [];

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      categoria: ['', Validators.required],
      quantidade: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.carregarPecas();
  }

  // Método que carrega os dados do banco via Promise (GET)
  async carregarPecas() {
    try {
      const resposta = await fetch('http://localhost/listar_pecas.php');
      const data = await resposta.json();
      this.pecas = data;
    } catch (erro) {
      console.error('Erro ao carregar peças:', erro);
    }
  }

  // Método assíncrono que trata cadastro e edição (POST)
  async salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dados = this.form.value;

    if (this.pecaEmEdicao) {
      const dadosAtualizados = { ...dados, id: this.pecaEmEdicao.id };

      try {
        const resposta = await fetch('http://localhost/atualizar_peca.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dadosAtualizados)
        });

        const resultado = await resposta.json();

        if (resultado.success) {
          this.mensagem = resultado.message;
          this.carregarPecas();
          this.pecaEmEdicao = null;
          this.form.reset({ quantidade: 0 });
        } else {
          this.mensagem = 'Erro: ' + resultado.message;
        }
      } catch (erro) {
        console.error('Erro ao atualizar:', erro);
        this.mensagem = 'Erro ao conectar com o servidor.';
      }
    } else {
      try {
        const resposta = await fetch('http://localhost/salvar_peca.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if (resultado.success) {
          this.mensagem = resultado.message;
          this.form.reset({ quantidade: 0 });
          this.carregarPecas();
        } else {
          this.mensagem = 'Erro: ' + resultado.message;
        }
      } catch (erro) {
        console.error('Erro de requisição:', erro);
        this.mensagem = 'Erro ao conectar com o servidor.';
      }
    }

    setTimeout(() => this.mensagem = '', 3000);
  }

  // Envia os dados da peça para edição
  editar(peca: any) {
    this.pecaEmEdicao = peca;
    this.form.patchValue(peca);
  }

  // Confirma visualmente antes de excluir
  pedirConfirmacaoExclusao(id: number) {
    this.pecaASerExcluida = id;
    setTimeout(() => {
      if (this.pecaASerExcluida === id) {
        this.cancelarExclusao();
      }
    }, 5000);
  }

  // Exclui do banco com Promise (DELETE)
  async confirmarExclusao(id: number) {
    try {
      const resposta = await fetch('http://localhost/excluir_peca.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      const resultado = await resposta.json();

      if (resultado.success) {
        this.mensagem = resultado.message;
        this.pecas = this.pecas.filter(p => p.id !== id);
      } else {
        this.mensagem = 'Erro: ' + resultado.message;
      }
    } catch (erro) {
      console.error('Erro ao excluir:', erro);
      this.mensagem = 'Erro ao conectar com o servidor.';
    }

    this.pecaASerExcluida = null;
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

  logout() {
    localStorage.removeItem('usuarioLogado');
    this.router.navigate(['/login']);
  }
}
