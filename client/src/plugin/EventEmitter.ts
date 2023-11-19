import { App } from 'vue';
import { IsNullOrUndefined } from '../util/Util'
import { Guid } from '../util/rand'

export type IListenCallback = (...args: any[]) => Promise<void>;
export type IRegisterCallback = (arg: { listener: string, guid: string }) => Promise<void>;
export type IListenMode = 'on' | 'once';

export interface IEmitInfo {
    guid: string;
    caller: Date;
}
export interface IListeners {
    on: { [key: string]: { [key: string]: IListenCallback }; };
    once: { [key: string]: { [key: string]: IListenCallback }; };
}

const listeners: IListeners = {
    on: { },
    once: { }
}

const getGuid = function (listener: string, mode: 'on' | 'once'): string  {
    let guids = [];
    let guid = '';

    do {
        guid = Guid();
        if (IsNullOrUndefined(listeners[mode][listener])) break;
        guids = Object.keys(listeners[mode][listener]);
    }

    while (guids.filter(a => a == guid).length > 0);

    return guid;
}

const getAllEvents = function (mode: IListenMode, listener: string) {
    if (!listeners[mode][listener]) return []

    return Object.keys(listeners[mode][listener])
        .map(a => {
            return {
                guid: a,
                callback: listeners[mode][listener][a]
            }
        });
}

const setEvent = function (mode: IListenMode, listener: string, callback: IListenCallback) {
    const guid = getGuid(listener, mode);
    if (IsNullOrUndefined(listeners[mode][listener]))
        listeners[mode][listener] = {};
    listeners[mode][listener][guid] = callback;
    return guid;
}

const unsetEvent = function (mode: IListenMode, listener: string) {
    if (listeners[mode][listener]) delete listeners[mode][listener];
}

const on = function (listener: string, callback: IListenCallback, register: IRegisterCallback) {
    const guid = setEvent('on', listener, callback)
    if (typeof register === 'function')
        register({ listener, guid })
}

const once = function (listener: string, callback: IListenCallback) {
    setEvent('once', listener, callback)
}

const off = function (listener: string) {
    unsetEvent('on', listener)
    unsetEvent('once', listener)
}

const emit = function (...args: any[]): void {
    const listener = args[0] as string;
    const events = getAllEvents('on', listener)
        .concat(
            getAllEvents('once', listener)
        );

    for (const { guid, callback } of events)
        try {
            callback.apply(null, [{ guid, caller: new Date() }].concat(args.splice(1)))
        }

        catch (error) 
        { console.error(error) }

    unsetEvent('once', listener)
}

class EventEmitter {
    constructor() {}

    on(listener: string, callback: IListenCallback, register: IRegisterCallback) { on(listener, callback, register) }
    once(listener = '', callback: IListenCallback) { once(listener, callback) }
    off (listener: string) { off(listener) }
    emit(listener: string, ...args: any[]) { emit.apply(null, [listener].concat(args)) }
}

export default {
    install: function (app: App) {
        app.config.globalProperties.$event = new EventEmitter();
    }
}