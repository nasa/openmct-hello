import HelloPlugin from './HelloPlugin';

describe('HelloPlugin', function () {
  var openmct;
  var plugin;

  beforeEach(function () {
    openmct = jasmine.createSpyObj('openmct', ['on']);
    plugin = new HelloPlugin();
  });

  it('is a function', function () {
    expect(plugin).toEqual(jasmine.any(Function));
  });
});
