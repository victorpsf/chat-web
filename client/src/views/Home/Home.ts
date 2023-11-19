import { Options, Vue } from 'vue-class-component';
import Chat from '@/components/Chat/Chat.vue';

@Options({
  components: {
    ChatComponent: Chat
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
  }
})
export default class HomeView extends Vue {}