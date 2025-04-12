import { createVendureConfig } from '@product-hunt/util-config';
import path from 'path';

/**
 * Configuration for the Vendure worker.
 */
export const config = createVendureConfig({
  migrationsPath: path.join(__dirname, '../server/src/migrations'),
}); 