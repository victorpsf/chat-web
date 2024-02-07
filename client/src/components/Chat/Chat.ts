import { IMessage } from '@/views/App/IApp';
import { Options, Vue } from 'vue-class-component';

import ChatMessage from '@/components/ChatMessage/ChatMessage.vue'
import OptionSvgComponent from '@/components/svg/Options.vue'
import PhoneSvgComponent from '@/components/svg/Phone.vue'
import VideoSvgComponent from '@/components/svg/Video.vue'
import { IChatData } from './IChat';
import { getDevices, hasVideo } from '@/util/stream';

@Options({
  components: {
    ChatMessageComponent: ChatMessage,
    OptionSvgComponent: OptionSvgComponent,
    PhoneSvgComponent: PhoneSvgComponent,
    VideoSvgComponent: VideoSvgComponent
  },

  async mounted(): Promise<void> {
    this.hasVideo = await hasVideo();
    console.log(this.hasVideo)
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
    hasVideo: false,
    text: ''
  }),

  computed: {
    getFriendName: function (): string {
      return this.chat.name as string;
    },

    getOptionClass: function (): string {
      return this.hasVideo ? 'chat-header-option video': 'chat-header-option'
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
    },

    optionCLick: async function (event: MouseEvent, type: 'phone' | 'video') {
      this.showOptions(event);
      console.log()
    }
  }
})
export default class ChatView extends Vue {}