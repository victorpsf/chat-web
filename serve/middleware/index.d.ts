import { IncomingMessage, ServerResponse } from 'http'

interface Middleware {
    post:        (path: string, callback: (req: IncomingMessage, res: ServerResponse) => void) => Middleware;
    get:         (path: string, callback: (req: IncomingMessage, res: ServerResponse) => void) => Middleware;
    put:         (path: string, callback: (req: IncomingMessage, res: ServerResponse) => void) => Middleware;
    delete:      (path: string, callback: (req: IncomingMessage, res: ServerResponse) => void) => Middleware;
    use:         (callback: (req: IncomingMessage, res: ServerResponse) => void) => Middleware;
    static:      (path: string, directory: string) => Middleware;
    handleError: (error: any, req: IncomingMessage, res: ServerResponse) => Middleware;
    setDownloadSize: (size: string) => Middleware;
}

declare function constructor (): Middleware;

export = constructor;