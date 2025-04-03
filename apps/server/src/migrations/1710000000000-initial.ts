import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1710000000000 implements MigrationInterface {
    name = 'Initial1710000000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // This initial migration is empty because Vendure
        // will set up the database schema when first run
        console.log('Running initial migration...');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Nothing to undo in the initial migration
    }
} 