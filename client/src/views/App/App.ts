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
                    { date: 'now', text: 'Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá Olá ', type: 'sended' }
                ],
                img: 'https://avatars.githubusercontent.com/u/28913310?v=4'
            }
        ]
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
                width: this.menuOpened ? 'calc(70% - 10px)': 'calc(100% - 60px)',
                padding: '5px'
            };
        }
    },

    methods: {
        changeMenuOpened: function (event: MouseEvent): void {
            this.menuOpened = !this.menuOpened;
        },

        openChat: function(event: MouseEvent, friend: IFriend): void {
            console.log({ event, friend })
        }
    }
})

export default class AppView extends Vue { }