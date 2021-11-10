import { PackageJson } from 'type-fest';
import { Options } from 'prettier';

export type Husky = {
  husky: {
    hooks: Record<string, string>;
  };
};

export type Prettier = {
  prettier: Options;
};

type WithHusky<T> = T & Husky;
type WithPrettier<T> = T & Prettier;

interface Template {
  dependencies: string[];
  name: string;
  packageJson: WithPrettier<WithHusky<PackageJson>>;
}
