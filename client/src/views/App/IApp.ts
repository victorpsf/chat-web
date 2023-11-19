export type IMessageType = 'sended' | 'received';
export type IContentType = 'text' | 'img' | 'video' | 'document';
export type IStatus = 'on' | 'off';

export interface IMessage {
    type: IMessageType;
    date: string;
    value: string;
    contentType: IContentType;
}

export interface ISendMessage extends IMessage {
    from: string;
    text: string;
}

export interface IUser {
    id: string;
    name: string;
    messages: IMessage[];
    img: string;
}

export interface IFriend extends IUser {
    messages: IMessage[];
    status: IStatus;
}

export interface IAppData {
    menuOpened: boolean;

    user: IUser | null;
    friends: IFriend[];
    chat: IFriend | null;
}