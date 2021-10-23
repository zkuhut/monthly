import path from 'path';
import fs from 'fs';

// Path
export const postsRoot = path.resolve(__dirname, '../posts');
export const vitepressRoot = path.resolve(postsRoot, '.vitepress');

// JSON File
export const readJSON = (path: string) => JSON.parse(fs.readFileSync(path, 'utf8'));
export const writeJSON = (path: string, data: Record<string, any>) => (
  fs.writeFileSync(path, JSON.stringify(data, null, 2))
);
export const updateJSON = (path: string, data: Record<string, any>) => (
  fs.writeFileSync(path, JSON.stringify(Object.assign(readJSON(path), data), null, 2))
);