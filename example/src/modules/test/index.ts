import { ModuleRoot } from "@infish/module";
import { reactive } from "vue";
import { testAction } from "./actions";
import { testEvent } from "./events";

export class TestModule extends ModuleRoot {
  config = this.setConfig({
    originData: ["a", "b", "c"],
  });
  state = reactive({
    list: [] as string[],
  });
  actions = this.createAction([testAction]);
  events = this.createEvent([testEvent]);
  ready() {
    console.log("HomeModule is ready");
  }
}
