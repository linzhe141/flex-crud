<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="h-screen flex-col flex">
    <div class="h-15 bg-emerald-300 flex items-center px-5 justify-between">
      <div class="">flex crud</div>
      <div>1</div>
    </div>
    <div class="h-0 flex-1 flex">
      <div class="flex flex-col left-menu-wrapper w-[200px] bg-amber-100">
        <div class="flex-1 h-0 overflow-auto">
          <div>
            <RouterLink to="/foo">to foo</RouterLink>
          </div>
        </div>
        <div class="h-5"></div>
      </div>
      <div class="content-wrapper flex-1 p-4 overflow-auto">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>
