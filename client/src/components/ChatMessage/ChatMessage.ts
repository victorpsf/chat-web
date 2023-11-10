import { Options, Vue } from 'vue-class-component';
import ChatMessageContent from '@/components/ChatMessageContent/ChatMessageContent.vue';

@Options({
  components: {
    ChatMessageContentComponent: ChatMessageContent
  },

  props: {
    message: {
      type: Object,
      required: false
    }
  },

  computed: {
    classNameMessage: function (): string {
      return `message ${this.message.type}` as string;
    },

    className: function (): string {
      return `internal ${this.message.type}` as string;
    },

    classNameContent: function (): string {
      return `content-${this.message.contentType}` as string;
    },

    getTimeOfMessage: function (): string {
      const messageDate = new Date(this.message.date);
      return messageDate.toLocaleTimeString()
    },

    isText: function(): boolean {
      return this.message.contentType === 'text';
    }
  }
})

export default class CharMessageComponent extends Vue {}