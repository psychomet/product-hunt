import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'product/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: 'account/orders/:code',
    renderMode: RenderMode.Server,
  },
  {
    path: 'account/address-book/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
]; 