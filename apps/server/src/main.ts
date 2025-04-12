import { bootstrap, runMigrations } from '@vendure/core';
import { config } from './vendure-config';
import { loadEnv } from '@product-hunt/util-config';

// Load environment variables from .env file
loadEnv();

/**
 * Bootstrap the Vendure server
 */
runMigrations(config)
  .then(() => bootstrap(config))
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
