"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CtxRoot = void 0;
const eventemitter3_1 = require("eventemitter3");
class CtxRoot {
    constructor(options) {
        this.options = options;
        this.bus = new eventemitter3_1.EventEmitter();
    }
    init(config) {
        const { modules, events } = this.options;
        // 注册上下文模块
        for (const name in modules) {
            this[name] = new modules[name](config === null || config === void 0 ? void 0 : config[name]);
            this[name].create();
        }
        // 注册上下文事件
        events === null || events === void 0 ? void 0 : events.forEach((evt) => {
            evt(this);
        });
        this.ready();
    }
    ready() {
        var _a, _b;
        Object.keys(this.options.modules).forEach((name) => this[name].ready());
        (_b = (_a = this.options).ready) === null || _b === void 0 ? void 0 : _b.call(_a, this);
    }
    destroy() {
        Object.keys(this.options.modules).forEach((name) => this[name].destroy());
    }
}
exports.CtxRoot = CtxRoot;
