/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('contacts', {
    id: {
      type: 'uuid',
      nonNull: true,
      primaryKey: true,
      default: pgm.func('uuid_generate_v4()'),
      comment: 'This is the id field',
    },
    first_name: {
      type: 'VARCHAR(100)',
      nonNull: true,
    },
    last_name: {
      type: 'VARCHAR(100)',
    },
    phone: {
      type: 'VARCHAR(20)',
      nonNull: true,
    },
    email: {
      type: 'VARCHAR(100)',
    },
    company: {
      type: 'VARCHAR(100)',
    },
    created_at: {
      type: 'timestamptz',
      nonNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamptz',
      nonNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = pgm => {
  pgm.dropTable('contacts');
};
