export function resizeFrame() {
    setTimeout(function() {
        let currentSize = BX24.getScrollSize();
        let minHeight = currentSize.scrollHeight;
        let frameWidth = document.querySelector('#app').offsetWidth;
        BX24.resizeWindow(frameWidth, minHeight);
    }, 10);
}