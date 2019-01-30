global.window=global;
global.assert=require('chai').assert;
require('../src/network.js');

describe('lol', () => {
    it('Debería ser un objeto', () => {
        window.assert.equal(typeof window.LOL, 'object');
      });


});
