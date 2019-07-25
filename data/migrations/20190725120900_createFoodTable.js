exports.up = function(knex) {
  return knex.schema
    .createTable("users", users => {
      users.increments();
      users
        .string("username", 128)
        .notNullable()
        .unique();
      users.string("password", 128).notNullable();
      users.string("department", 128).notNullable();
    })
    .createTable("foods", foods => {
      foods.increments();
      foods
        .string("name", 128)
        .notNullable()
        .unique();
      foods.float("proteins").notNullable();
      foods.float("carbohydrates").notNullable();
      foods.float("fats").notNullable();
      foods.float("calories").notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("foods").dropTableIfExists("users");
};
