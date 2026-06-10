/** Ambient declaration so CSS module imports (web-only files) typecheck. */
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
