import {
  dummyPaymentHandler,
  DefaultJobQueuePlugin,
  DefaultSearchPlugin,
  VendureConfig,
} from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin, FileBasedTemplateLoader } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import path from 'path';

const IS_DEV = process.env.APP_ENV === 'dev';
const serverPort = +(process.env.PORT || '3000');

/**
 * Creates the base Vendure configuration
 * @param configOptions Additional options to customize the Vendure config
 * @returns VendureConfig object 
 */
export function createVendureConfig(
  configOptions: {
    templatePath?: string; // Path to email templates
    migrationsPath?: string; // Path to migrations
    databasePath?: string; // Path to database file
    assetsPath?: string; // Path to assets directory
  } = {}
): VendureConfig {
  const {
    templatePath = path.join(process.cwd(), 'static/email/templates'),
    migrationsPath = path.join(process.cwd(), 'apps/server/src/migrations'),
    databasePath = path.join(process.cwd(), 'static/data', 'vendure.sqlite'),
    assetsPath = path.join(process.cwd(), 'static/data', 'assets'),
  } = configOptions;

  return {
    apiOptions: {
      port: serverPort,
      adminApiPath: 'admin-api',
      shopApiPath: 'shop-api',
      // The following options are useful in development mode,
      // but are best turned off for production for security
      // reasons.
      ...(IS_DEV
        ? {
            adminApiPlayground: {
              settings: { 'request.credentials': 'include' },
            },
            adminApiDebug: true,
            shopApiPlayground: {
              settings: { 'request.credentials': 'include' },
            },
            shopApiDebug: true,
          }
        : {}),
    },
    authOptions: {
      tokenMethod: ['bearer', 'cookie'],
      superadminCredentials: {
        identifier: process.env.SUPERADMIN_USERNAME || 'superadmin',
        password: process.env.SUPERADMIN_PASSWORD || 'superadmin',
      },
      cookieOptions: {
        secret: process.env.COOKIE_SECRET || 'cookie-secret',
      },
    },
    dbConnectionOptions: {
      type: 'better-sqlite3',
      // See the README.md "Migrations" section for an explanation of
      // the `synchronize` and `migrations` options.
      synchronize: true,
      migrations: [path.join(migrationsPath, '*.+(js|ts)')],
      logging: false,
      database: databasePath,
    },
    paymentOptions: {
      paymentMethodHandlers: [dummyPaymentHandler],
    },
    // When adding or altering custom field definitions, the database will
    // need to be updated. See the "Migrations" section in README.md.
    customFields: {},
    plugins: [
      AssetServerPlugin.init({
        route: 'assets',
        assetUploadDir: assetsPath,
        // For local dev, the correct value for assetUrlPrefix should
        // be guessed correctly, but for production it will usually need
        // to be set manually to match your production url.
        assetUrlPrefix: IS_DEV ? undefined : 'https://www.my-shop.com/assets/',
      }),
      DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
      DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
      EmailPlugin.init({
        devMode: true,
        outputPath: path.join(process.cwd(), 'static/email/test-emails'),
        route: 'mailbox',
        handlers: defaultEmailHandlers,
        templateLoader: new FileBasedTemplateLoader(templatePath),
        globalTemplateVars: {
          // The following variables will change depending on your storefront implementation.
          // Here we are assuming a storefront running at http://localhost:8080.
          fromAddress: '"example" <noreply@example.com>',
          verifyEmailAddressUrl: 'http://localhost:8080/verify',
          passwordResetUrl: 'http://localhost:8080/password-reset',
          changeEmailAddressUrl: 'http://localhost:8080/verify-email-address-change',
        },
      }),
      AdminUiPlugin.init({
        route: 'admin',
        port: serverPort + 2,
        adminUiConfig: {
          apiPort: serverPort,
        },
      }),
    ],
  };
} 