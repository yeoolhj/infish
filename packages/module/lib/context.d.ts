import { ObjType } from "./module";
export declare class CtxRoot {
    private options;
    bus: import("eventemitter3")<string | symbol, any>;
    [name: string]: any;
    constructor(options: any);
    init(config: ObjType<any>): void;
    ready(): void;
    destroy(): void;
}
