// regression test for generators
export function* testGenerator(): Generator<boolean> {
  return yield true;
}
