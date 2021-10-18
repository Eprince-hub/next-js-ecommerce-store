// Creating the migration to create table.
exports.up = async function up(sql) {
  await sql`
	 CREATE TABLE products (
     id integer PRIMARY KEY GENERATED BY DEFAULT AS      IDENTITY,
     name varchar(80) NOT NULL,
     title varchar(100) NOT NULL,
     quantity integer,
     description varchar(300),
     price integer,
     fitting varchar(200),
     color_choice varchar(20),
     image varchar(100)
);
	`;
};

// Creating the migration to remove table.
exports.down = async function down(sql) {
  await sql`DROP TABLE products`;
};
