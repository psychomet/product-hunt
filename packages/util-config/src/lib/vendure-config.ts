import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import {
  Customer,
  DefaultJobQueuePlugin,
  DefaultLogger,
  DefaultSearchPlugin,
  dummyPaymentHandler,
  LogLevel,
  PasswordValidationStrategy,
  RequestContext,
  TypeORMHealthCheckStrategy,
  VendureConfig,
} from '@vendure/core';
import {
  defaultEmailHandlers,
  EmailPlugin,
  FileBasedTemplateLoader,
} from '@vendure/email-plugin';

import path from 'path';

const IS_DEV = process.env.APP_ENV === 'dev';
const serverPort = +(process.env.PORT || '3000');

import { ProductHuntPlugin } from '@product-hunt/product-hunt-plugin';

/**
 * Creates the base Vendure configuration
 * @param configOptions Additional options to customize the Vendure config
 * @returns VendureConfig object
 */
export function createVendureConfig(
  configOptions: {
    templatePath?: string; // Path to email templates
    migrationsPath?: string; // Path to migrations
    assetsPath?: string; // Path to assets directory
  } = {}
): VendureConfig {
  console.log(
    'createVendureConfig',
    path.join(process.cwd(), 'static/email/test-emails')
  );
  console.log('IS_DEV', IS_DEV);
  const {
    templatePath = path.join(process.cwd(), 'static/email/templates'),
    migrationsPath = path.join(process.cwd(), 'apps/server/src/migrations'),
    assetsPath = path.join(process.cwd(), 'static/data', 'assets'),
  } = configOptions;

  // Custom password validation
  class CustomPasswordValidationStrategy implements PasswordValidationStrategy {
    validate(ctx: RequestContext, password: string): boolean | string {
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
        return 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number';
      }
      return true;
    }
  }

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
      cors: {
        origin: process.env['CORS_ORIGIN'] || 'http://localhost:4200',
        credentials: true,
      },
    },
    authOptions: {
      tokenMethod: ['bearer', 'cookie'],
      superadminCredentials: {
        identifier: process.env.SUPERADMIN_USERNAME || 'superadmin',
        password: process.env.SUPERADMIN_PASSWORD || 'superadmin',
      },
      cookieOptions: {
        secret: process.env.COOKIE_SECRET || 'cookie-secret',
        // Set cookie options for better security
        sameSite: 'strict',
        secure: !IS_DEV,
        httpOnly: true,
      },
      verificationTokenDuration: '7d', // Verification token valid for 7 days
      requireVerification: true, // Require email verification
      passwordValidationStrategy: new CustomPasswordValidationStrategy(),
    },
    dbConnectionOptions: {
      type: 'postgres',
      host: process.env['DB_HOST'] || 'localhost',
      port: +(process.env['DB_PORT'] || 5432),
      username: process.env['DB_USERNAME'] || 'vendure',
      password: process.env['DB_PASSWORD'] || 'vendure',
      database: process.env['DB_NAME'] || 'vendure',
      synchronize: true, // Should be false in production
      logging: ['error', 'warn'],
      migrations: [path.join(migrationsPath, '*.+(js|ts)')],
      ssl: process.env['DB_SSL'] === 'true',
    },
    systemOptions: {
      healthChecks: [
        new TypeORMHealthCheckStrategy({ key: 'database', timeout: 5000 }),
      ],
    },
    paymentOptions: {
      paymentMethodHandlers: [dummyPaymentHandler],
    },
    logger: new DefaultLogger({
      level: LogLevel.Info,
    }),
    // When adding or altering custom field definitions, the database will
    // need to be updated. See the "Migrations" section in README.md.
    customFields: {
      Product: [
        {
          name: 'upvotes',
          type: 'int',
          defaultValue: 0,
          public: true,
        },
        {
          name: 'launchDate',
          type: 'datetime',
          public: true,
        },
        {
          name: 'status',
          type: 'string',
          options: [{ value: 'upcoming' }, { value: 'launched' }],
          defaultValue: 'upcoming',
          public: true,
        },
        {
          name: 'websiteUrl',
          type: 'string',
          public: true,
        },
        {
          name: 'makers',
          type: 'relation',
          entity: Customer,
          list: true,
          public: true,
        },
      ],
      Customer: [
        {
          name: 'bio',
          type: 'string',
          public: true,
        },
        {
          name: 'website',
          type: 'string',
          public: true,
        },
        {
          name: 'twitter',
          type: 'string',
          public: true,
        },
      ],
    },
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
      DefaultSearchPlugin.init({
        bufferUpdates: false,
        indexStockStatus: true,
      }),
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
          verifyEmailAddressUrl: 'http://localhost:4200/account/verify',
          passwordResetUrl: 'http://localhost:4200/account/password-reset',
          changeEmailAddressUrl:
            'http://localhost:4200/account/verify-email-address-change',
        },
      }),
      AdminUiPlugin.init({
        route: 'admin',
        port: serverPort + 2,
        adminUiConfig: {
          apiPort: serverPort,
        },
      }),
      ProductHuntPlugin,
    ],
  };
}
