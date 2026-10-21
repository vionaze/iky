import * as migration_20261018_205539_init from './20261018_205539_init';
import * as migration_20261021_133144_editable_content from './20261021_133144_editable_content';

export const migrations = [
  {
    up: migration_20261018_205539_init.up,
    down: migration_20261018_205539_init.down,
    name: '20261018_205539_init',
  },
  {
    up: migration_20261021_133144_editable_content.up,
    down: migration_20261021_133144_editable_content.down,
    name: '20261021_133144_editable_content'
  },
];
