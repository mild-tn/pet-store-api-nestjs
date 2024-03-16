import { CategoryEnum } from 'src/entities/category.entity';
import { StatusEnum } from 'src/entities/status.entity';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTables1628536870940 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create Status table
    await queryRunner.createTable(
      new Table({
        name: 'status',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
        ],
      }),
    );
    // Insert initial status data
    await queryRunner.query(
      `INSERT INTO status (name) VALUES ('${StatusEnum.AVAILABLE}'), ('${StatusEnum.PENDING}'), ('${StatusEnum.SOLD}')`,
    );

    // Create Categories table
    await queryRunner.createTable(
      new Table({
        name: 'categories',
        columns: [
          {
            name: 'category_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
        ],
      }),
    );

    await queryRunner.query(
      `INSERT INTO categories (name) VALUES ('${CategoryEnum.BIRD}'), ('${CategoryEnum.CAT}'), ('${CategoryEnum.DOG}'), ('${CategoryEnum.FISH}'), ('${CategoryEnum.RABBIT}'), ('${CategoryEnum.OTHER}')`,
    );

    // Create Pets table
    await queryRunner.createTable(
      new Table({
        name: 'pet',
        columns: [
          {
            name: 'pet_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
          { name: 'photo_url', type: 'varchar' },
          { name: 'category_id', type: 'int' },
          { name: 'status_id', type: 'int', default: 1 }, // Default status to AVAILABLE
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: true,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
            default: 'CURRENT_TIMESTAMP',
          },
          { name: 'deleted_at', type: 'timestamp', isNullable: true },
        ],
      }),
    );
    // Create foreign key for status_id
    await queryRunner.createForeignKey(
      'pet',
      new TableForeignKey({
        columnNames: ['status_id'],
        referencedTableName: 'status',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'pet',
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedTableName: 'categories',
        referencedColumnNames: ['category_id'],
        onDelete: 'CASCADE',
      }),
    );

    // Create Tags table
    await queryRunner.createTable(
      new Table({
        name: 'tags',
        columns: [
          {
            name: 'tag_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
        ],
      }),
    );

    // Create category_tags table
    await queryRunner.createTable(
      new Table({
        name: 'category_tags',
        columns: [
          { name: 'category_id', type: 'int', isPrimary: true },
          { name: 'tag_id', type: 'int', isPrimary: true },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'category_tags',
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedTableName: 'categories',
        referencedColumnNames: ['category_id'],
      }),
    );
    await queryRunner.createForeignKey(
      'category_tags',
      new TableForeignKey({
        columnNames: ['tag_id'],
        referencedTableName: 'tags',
        referencedColumnNames: ['tag_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('categories');
    await queryRunner.dropTable('status');
    await queryRunner.dropTable('pet');
    await queryRunner.dropTable('tags');
    await queryRunner.dropTable('category_tags');
  }
}
