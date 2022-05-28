export function handle(fn: () => Promise<any>) {
  return fn()
    .then((data) => [data, null])
    .catch((error: Error) => [null, error]);
}
