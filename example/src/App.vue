<template>
  <router-view />
</template>
<script lang="ts">
import { webCtx } from "@/modules-ctx/webCtx";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    webCtx.init();
  },
});
</script>
