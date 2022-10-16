import { TestModule } from ".";

export const testAction = TestModule.action({
  initData() {
    this.state.list = [...this.config.originData];
    this.emit("onDataInited");
  },
  addData() {
    const value = Date.now().toString();
    this.state.list.push(value);
    this.emit("onDataAdded", value);
  },
  updateData(index: number, data: string) {
    this.state.list[index] = data;
    this.emit("onDataUpdated", index, data);
  },
});
