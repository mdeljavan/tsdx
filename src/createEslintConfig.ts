import { ESLint } from 'eslint';
import fs from 'fs-extra';
import path from 'path';
import { PackageJson } from './types';
import { getReactVersion } from './utils';

interface CreateEslintConfigArgs {
  pkg: PackageJson;
  rootDir: string;
  writeFile: boolean;
  ignorePatterns: string | string[];
}
export async function createEslintConfig({
  pkg,
  rootDir,
  writeFile,
  ignorePatterns,
}: CreateEslintConfigArgs): Promise<ESLint.Options['baseConfig'] | void> {
  const isReactLibrary = Boolean(getReactVersion(pkg));
  const config = {
    extends: ['react-app', 'plugin:prettier/recommended'],
    ignorePatterns,
    settings: {
      react: {
        // Fix for https://github.com/jaredpalmer/tsdx/issues/279
        version: isReactLibrary ? 'detect' : '999.999.999',
      },
    },
  };

  if (!writeFile) {
    return config;
  }

  const file = path.join(rootDir, '.eslintrc.js');
  try {
    await fs.writeFile(
      file,
      `module.exports = ${JSON.stringify(config, null, 2)}`,
      { flag: 'wx' }
    );
  } catch (e) {
    if ((e as any).code === 'EEXIST') {
      console.error(
        'Error trying to save the Eslint configuration file:',
        `${file} already exists.`
      );
    } else {
      console.error(e);
    }

    return config;
  }
}
