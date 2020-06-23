import * as fs from 'fs';
import * as path from 'path';
import * as prettier from 'prettier';

const ROOT_DIR = path.join(__dirname, '..');
const ICONS_DIR = path.join(ROOT_DIR, 'src/assets/icons');
const ICONS_LIST_FILE = path.join(ROOT_DIR, 'src/app/icons.json');

(async function genIconsList() {
    const icons = fs.readdirSync(ICONS_DIR).map((file) => file.slice(0, -4));
    const filePath = await prettier.resolveConfigFile();
    const options = await prettier.resolveConfig(filePath);
    const formatted = prettier.format(JSON.stringify(icons), { ...options, parser: 'json' });
    fs.writeFileSync(ICONS_LIST_FILE, formatted);
    console.log(`Icons list generated: ${ICONS_LIST_FILE}`);
})();
