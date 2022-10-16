import { test, log } from "@/modules";
import { createCtx } from "infish";
import { testEvt } from "./events/testEvt";

export const webCtx = createCtx({
  modules: { test, log },
  events: [testEvt],
  ready(ctx) {
    ctx.test.actions.initData();
  },
});

webCtx.setConfig({
  test: {
    originData: ["123", "456", "789"],
  },
});
