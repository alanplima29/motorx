
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/motorx/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "src/app/pages/pedido/pedido.component.ts": [
    {
      "path": "chunk-OL3JUZPK.js",
      "dynamicImport": false
    }
  ],
  "src/app/pages/detalhes-pedido/detalhes-pedido.component.ts": [
    {
      "path": "chunk-NYBLM5TR.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 2251, hash: '4d36420a0d114e7f4ec81aaec2ff15a242de38a1205629f68a6fec680f3b9f05', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1064, hash: '93e322a14af69ac5cfe3b65bba1659d3c7255fb61ea55ca27bc1d8a05c045c97', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-ZVHHQQWS.css': {size: 20172, hash: 'eONbptb7vyc', text: () => import('./assets-chunks/styles-ZVHHQQWS_css.mjs').then(m => m.default)}
  },
};
