"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCtx = void 0;
const context_1 = require("./context");
function createCtx(options) {
    const ctx = new context_1.CtxRoot(options);
    const ctx_config = {};
    return {
        init() {
            ctx.init(ctx_config);
            return ctx;
        },
        use() {
            return ctx;
        },
        setConfig(config) {
            Object.assign(ctx_config, config);
        },
    };
}
exports.createCtx = createCtx;
