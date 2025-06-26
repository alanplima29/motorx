import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroPecasComponent } from './pages/cadastro/cadastro-pecas.component';
import { DetalhesPedidoComponent } from './pages/detalhes-pedido/detalhes-pedido.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PedidoComponent } from './pages/pedido/pedido.component'; // ← novo import

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'pecas', component: CadastroPecasComponent },
//Req. 16
  {
  path: 'pedido',
  loadComponent: () =>
    import('./pages/pedido/pedido.component').then(m => m.PedidoComponent),
  children: [
    {
      path: 'detalhes',
      loadComponent: () =>
        import('./pages/detalhes-pedido/detalhes-pedido.component').then(m => m.DetalhesPedidoComponent),
    }
  ]
},


  { path: 'registro', component: RegistroComponent },
];
