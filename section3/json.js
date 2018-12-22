var obj = {
    name: 'Shreyam'
};

var stringObj = JSON.stringify(obj);
console.log(typeof stringObj);
console.log(stringObj);
console.log(obj);

var personString = '{"name" : "Shreyam", "age" : 24}';
var person = JSON.parse(personString);
console.log(typeof person);
console.log(person);

