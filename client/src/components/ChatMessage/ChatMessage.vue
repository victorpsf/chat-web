<template>
    <div :class="classNameMessage">
        <div :class="className" >
            <div :class="classNameContent">
                <div class="content-message">
                    <chat-message-content-component 
                        :message="message" 
                    />
                </div>

                <div class="info">
                    {{ getTimeOfMessage }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="@/components/ChatMessage/ChatMessage"></script>
<style lang="ts" src="@/components/ChatMessage/ChatMessage.scss"></style>