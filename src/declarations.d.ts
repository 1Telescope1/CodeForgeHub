declare module "*?raw" {
  const src: string;
  export default src;
}

declare module "*.md" {
  const content: string;
  export default content;
}

// declare module "*.sql" {
//   const content: string;
//   export default content;
// }
