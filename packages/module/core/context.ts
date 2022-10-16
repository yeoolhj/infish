import { EventEmitter } from "eventemitter3";
import { ObjType } from "./module";

export class CtxRoot {
  bus = new EventEmitter();
  [name: string]: any;
  constructor(private options: any) {}
  init(config: ObjType<any>) {
    const { modules, events } = this.options;
    // 注册上下文模块
    for (const name in modules) {
      this[name] = new modules[name](config?.[name]);
      this[name].create();
    }
    // 注册上下文事件
    events?.forEach((evt: any) => {
      evt(this);
    });

    this.ready();
  }
  ready() {
    Object.keys(this.options.modules).forEach((name) => this[name].ready());
    this.options.ready?.(this);
  }
  destroy() {
    Object.keys(this.options.modules).forEach((name) => this[name].destroy());
  }
}
