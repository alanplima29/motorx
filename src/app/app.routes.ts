import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component';
import { CadastroPecasComponent} from './pages/cadastro-pecas.component';

export const routes: Routes = [
    {path: '',component: LoginComponent,},
    { path: 'pecas', component: CadastroPecasComponent},
];
