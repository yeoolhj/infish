import { ICtx } from "infish";

export const testEvt = (ctx: ICtx) => {
  const { test, log } = ctx;
  test?.on("onDataUpdated", (index) => {
    log?.actions.addLog("home.data:update:" + index);
  });
  test?.on("onDataAdded", () => {
    log?.actions.addLog("home.data:add");
  });
};
