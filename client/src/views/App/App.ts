import {Vue, Options} from 'vue-class-component'
import MenuComponent from '@/components/Menu/Menu.vue'
import { IAppData, IFriend } from './IApp'

@Options({
    components: { MenuComponent },

    data: (): IAppData => ({
        menuOpened: false,
        friends: [
            {
                id: '1',
                name: 'João Victor Palmeira da Silva Ferreira',
                messages: [
                    { 
                        date: '2023-11-10T22:51:55.277Z', 
                        value: 'Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá ', 
                        type: 'sended',
                        contentType: 'text'
                    },
                    { 
                        date: '2023-11-10T22:51:58.277Z', 
                        value: 'Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá ', 
                        type: 'received',
                        contentType: 'text'
                    }
                ],
                status: 'on',
                img: 'https://avatars.githubusercontent.com/u/28913310?v=4'
            }
        ],
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
        }
    }
})

export default class AppView extends Vue { }