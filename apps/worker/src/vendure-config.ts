import { createVendureConfig } from '@bigi-shop/util-config';
import path from 'path';

/**
 * Configuration for the Vendure worker.
 */
export const config = createVendureConfig({
  migrationsPath: path.join(__dirname, '../server/src/migrations'),
}); 