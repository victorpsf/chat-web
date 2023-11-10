import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    chat: {
      type: Object,
      required: false
    }
  },

  computed: {
    getFriendName: function (): string {
      return this.chat.name as string;
    },

    getFriendImage: function (): string {
      return this.chat.img as string;
    },
  }
})
export default class HomeView extends Vue {}