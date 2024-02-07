export const getDevices = (): Promise<MediaDeviceInfo[]> => window.navigator.mediaDevices.enumerateDevices();
export const hasVideo = async (): Promise<boolean> => {
    const devices = await getDevices();
    return devices.filter(a => a.kind === 'videoinput').length > 0;
}
export const screenStream = (): Promise<MediaStream> => window.navigator.mediaDevices.getDisplayMedia();
export const audioStream = (): Promise<MediaStream> => window.navigator.mediaDevices.getUserMedia({ audio: true });
export const videoStream = (): Promise<MediaStream> => window.navigator.mediaDevices.getUserMedia({ 
    audio: true, 
    video: true 
});