export default function delay(ms) {
  return new Promise(resolve => {
    global.setTimeout(() => {
      resolve();
    }, ms);
  });
}
