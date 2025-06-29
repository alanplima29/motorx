import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { PecaService } from '../../services/peca.service';
import { take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MensagemService } from '../../services/mensagem.service';
import { MensagemInfoComponent } from '../../components/mensagem-info/mensagem-info.component';




@Component({
  selector: 'app-cadastro-pecas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,FormsModule, MensagemInfoComponent],
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
  mensagemImportante = 'Atenção: revise os dados antes de enviar!';

  constructor(private fb: FormBuilder, private router: Router, private pecaService: PecaService, private mensagemService: MensagemService) {
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
  //requisito 08
  carregarPecas() {
  this.pecaService.listar().pipe(take(1)).subscribe({
    next: (data) => this.pecas = data,
    error: (err) => console.error('Erro ao carregar peças:', err)
  });
}


  // REQUISITO 09
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
          //REQUISITO 12
          this.mensagemService.enviar('Peça salva com sucesso!');
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
  //requisito 08
  enviarParaSeparacao() {
    this.mensagemEnvio = 'Pedido enviado para separação!';
    setTimeout(() => this.mensagemEnvio = '', 3000);
  }

  logout() {
    localStorage.removeItem('usuarioLogado');
    this.router.navigate(['/login']);
  }

  filtro = ''; //requisito 10

pecasFiltradas() {
  return this.pecas.filter(p =>
    p.nome.toLowerCase().includes(this.filtro.toLowerCase())
  );
}

}
