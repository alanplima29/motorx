import { RegistroComponent } from './pages/registro/registro.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroPecasComponent} from './pages/cadastro/cadastro-pecas.component';
import { DetalhesPedidoComponent } from './pages//detalhes-pedido/detalhes-pedido.component';



export const routes: Routes = [
    {path: '',component: LoginComponent,},
    { path: 'login', component: LoginComponent }, 
    { path: 'pecas', component: CadastroPecasComponent},
    { path: 'pedido/detalhes', component: DetalhesPedidoComponent },
    { path: 'registro', component: RegistroComponent},
];
