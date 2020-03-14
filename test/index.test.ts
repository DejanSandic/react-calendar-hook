const add = require('../src/index').add;

describe('main test', () => {
   it('should not brake', () => {
      expect(add(3, 2)).toBe(5);
   });
});
