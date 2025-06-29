import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mensagem-info',
  standalone: true,
  imports: [CommonModule],
  template: `<p class="text-sm text-blue-600 text-center">{{ texto }}</p>`,
})
export class MensagemInfoComponent {
  @Input() texto: string = '';
}
