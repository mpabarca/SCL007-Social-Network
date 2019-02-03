global.window=global;
global.assert=require('chai').assert;
require('../src/network.js');

describe('validateEmail', () => {
    it('Debería ser una función', () => {
        assert.equal(typeof validateEmail, 'function');
      });
    it('Si ingreso name@gmail.com debería retornar true'), () => {
        assert.equal(validateEmail("name@gmail.com"),true);
    },
    it('Si ingreso name.com debería retornar false'), ()=> {
        assert.equeal(validateEmail("name.com"),false);
    }

});

describe('validatePassword', () => {
    it('Debería ser una función', () => {
        assert.equal(typeof validatePassword, 'function');
      });
    it('Si ingreso 123456 debería retornar true'), () => {
        assert.equal(validatePassword("123456"),true);
    },
    it('Si ingreso 123 debería retornar false'), ()=> {
        assert.equeal(validatePassword("123"),false);
    }


});

describe('createUser', () => {
    it('Debería ser una función', () => {
        assert.equal(typeof createUser, 'function');
      });
    it('Si ingreso name@gmail.com y 123456 debería retornar true'), () => {
        assert.equal(createUser("name@gmail.com","123456"),true);
    },
    it('Si ingreso name@gmail.com y 123 debería retornar false'), ()=> {
        assert.equeal(createUser("name@gmail.com","123"),false);
    },
    it('Si ingreso gmail.com y 123456 debería retornar false'), ()=> {
        assert.equeal(ccreateUser("gmail.com","123456"),false);
    },
    it('Si ingreso gmail.com y 123 debería retornar false'), ()=> {
        assert.equeal(createUser("gmail.com","123"),false);
    }

});

describe('verifyUser', () => {
    it('Debería ser una función', () => {
        assert.equal(typeof verifyUser, 'function');
      });
    it('Si ingreso name@gmail.com y 123456 debería retornar true'), () => {
        assert.equal(verifyUser("name@gmail.com","123456"),true);
    },
    it('Si ingreso name@gmail.com y 123 debería retornar false'), ()=> {
        assert.equeal(verifyUser("name@gmail.com","123"),false);
    },
    it('Si ingreso gmail.com y 123456 debería retornar false'), ()=> {
        assert.equeal(cverifyUser("gmail.com","123456"),false);
    },
    it('Si ingreso gmail.com y 123 debería retornar false'), ()=> {
        assert.equeal(verifyUser("gmail.com","123"),false);
    }


});