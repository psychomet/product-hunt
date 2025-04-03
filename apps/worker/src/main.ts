import { bootstrapWorker } from '@vendure/core';
import { config } from './vendure-config';
import { loadEnv } from '@bigi-shop/util-config';

// Load environment variables from .env file
loadEnv();

/**
 * Bootstrap the Vendure worker process
 */
bootstrapWorker(config)
  .then(worker => {
    console.log('Worker process started.');
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
