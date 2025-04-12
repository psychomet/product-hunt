import { createVendureConfig } from '@product-hunt/util-config';
import path from 'path';

/**
 * Configuration for the Vendure server.
 */
export const config = createVendureConfig({
  migrationsPath: path.join(__dirname, 'migrations'),
}); 