import fg from 'fast-glob';
import path from 'path';
import chalk from 'chalk';

import { vitepressRoot, writeJSON } from './utils';

function sidebarJSON() {
  const files = fg.sync('**/toc.ts', { cwd: path.resolve('posts') });
  const sidebars = Object.create({});
  files.forEach(i => Object.assign(sidebars, require(`../posts/${i}`).default));
  const sidebarFile = path.resolve(vitepressRoot, 'sidebar.json');
  writeJSON(sidebarFile, sidebars);
  console.log(chalk.gray`$`, chalk.magenta`npm run user <username>\n`);
  console.log(chalk.green`[TOC]`);
  const routes = Object.keys(sidebars);
  routes.forEach((i, idx) => (
    console.log(chalk.green`  ${idx === routes.length - 1 ? '`' : '|'}- `, chalk.yellow(i), chalk.grey`posts${i}toc.ts`)
  ));
  console.log();
}

function cli() {
  try {
    sidebarJSON();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

if (require.main === module) cli();
