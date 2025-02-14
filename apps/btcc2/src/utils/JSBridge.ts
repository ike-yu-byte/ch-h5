// 1、网页向native发送消息
export const callAppMethod = (config: any) => {
    const callbackId = new Date().getTime();
    const obj = {
        method: config.method,
        params: config.params
    };
    if (config.hasOwnProperty('callback')) {
        const callback = `${config.method}_${callbackId}`;
        config.callback.bind(config);
        (window as any)[callback] = config.callback;
        (obj as any).callback = `window.${callback}`;
        console.log('window', (window as any)[callback])
    }
    try {
        (window?.Report as any)?.postMessage(JSON.stringify(obj));
    } catch (err) {
        console.log('err', err);
    }
}
