export default function HelloPlugin () {
  return function install (openmct) {
    openmct.on('start', function () {
      window.alert('Hello, world!');
    });
  }
}
