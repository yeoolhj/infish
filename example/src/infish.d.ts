declare module "@infish/module" {
  export * from "node_modules/@infish/module";
  import { MCtx } from "node_modules/@infish/module";
  import * as modules from "@/modules";
  export type ICtx = Partial<MCtx<typeof modules>>;
}
