'use strict';

// 005 Constructor Functions and the new Operator

const Person = function(fName, bday) {
    // Instance properties
    this.fName = fName;
    this.bday = bday;

    // Never do this
    /* this.calcAge = function() {
        console.log(2037- this.bday);
    }; */
};

const janvi = new Person('Janvi', 2003);
console.log(janvi);

// 1. New {} is created {}=empty obj
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const rahul = new Person('Rahul', 2000);
console.log(rahul);

console.log(rahul instanceof Person);

////////////////////////////////////////////
// 006 Prototypes

console.log(Person.prototype);

Person.prototype.calcAge = function() {
    console.log(2024 - this.bday);
};

janvi.calcAge();
rahul.calcAge();

console.log(janvi.__proto__);
console.log(janvi.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(Person));
console.log(Person.prototype.isPrototypeOf(janvi));

Person.prototype.species = 'Homo sapiens';
console.log(janvi, rahul.species);

console.log(janvi.hasOwnProperty('fName'));
console.log(janvi.hasOwnProperty('species'));
