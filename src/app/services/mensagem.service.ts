import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MensagemService {
  private mensagemSubject = new BehaviorSubject<string>('');
  mensagem$ = this.mensagemSubject.asObservable();

  enviar(mensagem: string) {
    this.mensagemSubject.next(mensagem);
  }
}
