import eventBus from './event';

function openPopup({
  url,
  title,
  w = 1000,
  h = 700,
  eventName,
  newWin
}: {
  url: string;
  title: string;
  w?: number;
  h?: number;
  eventName: string;
  newWin: any;
}) {
  document.onmousedown = focusPopup;
  document.onkeyup = focusPopup;
  document.onmousemove = focusPopup;

  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;
  newWin = window.open(
    url,
    title,
    `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
  );

  eventBus.emit(eventName, {
    newWin
  });
}

function focusPopup() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // if (newWin && !newWin.closed) {
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   newWin.focus();
  // }
}

export default openPopup;
