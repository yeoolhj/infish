"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleRoot = void 0;
const eventemitter3_1 = __importDefault(require("eventemitter3"));
class ModuleRoot {
    constructor(config) {
        this.bus = new eventemitter3_1.default();
        this.events = {};
        this.config = config;
    }
    setConfig(conf) {
        return Object.assign(conf, this.config);
    }
    createAction(acts) {
        const actions = {};
        acts.forEach((act) => {
            Object.entries(act).map(([name, value]) => {
                actions[name] = value.bind(this);
            });
        });
        return actions;
    }
    createEvent(evts) {
        const events = {};
        evts.forEach((evt) => {
            Object.entries(evt).map(([name, value]) => {
                events[name] = value;
                if (value instanceof Function) {
                    this.bus.on(name, value.bind(this));
                }
                else {
                    Object.entries(value).map(([key, handle]) => {
                        this.bus[key](name, handle.bind(this));
                    });
                }
            });
        });
        return events;
    }
    on(type, func) {
        this.bus.on(type, func);
    }
    once(type, func) {
        this.bus.once(type, func);
    }
    emit(type, ...args) {
        this.bus.emit(type, ...args);
    }
    // 在module创建后立即调用
    create() { }
    // 在上下文准备好后调用
    ready() { }
    // 在上下文销毁时调用
    destroy() {
        this.bus.removeAllListeners();
    }
}
exports.ModuleRoot = ModuleRoot;
ModuleRoot.action = create();
ModuleRoot.event = create();
function create() {
    return function (acts) {
        return acts;
    };
}
