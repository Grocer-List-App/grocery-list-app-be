exports.up = function (knex) {
    return knex.schema
      .createTable('roles', roles => {
        roles.increments('role_id')
        roles.string('role_name', 32).notNullable().unique()
      })
      .createTable('users', users => {
        users.increments('id')
        users.string('username', 200).notNullable().unique()
        users.string('password', 200).notNullable()
        users.integer('role_id')
          .unsigned()
          .notNullable()
          .references('role_id')
          .inTable('roles')
          .onDelete('CASCADE')
      })
  }
  
  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists('classes')
      .dropTableIfExists('users')
      .dropTableIfExists('roles')
  }