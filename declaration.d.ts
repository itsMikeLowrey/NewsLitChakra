declare module "next-sanity" {
  const value: any; // Override the type with `any`
  export default value;
}

declare module "@sanity/client" {
  const sanityClient: any;
  export default sanityClient;
}
