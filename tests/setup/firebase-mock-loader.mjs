export async function resolve(specifier, context, nextResolve) {
  if (specifier === 'firebase/analytics') {
    return {
      shortCircuit: true,
      url: new URL('./mock-firebase-analytics.mjs', import.meta.url).href
    };
  }
  return nextResolve(specifier, context);
}
