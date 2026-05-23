import * as migration_20260406_211459 from './20260406_211459';
import * as migration_20260523_000000 from './20260523_000000';

export const migrations = [
  {
    up: migration_20260406_211459.up,
    down: migration_20260406_211459.down,
    name: '20260406_211459'
  },
  {
    up: migration_20260523_000000.up,
    down: migration_20260523_000000.down,
    name: '20260523_000000'
  },
];
