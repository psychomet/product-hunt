import path from 'path';

import { createVendureConfig } from '@product-hunt/util-config';

/**
 * Configuration for the Vendure server.
 */
export const config = createVendureConfig({
  migrationsPath: path.join(__dirname, 'migrations'),
}); 