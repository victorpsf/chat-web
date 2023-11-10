<template>
  <div class="app">
    <div class="body" :style="bodyStyle">
      <router-view
        class="content-full"
        :chat="chat"
      />
    </div>

    <div class="menu" :style="menuStyle">
      <menu-component 
        :opened="menuOpened" 
        :friends="friends"
        v-on:changeMenuVisible="changeMenuOpened" 
        v-on:openChat="openChat" 
      />
    </div>
  </div>
</template>

<script lang="ts" src="@/views/App/App.ts"></script>
<style lang="scss" src="@/views/App/App.scss"></style>
