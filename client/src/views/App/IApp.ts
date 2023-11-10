export type IMessageType = 'sended' | 'received';
export type IContentType = 'text' | 'img' | 'video' | 'document';
export type IStatus = 'on' | 'off';

export interface IMessage {
    type: IMessageType;
    date: string;
    value: string;
    contentType: IContentType;
}

export interface IFriend {
    id: string;
    name: string;
    messages: IMessage[];
    img: string;
    status: IStatus;
}

export interface IAppData {
    menuOpened: boolean;

    friends: IFriend[];
    chat?: IFriend | null;
}