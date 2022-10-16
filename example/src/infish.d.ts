declare module "infish" {
  export * from "node_modules/infish";
  import { MCtx } from "node_modules/infish";
  import * as modules from "@/modules";
  export type ICtx = Partial<MCtx<typeof modules>>;
}
