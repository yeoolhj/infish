import { TestModule } from ".";

export const testEvent = TestModule.event({
  onDataInited: {
    once() {
      console.log("init data", this.state.list);
    },
  },
  onDataAdded(data: string) {
    console.log("add data:", data);
  },
  onDataUpdated(index: number, data: string) {
    console.log("update data", index, data);
  },
});
