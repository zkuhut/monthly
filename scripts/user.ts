import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import consola from 'consola';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

const postsDir = path.resolve(__dirname, '../posts');
const username = argv._[0];

async function createUser() {
  if (!username) {
    consola.error('Missing username!');
    process.exit();
  }

  const userDir = path.join(postsDir, username);
  const aboutDir = path.join(userDir, 'about');
  const isExist = fs.existsSync(userDir);

  if (isExist) {
    consola.warn('Username already exists!');
    process.exit();
  }

  console.log();
  fs.mkdirSync(aboutDir, { recursive: true });
  fs.writeFileSync(`${aboutDir}/index.md`, `# About ${username}\n`);
  fs.appendFileSync(`${postsDir}/index.md`, `- [${username}](./${username}/about/)\n`)
  consola.success('User created successfully!');
  consola.info(chalk.bgGray`Workspace ~>`, chalk.yellow`/posts/${username}/\n`);
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