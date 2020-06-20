import * as Knex from 'knex';

const tableName = 'users';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.increments();
    t.string('email').unique();
    t.string('username').unique();
    t.string('password');
    t.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
