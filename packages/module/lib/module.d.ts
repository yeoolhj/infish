export interface AnyFun {
    (...args: any[]): any;
}
export declare type ObjType<T> = {
    [name: string]: T;
};
export interface ClassType<T> {
    new (...args: any): T;
}
export declare type UnionToIntersectionType<T, K extends string> = (T extends any ? (x: {
    [name in keyof Omit<T, K>]: T[name];
}) => any : never) extends (x: infer P) => any ? P : never;
declare type Config = {
    [name: string]: any;
};
declare type EventBaseItem = {
    on?: AnyFun;
    once?: AnyFun;
};
declare type EventItem = AnyFun | EventBaseItem;
declare type EventItemFun<T extends EventItem> = T extends EventBaseItem ? T extends {
    on: infer P;
    once?: any;
} ? P : T extends {
    once: infer P;
    on?: any;
} ? P : never : T;
declare type ModuleAction = ObjType<AnyFun>;
declare type ModuleEvent = ObjType<EventItem>;
export declare class ModuleRoot {
    static action: <K extends ClassType<any>, Actions extends ModuleAction>(this: K, acts: Actions & ThisType<InstanceType<K>>) => Actions & ThisType<InstanceType<K>>;
    static event: <K extends ClassType<any>, Actions extends ModuleEvent>(this: K, acts: Actions & ThisType<InstanceType<K>>) => Actions & ThisType<InstanceType<K>>;
    private bus;
    config?: Config;
    actions?: ModuleAction;
    events: ModuleEvent;
    constructor(config: Config);
    protected setConfig<T extends Config>(conf: T): T;
    protected createAction<T extends ObjType<any>>(acts: T[]): UnionToIntersectionType<T, never>;
    protected createEvent<T extends ObjType<any>>(evts: T[]): UnionToIntersectionType<T, never>;
    on<K extends this["events"], T extends keyof K>(type: T, func: EventItemFun<K[T]>): void;
    once<K extends this["events"], T extends keyof K>(type: T, func: EventItemFun<K[T]>): void;
    emit<K extends this["events"], T extends keyof K>(type: T, ...args: Parameters<EventItemFun<K[T]>>): void;
    create(): void;
    ready(): void;
    destroy(): void;
}
export {};
