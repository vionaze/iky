import * as migration_20261018_205539_init from './20261018_205539_init';

export const migrations = [
  {
    up: migration_20261018_205539_init.up,
    down: migration_20261018_205539_init.down,
    name: '20261018_205539_init'
  },
];
