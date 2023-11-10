<template>
    <div class="content-full flex flex-column">
        <div class="chat-header">
            <div class="chat-header-img">
                <img :src="getFriendImage" />
            </div>
            <div class="chat-header-name">
                {{ getFriendName }}
            </div>
        </div>

        <div class="chat-messages">
            <div class="list-messages">
                {{ chat }}
            </div>

            <div class="message-input">
                <div class="message-sender">

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="@/components/Chat/Chat"></script>
<style lang="scss" src="@/components/Chat/Chat.scss"></style>
