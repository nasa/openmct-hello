export default function HelloPlugin (options) {
  var message = (options && options.hello) || 'Hello, world!';
  return function (openmct) {
    openmct.on('start', function () {
      window.alert(message);
    });
  }
}
