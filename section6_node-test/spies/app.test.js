const expect = require('expect'); // spies is nbuilt into expect
const rewire = require('rewire'); 

var app = rewire('./app'); // Rewire is modified version of require. So app is 'require'ed but with additional functions that make possible the swapping of functions inside app. Therefore rewire pretends to be require and thus when app.js requires db, the call actually goes to the dummy db

describe('App', () => {
    var db = { // make a db object that will call the spy saveUser. This db object is a dummy that replaces db.js actual function
        saveUser: expect.createSpy()
    };
    app.__set__('db', db); // __set__ is a function of rewire that swaps db.js with db object
    // So when handleSignup calls db.saveUser, if things are correct, this spy will fire up, which pretends as the actual db.saveUser. Thus in this way we can test whether db.saveUser fires up or not by making its dummy/spy and firing that up instad. We make a dummy because we do not want to implement the internal functions of the real db.saveUser

    it('should call the spy correctly', () => {
        var spy = expect.createSpy(); // Creating a spy. createSpy returns a function which will be swapped out with the real one. Therefore we save that in a variable. Now we can inject spy into our code
        // spy(); // If we uncomment expect(spy).toHaveBeenCalled(); but comment spy(); then the test throws error as spy() never called
        // expect(spy).toHaveBeenCalled(); // toHaveBeenCalled is a spy function of expect which asserts for the spy to be called
        spy('Andrew', 25); // To test whether a spy is called with certain args or not
        expect(spy).toHaveBeenCalledWith('Andrew', 25); 
    });

    it('should call saveUser with user object', () => {
        var email = 'dummyemail@gmail.com';
        var password = 'dummy123';

        app.handleSignup(email, password);
        expect(db.saveUser).toHaveBeenCalledWith({email, password});
    });
});