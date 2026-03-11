export async function resolve(specifier, context, nextResolve) {
  if (specifier === './useSoundEffect' || specifier === '../useSoundEffect') {
    return nextResolve(specifier + '.ts', context);
  }
  return nextResolve(specifier, context);
}
