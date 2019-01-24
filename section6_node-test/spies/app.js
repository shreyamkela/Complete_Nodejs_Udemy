// application file - for testing 
// const db = require('./db') // this is commented out as we never actually call the real db when testing. We call a dummy db which has been defined in app.test.js

module.exports.handleSignup = (email, password) => { // A dummy function that handles signup queries. It can be used to write a new user detail into the database and send a welcome message, and can also be used to check whether a particular email id is already present in the database  
    // There can be many functions inside the handleSignup function. Like a function called saveUser that saves new user data. There could be function which prints a welcom message. There could be a function which fetches old user data.
    // Thus there could be a large number of functions inside handltSignup. Now if we want to test handleSignup for any errors, we'd have to manually write code to check each of the internal functions as well.
    // To save from this, we use spies
    // Spies replace the functionality inside functions for testing. So to test a particular function, we do not actually test it's inside but let the spies run as the internal functions. So if we want to test handleSignup, then the saveUser can be made a spy. When handleSignup is tested, if the spy saveUser runs then the actual saveUser is thought of as running, and therefore we dont have to test the actual internal code of saveUser, rather a spy of it. Basically spy swaps out the real functionality of a function with a dummy functionality so that the outer function can be tested for errors and we dont have to think about testing each internal function/dependency. 
    // Thus spy should just indicate to handleSignup that saveUser was indeed calledcorrectly without actually implementing any of the stuff inside saveUser, i.e without saving any data into the database, we tet whether it will work or not. Similarly, we can spy all other fnctions inside handleSignup. The only thing important is that saveUser is called with the correct arguments
    // This is done by using rewire which swaps out real variable with our test variables. This will call db.saveUser spy instead of db.saveUser actual
    //Basically, we will make a simulation of saveUser by rewiring it to another saveUser and running it when testing

    db.saveUser({email, password}); // es6 reduced version of:
    // db.saveUser({
    //     email: email,
    //     password: password
    // }); 

}; 