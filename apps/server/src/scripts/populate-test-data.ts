import { populate } from '@vendure/core/cli';
import { bootstrap } from '@vendure/core';
import path from 'path';
import { config } from '../vendure-config';

// Get the paths to the assets
const assetsPath = path.join(process.cwd(), 'node_modules/@vendure/create/assets');
const productsPath = path.join(assetsPath, 'products.csv');
const imagesDir = path.join(assetsPath, 'images');
const initialData = require('@vendure/create/assets/initial-data.json');

populate(
    () => bootstrap({
        ...config,
        importExportOptions: {
            importAssetsDir: imagesDir,
        },
        dbConnectionOptions: {
            ...config.dbConnectionOptions,
            synchronize: true
        }
    }),
    initialData,
    productsPath
)
    .then(app => app.close())
    .catch(err => {
        console.log(err);
        process.exit(1);
    }); 