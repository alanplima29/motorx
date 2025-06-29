import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-detalhes-pedido',
  imports: [CommonModule, RouterModule],
  templateUrl: './detalhes-pedido.component.html',
})
export class DetalhesPedidoComponent implements OnInit {
  isMenuOpen = false;
  pedidoId: string | null = null; // ID capturado da URL

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.pedidoId = this.route.snapshot.paramMap.get('id');
    console.log('ID do pedido recebido:', this.pedidoId);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Requisito 06 
  etapas = [
    {
      data: '01/08/2025',
      hora: '09:22',
      titulo: 'Recebido pela Expedição',
      descricao: 'Pedido recebido com sucesso. Em breve entrará no processo de separação.',
      completa: true
    },
    {
      data: '01/08/2025',
      hora: '09:35',
      titulo: 'Em separação',
      descricao: 'Em processo de separação pela expedição.',
      completa: true
    },
    {
      data: '01/08/2025',
      hora: '10:45',
      titulo: 'Aguardando coleta',
      descricao: 'Aguardando um veículo para coletar o pedido e levar até o destino.',
      completa: true
    },
    {
      data: '',
      hora: '',
      titulo: 'Em trânsito',
      descricao: 'Pedido coletado e segue para a unidade de destino.',
      completa: false
    },
    {
      data: '',
      hora: '',
      titulo: 'Concluído',
      descricao: 'Pedido concluído com sucesso.',
      completa: false
    }
  ];

  logout() {
    localStorage.removeItem('usuarioLogado');
    this.router.navigate(['/login']);
  }
}
