export type IMessageType = 'sended' | 'received';

export interface IMessage {
    type: IMessageType;
    date: string;
    text: string;
}

export interface IFriend {
    id: string;
    name: string;
    messages: IMessage[];
    img: string;
}

export interface IAppData {
    menuOpened: boolean;

    friends: IFriend[];
    chat?: IFriend | null;
}