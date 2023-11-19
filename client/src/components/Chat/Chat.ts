import { IMessage } from '@/views/App/IApp';
import { Options, Vue } from 'vue-class-component';

import ChatMessage from '@/components/ChatMessage/ChatMessage.vue'
import OptionSvgComponent from '@/components/svg/Options.vue'
import { IChatData } from './IChat';

@Options({
  components: {
    ChatMessageComponent: ChatMessage,
    OptionSvgComponent: OptionSvgComponent
  },

  props: {
    chat: {
      type: Object,
      required: false
    },
    user: {
      type: Object,
      required: false
    }
  },

  data: (): IChatData => ({
    optionVisible: false,
    text: ''
  }),

  computed: {
    getFriendName: function (): string {
      return this.chat.name as string;
    },

    getFriendImage: function (): string {
      return this.chat.img as string;
    },

    getMessages: function (): IMessage[] {
      return this.chat.messages as IMessage[];
    },

    online: function (): boolean {
      return (this.chat.status == 'on') as boolean;
    }
  },

  methods: {
    showOptions: function (event: MouseEvent) : void {
      this.optionVisible = !this.optionVisible;
    },

    sendMessage: function (event: MouseEvent): void {
      this.$event.emit('send:message', {
        from: this.chat.id,
        text: this.text
      })
      this.text = '';
    }
  }
})
export default class ChatView extends Vue {}