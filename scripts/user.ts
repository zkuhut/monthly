import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import consola from 'consola';
import minimist from 'minimist';

import { postsRoot } from './utils';

const argv = minimist(process.argv.slice(2));

const username = argv._[0];

async function createUser() {
  if (!username) {
    consola.error(`missing username!`);
    process.exit();
  }

  const userDir = path.join(postsRoot, username);
  const aboutDir = path.join(userDir, 'about');
  const tocFile = path.join(userDir, 'toc.ts');
  const isExist = fs.existsSync(userDir);
  const isTocExist = fs.existsSync(tocFile);

  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(aboutDir, { recursive: true });
  }

  if (!isTocExist) {
    fs.writeFileSync(tocFile, `export default {
  '/${username}/': [
    { text: 'About', link: '/${username}/about/' },
    // other post links
  ],
} as TOC;
`);
    console.log();
    consola.info(chalk.green`[TOC]`, chalk.grey`~>`, chalk.yellow`/posts/${username}/toc.ts`);
    if (isExist) return;
  }

  if (isExist) {
    consola.warn(`${username} already exists!`);
    process.exit();
  }

  fs.writeFileSync(`${aboutDir}/index.md`, `# About ${username}\n`);
  // fs.appendFileSync(`${postsRoot}/guide/index.md`, `- [${username}](../${username}/about/)\n`);
  consola.info(chalk.green`[Workspace]`, chalk.grey`~>`, chalk.yellow`/posts/${username}/`);
  consola.success(`${username} created successfully!\n`);
}

async function cli() {
  try {
    await createUser();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

if (require.main === module) cli();
