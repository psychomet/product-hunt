import * as dotenv from 'dotenv';
import * as path from 'path';

/**
 * Loads environment variables from .env file
 * @param envPath Optional path to a specific .env file
 */
export function loadEnv(envPath?: string): void {
  // If specific path is provided, load from there
  if (envPath) {
    dotenv.config({ path: envPath });
    return;
  }

  // Otherwise, try to load from the root of the project
  const rootPath = path.join(process.cwd(), '.env');
  dotenv.config({ path: rootPath });
} 