import {Vue, Options} from 'vue-class-component'
import MenuComponent from '@/components/Menu/Menu.vue'
import { IAppData, IFriend, ISendMessage, IUser } from './IApp'
import { Guid } from '@/util/rand'
import { IEmitInfo } from '@/plugin/EventEmitter'
import { IChatData } from '@/components/Chat/IChat'

@Options({
    components: { MenuComponent },

    mounted() {
        this.$socket.emit('profile', { name: Guid() }, (profile: IUser) => (this.user = profile))
        this.$socket.on('connected:user', (user: IUser) => {
            const friend = this.friends.find((a: IFriend) => a.id === user.id)

            if (friend) return;
            this.friends.push({
                ...user,
                messages: []
            })
        })
        this.$socket.on('disconnected:user', (user: IUser) => {
            const index = this.friends.findIndex((a: IFriend) => a.id === user.id)
            
            if (index < 0) return;
            this.friends.splice(index, 1);
        })
        this.$socket.on('r:message', this.receivedMessage);

        this.$event.on('send:message', (...args: any[]) => this.sendMessage.apply(this, args))
    },

    unmounted() {
        this.$event.off('send:message')
        this.$socket.off('connected:user')
        this.$socket.off('disconnected:user')
    },

    data: (): IAppData => ({
        menuOpened: false,
        friends: [ ],
        user: null,
        chat: null
    }),

    computed: {
        menuStyle: function (): { [key: string]: string } {
            return {
                width: this.menuOpened ? 'calc(30% - 10px)': '50px',
                padding: '5px'
            }
        },
        bodyStyle: function (): { [key: string]: string } {
            return {
                width: this.menuOpened ? 'calc(70% - 1px)': 'calc(100% - 61px)',
                'padding-right': '1px'
            };
        }
    },

    methods: {
        changeMenuOpened: function (event: MouseEvent): void {
            this.menuOpened = !this.menuOpened;
        },

        openChat: function(event: MouseEvent, friend: IFriend): void {
            this.chat = friend;
        },
        
        receivedMessage: function (message: ISendMessage): void {
            const friend = this.friends.find((a: IFriend) => a.id === message.from) as IFriend | null | undefined;

            if (friend) {
                friend.messages.push({
                    type: 'received',
                    value: message.text, 
                    date: message.date, 
                    contentType: message.contentType
                })
            }
        },

        sendMessage: function (register: IEmitInfo, data: ISendMessage): void {
            this.$socket.emit('s:message', { ...data, date: register.caller.toJSON(), contentType: 'text' }, () => {
                const friend = this.friends.find((a: IFriend) => a.id === data.from) as IFriend | undefined | null;

                if (friend) friend.messages.push({ 
                    value: data.text, 
                    date: register.caller.toJSON(), 
                    type: 'sended',
                    contentType: 'text' 
                })
            })
        }
    }
})

export default class AppView extends Vue { }