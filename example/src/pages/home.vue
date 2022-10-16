<template>
  <div>
    <h2>welcome to use infish</h2>
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
