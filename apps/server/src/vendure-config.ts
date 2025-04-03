import { createVendureConfig } from '@bigi-shop/util-config';
import path from 'path';

/**
 * Configuration for the Vendure server.
 */
export const config = createVendureConfig({
  templatePath: path.join(process.cwd(), 'static/email/templates'),
  migrationsPath: path.join(__dirname, 'migrations'),
}); 