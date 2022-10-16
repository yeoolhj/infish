import { LogModule } from ".";

export const logAction = LogModule.action({
  addLog(type: string) {
    this.state.dataLogs.push({ type, date: new Date().toString() });
  },
});
