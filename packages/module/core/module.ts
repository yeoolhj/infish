import Emitter from "eventemitter3";

export interface AnyFun {
  (...args: any[]): any;
}
export type ObjType<T> = { [name: string]: T };
export interface ClassType<T> {
  new (...args: any): T;
}
export type UnionToIntersectionType<T, K extends string> = (
  T extends any
    ? (x: {
        [name in keyof Omit<T, K>]: T[name];
      }) => any
    : never
) extends (x: infer P) => any
  ? P
  : never;

type Config = { [name: string]: any };
type EventBaseItem = { on?: AnyFun; once?: AnyFun };
type EventItem = AnyFun | EventBaseItem;
type EventItemFun<T extends EventItem> = T extends EventBaseItem
  ? T extends { on: infer P; once?: any }
    ? P
    : T extends { once: infer P; on?: any }
    ? P
    : never
  : T;

type ModuleAction = ObjType<AnyFun>;
type ModuleEvent = ObjType<EventItem>;

export class ModuleRoot {
  static action = create<ModuleAction>();
  static event = create<ModuleEvent>();

  private bus = new Emitter();

  config?: Config;
  actions?: ModuleAction;
  events: ModuleEvent = {};

  constructor(config: Config) {
    this.config = config;
  }

  protected setConfig<T extends Config>(conf: T): T {
    return Object.assign(conf, this.config);
  }

  protected createAction<T extends ObjType<any>>(
    acts: T[]
  ): UnionToIntersectionType<T, never> {
    const actions: any = {};
    acts.forEach((act) => {
      Object.entries(act).map(([name, value]) => {
        actions[name] = value.bind(this);
      });
    });
    return actions;
  }

  protected createEvent<T extends ObjType<any>>(
    evts: T[]
  ): UnionToIntersectionType<T, never> {
    const events: any = {};
    evts.forEach((evt) => {
      Object.entries(evt).map(([name, value]) => {
        events[name] = value;
        if (value instanceof Function) {
          this.bus.on(name, value.bind(this));
        } else {
          Object.entries(value as ObjType<any>).map(([key, handle]) => {
            this.bus[key as "on" | "once"](name, handle.bind(this));
          });
        }
      });
    });
    return events;
  }

  on<K extends this["events"], T extends keyof K>(
    type: T,
    func: EventItemFun<K[T]>
  ) {
    this.bus.on(type as string, func);
  }

  once<K extends this["events"], T extends keyof K>(
    type: T,
    func: EventItemFun<K[T]>
  ) {
    this.bus.once(type as string, func);
  }

  emit<K extends this["events"], T extends keyof K>(
    type: T,
    ...args: Parameters<EventItemFun<K[T]>>
  ) {
    this.bus.emit(type as string, ...args);
  }

  // 在module创建后立即调用
  create() {}

  // 在上下文准备好后调用
  ready() {}

  // 在上下文销毁时调用
  destroy() {
    this.bus.removeAllListeners();
  }
}

function create<T>() {
  return function <K extends ClassType<any>, Actions extends T>(
    this: K,
    acts: Actions & ThisType<InstanceType<K>>
  ) {
    return acts;
  };
}