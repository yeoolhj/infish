import { ModuleRoot } from "infish";
import { reactive } from "vue";
import { logAction } from "./actions";

export class LogModule extends ModuleRoot {
  state = reactive({
    dataLogs: [] as { type: string; date: string }[],
  });
  actions = this.createAction([logAction]);
}
