import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Exemplo simples: verifica se o usuário está logado com base em localStorage
  const isLoggedIn = localStorage.getItem('usuarioLogado') === 'true';

  return isLoggedIn;
};
