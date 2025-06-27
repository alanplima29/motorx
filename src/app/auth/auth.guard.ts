import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Verifica se está no navegador antes de acessar localStorage
  const isBrowser = typeof window !== 'undefined';

  const isLoggedIn = isBrowser && localStorage.getItem('usuarioLogado') === 'true';

  return isLoggedIn;
};
