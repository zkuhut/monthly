import minimist from 'minimist';

import { vitepressRoot, updateJSON } from './utils';

const argv = minimist(process.argv.slice(2));

const { _, ...envArgs } = argv;

function envJSON() {
  updateJSON(`${vitepressRoot}/env.json`, envArgs);
}

function cli() {
  try {
    envJSON();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

if (require.main === module) cli();
