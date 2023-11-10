import { Vue, Options } from 'vue-class-component'
import ArrowLeft from '@/components/svg/ArrowLeft.vue'
import ArrowRight from '@/components/svg/ArrowRight.vue'
import { IFriend } from '@/views/App/IApp';

@Options({
    props: {
        opened: {
            type: Boolean,
            required: true
        },
        friends: {
            type: Array,
            required: true
        }
    },

    components: {
        ArrowLeftSvg: ArrowLeft,
        ArrowRightSvg: ArrowRight
    },

    computed: {
        fiendClassName: function (): string {
            return this.opened ? 'friend opened': 'friend'
        }
    },

    methods: {
        changeMenuVisible: function (event: MouseEvent): void {
            this.$emit('changeMenuVisible', event);
        },

        openChat: function (event: MouseEvent, friend: IFriend): void {
            this.$emit('openChat', event, friend);
        },

        getFriendName: function (friend: IFriend): string {
            return friend.name.length > 20 ? friend.name.substring(0, 20) + ' ...': friend.name;
        },

        getLastMessage: function (friend: IFriend): string {
            const messages = friend.messages;
            let message: string = '';

            if (messages.length > 0)
                message = messages[messages.length - 1].value;

            return message.length > 50 ? message.substring(0, 40) + '...': message;
        }
    }
})

export default class MenuComponent extends Vue { }
