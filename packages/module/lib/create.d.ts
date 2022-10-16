import { ClassType, ObjType } from "./module";
export declare type MCtx<M extends ObjType<ClassType<any>>> = {
    [name in keyof M]: InstanceType<M[name]>;
};
export declare function createCtx<M extends {
    [name: string]: any;
}>(options: {
    modules: M;
    events?: Array<(ctx: MCtx<any>) => void>;
    ready?: (ctx: MCtx<M>) => void;
}): {
    init(): MCtx<M>;
    use(): MCtx<M>;
    setConfig(config: { [name in keyof M]?: Partial<InstanceType<M[name]>["config"]> | undefined; }): void;
};
