console.log('Starting app');

// setTimeout will get back and print after 2 sec irrespective of what the program is doing at that very moment. Thus the program can continue and setTimeout returns asynchronously back after 2s, thus creating async call.
setTimeout(() => { // Callback func - Call back funcs are funcs that have another func as their argument. When the setTimeout() was defined in node libraries, it must have been defined in a similar way as this - var setTimeout = (function, delay) => {...}. This is the syntax for defining callback funcs
    console.log('Inside of Callback1a');
    console.log('Inside of Callback1b');
}, 2000); // delay

setTimeout(() => {
    console.log('Inside of Callback2');
}, 1999.999999);

setTimeout(() => {
    console.log('Inside of Callback3');
}, 0); // This is printed after 'Finishing up' as when the main() finishes then only all the items from callback queue are executed

console.log('Finishing up');