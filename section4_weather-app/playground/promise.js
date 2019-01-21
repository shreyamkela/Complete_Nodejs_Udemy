// var somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('It worked!');
//         resolve('It worked!'); // Advantage 1 - Resolve/reject are only called once no matter how many times they are present in the promise. Therefore, this resolve doesnt work
//         reject('Unable to fulfill promise')
//     }, 2500);
// });

// // somePromise.then((message) => { // This does not conside reject activated. Only one argument which is for resolve
// //     console.log('Success: ', message);
// // });

// somePromise.then((message) => { // This considers reject through the second argument
//     console.log('Success: ', message); // Advantage 2 - Promises provide 2 different 
// }, (errorMessage) => {
//     console.log('Error:', errorMessage);
// });



var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number') {
                resolve(a+b);
            } else {
                reject('Arguments must be numbers');
            }
        }, 100);
    });
};

asyncAdd(5, 7).then((res1) => { //res1 is the returned value for asyncAdd(5, 7) Promise means that asyncAddhas promised that it will either return will answer or an error message. And when it returns, one of the 2 parameters inside then() is activated
    console.log('Result1:', res1);
    return asyncAdd(res1, 33); // We call asyncAdd again which makes a new promise with res1 and 33 as arguments. Therefore if first promise is fulfilled, this new promise is made, thus chaining promises to form sync call. The next then() handles this 2nd promise
}, (errorMessage) => {
    console.log(errorMessage);
}).then((res2) => {
    console.log('Result2:', res2);
}, (errorMessage) => {
    console.log(errorMessage);
});