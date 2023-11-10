
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    message: {
      type: Object,
      required: true
    }
  },

  computed: {
    isText: function(): boolean {
      return this.message.contentType === 'text';
    },

    text: function(): string {
        return (this.message.value ?? '') as string;
    }
  }
})

export default class CharMessageContentComponent extends Vue {}