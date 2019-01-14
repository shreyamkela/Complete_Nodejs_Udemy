console.log('Starting app');

// setTimeout will get back and print after 2 sec irrespective of what the program is doing at that very moment. Thus the program can continue and setTimeout returns asynchronously back after 2s, thus creating async call.
setTimeout(() => { // Callback func
    console.log('Inside of Callback1a');
    console.log('Inside of Callback1b');
}, 2000); // delay

setTimeout(() => {
    console.log('Inside of Callback2');
}, 1999.999999);

setTimeout(() => {
    console.log('Inside of Callback3');
}, 0);

console.log('Finishing up');