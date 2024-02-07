<template>
    <div class="content-full flex flex-column">
        <div class="chat-header">
            <div class="chat-header-img">
                <img :src="getFriendImage" />
            </div>
            <div class="chat-header-name flex flex-column justify-center align-center">
                <div>{{ getFriendName }}</div>
                <div v-if="online">{{ 'Online' }}</div>
            </div>

            <div class="chat-header-options flex item-center justify-center">
                <option-svg-component @click="showOptions($event)" />
            </div>

            <div v-if="optionVisible" :class="getOptionClass">
                <div><phone-svg-component @click="optionCLick($event, 'phone')" /></div>
                <div v-if="hasVideo"><video-svg-component @click="optionCLick($event, 'video')" /></div>
            </div>
        </div>

        <div class="chat-messages">
            <div class="list-messages flex flex-column justify-end">
                <chat-message-component 
                    v-for="(message, index) in getMessages" 
                    :key="index" 
                    :message="message"
                />
            </div>

            <div class="message-input">
                <div class="message-sender">
                    <input type="text" v-model="text">

                    <div class="sender" @click="sendMessage($event)">
                        <img src="http://localhost:3000/img/sender.svg" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="@/components/Chat/Chat"></script>
<style lang="scss" src="@/components/Chat/Chat.scss"></style>
