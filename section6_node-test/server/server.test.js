const request = require('supertest');
const expect = require('expect');

var app = require('./server').app; // Accessing the app property of server.js

it('should return hello world/ page not found response', (done) => { // Mocha library. done used therefore Async function. We use mocha for testing and inside it use supertest to fill in the gaps. Note that expect function is present in supertest itself but it only has equals function but if we want even more functions such as checking if the res has a particular key value pair or not by toInclude, then we can use the functions that are in the expect library itself, for this we require expect library as well and use it inside supertest
    request(app) // Supertest library
        .get('/') // We check whether the get call on '/' results in the expected output or not
        .expect(404) // make an assertion about the status code 
    //  .expect('Hello world!') // make an assertion about the output string
    //  .expect({
    //      error: 'Page not found'
    //  }) 
        .expect((res) => {
            expect(res.body).toInclude({ // res is reponse object therefore its body has the actual contents. This inner expect is from expect library. Thus we use combination of supertest and expect inside mocha for a simple and smart test suite to test our http endpoints
                error: 'Page not found'
            });
        }) 
        .end(done);
});


it('should check whether name is present and return my user object', (done) => { 
    
    request(app) 
        .get('/users') 
        .expect(200) 
        .expect((res) => { // users from server.js is sent as res
            expect(res.body) // When expect(res.body) is used, then test will only be passed if inside .toInclude the object passed is the whole object present at particular index inside the users/res.body array i.e it cannot be just .toInclude({name: 'Clark Kent'}); it has to be .toInclude({name: 'Clark Kent', age: '40', location: 'Metropolis'});. To check for a single key inside a particular index, we have to specify that particular index
            .toInclude({
                name: 'Clark Kent',
                age: '40',
                location: 'Metropolis'
            });
        //  expect(res.body[2]) // To check for a single key value inside the body. But here we specify body[2] specifically. How to check all internal key-value pairs automatically without specifying the index in res.body? Something like res.body[*]?
        //  .toInclude({
        //      name: 'Clark Kent',
        //  });
        }) 
        .end(done);
});