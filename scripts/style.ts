import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import consola from 'consola';

import { vitepressRoot } from './utils';

const user = process.argv[2];

function stylesFile() {
  const files = fg.sync('**/user.scss', { cwd: path.resolve('posts'), ignore: [path.resolve('posts/.vitepress')] });
  const styleFile = path.resolve(vitepressRoot, 'style.js');
  let content = '';
  console.log(chalk.gray`$`, chalk.magenta`npm run style <username>\n`);
  console.log(chalk.green`[STYLE]`);
  files.forEach((i, idx) => {
    console.log(chalk.green`  ${idx === files.length - 1 ? '`' : '|'}- `, chalk.yellow(i))
    content += `import('../${i}');\n`;
  });
  console.log();
  fs.writeFileSync(styleFile, content);
}

function createStyle() {
  const _path = `posts/${user}/user.scss`;
  const userFile = path.resolve(_path);
  if (fs.existsSync(_path)) {
    consola.warn(`/${_path} already exists!`);
    return;
  }
  fs.writeFileSync(userFile, `#app.${user}-app {\n  // style...\n}`);
  consola.info(chalk.green`[style]`, chalk.grey`~>`, chalk.yellow(`/${_path}`));
  consola.success(`user.scss created successfully!\n`);
}

function cli() {
  try {
    if (user) {
      createStyle();
      return;
    }
    stylesFile();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

if (require.main === module) cli();
