import { PackageJson } from 'type-fest';
import { Options } from 'prettier';

type Husky = {
  husky: {
    hooks: Record<string, string>;
  };
};

type Prettier = {
  prettier: Options;
};

type WithHusky<T> = T & Husky;
type WithPrettier<T> = T & Prettier;

interface Template {
  dependencies: string[];
  name: string;
  packageJson: WithPrettier<WithHusky<PackageJson>>;
}
