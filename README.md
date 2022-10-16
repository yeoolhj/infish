# @infish/module 

前端模块化开发框架

## 特征
+ 模块基于class创建，默认提供action方法、event事件，支持自定义扩展。
+ 对Model-View-ViewModel模式中的Model层进行封装，可配合视图框架使用（如vue、react）
+ 基于typescript开发，提供大量的语法检查和推断 
  

## 安装

```
npm install @infish/module
```

## 使用

创建模块
```ts
// modules/test/index.ts
import { ModuleRoot } from "@infish/module";
import { reactive } from "vue";
import { testAction } from "./actions";
import { testEvent } from "./events";

export class TestModule extends ModuleRoot {
  config = this.setConfig({
    originData: ["a", "b", "c"],
  });
  state = reactive({
    list: [] as string[],
  });
  actions = this.createAction([testAction]);
  events = this.createEvent([testEvent]);

  ready() {
    console.log("HomeModule is ready");
  }
}

// modules/test/actions.ts
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

// modules/test/events.ts
import { TestModule } from ".";

export const testEvent = TestModule.event({
  onDataInited: {
    once() {
      console.log("init data", this.state.list);
    },
  },
  onDataAdded(data: string) {
    console.log("add data:", data);
  },
  onDataUpdated(index: number, data: string) {
    console.log("update data", index, data);
  },
});

```

+ `setConfig(object)`: 设置模块默认配置信息
+ `createAction(object[])`: 设置模块的action方法，通过ModuleRoot.action()创建
+ `createEvent(object[])`: 设置模块的event事件，通过ModuleRoot.event()创建
+ `state`: 自定义扩展数据状态，这里使用了vue的reactive进行定义

创建上下文
```ts
// modules/index.ts
export { TestModule as test } from "./test";
export { LogModule as log } from "./log";

// modules-ctx/webCtx.ts
import { test, log } from "@/modules/test";
import { createCtx } from "@infish/module";
import { testEvt } from "./events/testEvt";

export const webCtx = createCtx({
  modules: { test, log },
  events: [testEvt],
  ready(ctx) {
    ctx.test.actions.initData();
  },
});

webCtx.setConfig({
  test: {
    originData: ["123", "456", "789"],
  },
});

// modules-ctx/events/testEvt.ts
import { MCtx } from "@infish/module";
import * as modules from "@/modules";
type ICtx = Partial<MCtx<typeof modules>>;

export const testEvt = (ctx: ICtx) => {
  const { test, log } = ctx;
  test?.on("onDataUpdated", (index) => {
    log?.actions.addLog("home.data:update:" + index);
  });
  test?.on("onDataAdded", () => {
    log?.actions.addLog("home.data:add");
  });
};
```

+ `createCtx({modules, events, ready})`: 创建上下文；
  - modules: 注册上下文中包含的模块；
  - events: 注册上下文中的事件；
  - ready: 上下文准备好后的回调事件；
+ `setConfig(config)`: 设置模块的config配置，权重高于moduleRoot的默认配置；

页面中使用

```html
// App.vue
<template>
  <router-view />
</template>
<script lang="ts">
import { webCtx } from "@/modules-ctx/webCtx";
import { defineComponent, onUnmounted } from "vue";

export default defineComponent({
  setup() {
    const ctx = webCtx.init();
    onUnmounted(() => {
        ctx.destory();
    })
  },
});
</script>

// pages/home.vue
<template>
  <div>
    <h2>welcome to use @infish/module</h2>
    <div>
      <h4>home.list</h4>
      <div v-for="(item, i) in test.state.list" :key="i">{{ item }}</div>
    </div>
    <button @click="test.actions.initData">初始化</button>
    <button @click="changeLastItem">更新最后一项</button>
    <button @click="test.actions.addData">添加</button>
    <div>
      <h4>log.dataLogs</h4>
      <div v-for="(item, i) in log.state.dataLogs" :key="i">
        <span>{{ item.type }}</span>
        <span style="margin-left: 20px">{{ item.date }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { webCtx } from "@/modules-ctx/webCtx";
const { test, log } = webCtx.use();

function changeLastItem() {
  const lastIndex = test.state.list.length - 1;
  const value = Math.random().toString();
  test.actions.updateData(lastIndex, value);
}
</script>
```
+ `init()`: 在入口页面初始化上下文
+ `use()`: 获取上下文
+ `ctx.destroy`: 销毁上下文
