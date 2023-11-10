<template>
    <div class="menu-content">
        <div class="action" @click="changeMenuVisible($event)">
            <arrow-right-svg v-if="opened" />
            <arrow-left-svg v-else />
        </div>

        <div class="friends">
            <div v-for="(friend, index) in friends" :key="index" :class="fiendClassName" @click="openChat($event, friend)">
                <div class="friend-image">
                    <img class="friend-src-img" :src="friend.img" />
                    <div class="friend-notification-img" v-if="!opened">{{  }}</div>
                </div>

                <div v-if="opened" class="friend-content">
                    <div class="name">{{ getFriendName(friend) }}</div>
                    <div class="info">
                        <div class="last-message">{{ getLastMessage(friend) }}</div>
                        <div class="notification">{{ 1 }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 
    <nav>
         <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </nav>
    -->
</template>

<script lang="ts" src="@/components/Menu/Menu"></script>
<style lang="scss" src="@/components/Menu/Menu.scss"></style>
