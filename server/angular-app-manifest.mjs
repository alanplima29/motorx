
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://alanplima29.github.io/motorx/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 2229, hash: '60264e9baa14711703bef051ab309331fbcd5ee4644b30a68e8db59a5a84b06b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1042, hash: 'e78f1548015c206dab599735911047d7de8bfa2c7e79ac804f7ebcd94df598bb', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-PLPOUH33.css': {size: 18288, hash: 'IXrici4H/Xw', text: () => import('./assets-chunks/styles-PLPOUH33_css.mjs').then(m => m.default)}
  },
};
