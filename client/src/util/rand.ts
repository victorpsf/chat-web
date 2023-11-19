export const RandomNumber = function (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const Guid = function (): string {
    const parts = [
        [0,0,0,0].map(a => RandomNumber(0,255)).map(a => `000${a.toString(16)}`.slice(-2)),
        [0,0].map(a => RandomNumber(0,255)).map(a => `000${a.toString(16)}`.slice(-2)),
        [0,0].map(a => RandomNumber(0,255)).map(a => `000${a.toString(16)}`.slice(-2)),
        [0,0].map(a => RandomNumber(0,255)).map(a => `000${a.toString(16)}`.slice(-2)),
        [0,0,0,0,0,0].map(a => RandomNumber(0,255)).map(a => `000${a.toString(16)}`.slice(-2)),
    ];

    return parts.map(a => a.join('')).join('-');
}