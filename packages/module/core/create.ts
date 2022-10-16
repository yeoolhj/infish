import { CtxRoot } from "./context";
import { ClassType, ObjType } from "./module";

export type MCtx<M extends ObjType<ClassType<any>>> = {
  [name in keyof M]: InstanceType<M[name]>;
};

export function createCtx<M extends { [name: string]: any }>(options: {
  modules: M;
  events?: Array<(ctx: MCtx<any>) => void>;
  ready?: (ctx: MCtx<M>) => void;
}) {
  const ctx = new CtxRoot(options);
  const ctx_config: any = {};

  return {
    init() {
      ctx.init(ctx_config);
      return ctx as MCtx<M>;
    },
    use() {
      return ctx as MCtx<M>;
    },
    setConfig(config: {
      [name in keyof M]?: Partial<InstanceType<M[name]>["config"]>;
    }) {
      Object.assign(ctx_config, config);
    },
  };
}
