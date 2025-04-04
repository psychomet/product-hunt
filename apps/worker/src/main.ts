import { bootstrapWorker } from '@vendure/core';
import { config } from './vendure-config';
import { loadEnv } from '@bigi-shop/util-config';

// Load environment variables from .env file
loadEnv();

/**
 * Bootstrap the Vendure worker process
 */
bootstrapWorker(config)
  .then(async (worker) => {
    console.log('Worker process started.');
    await worker.startJobQueue();
    await worker.startHealthCheckServer({
        port: 3123,
    });
    // Keep the process alive with a heartbeat interval
    const heartbeatInterval = setInterval(() => {
      // This interval keeps the process alive
      // You could add health check logging here if desired
    }, 30000); // Every 30 seconds
    
    // Handle process termination
    process.on('SIGINT', () => {
      console.log('Received SIGINT, worker shutting down...');
      clearInterval(heartbeatInterval);
      process.exit(0);
    });
    
    process.on('SIGTERM', () => {
      console.log('Received SIGTERM, worker shutting down...');
      clearInterval(heartbeatInterval);
      process.exit(0);
    });
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
