
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
    'index.csr.html': {size: 2251, hash: '919eeeda8ad769f882d3299ca3940bba9729c0371ed46070e48aa5b7e2508064', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1064, hash: 'bbb75fbf02205420b68a0968d859dbd015751271e58fc703005b74389e182cd1', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-ZVHHQQWS.css': {size: 20172, hash: 'eONbptb7vyc', text: () => import('./assets-chunks/styles-ZVHHQQWS_css.mjs').then(m => m.default)}
  },
};
