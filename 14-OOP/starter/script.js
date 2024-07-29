'use strict';

// 005 Constructor Functions and the new Operatorgenghis khan buried

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

////////////////////////////////////////////////////
// 008 Prototypal Inheritance on Built-In Objects

console.log(janvi.__proto__);
// Object.prototype (top of prototype chain)
console.log(janvi.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 4, 6, 6, 6, 2, 1];
console.log(arr.__proto__);

Array.prototype.unique = function() {
    return [...new Set(this)];
};

console.log(arr.unique());

//////////////////////////////////////////////////////
// 009 challenge
/* Coding Challenge #1
Your tasks:
1. Use a constructor function to implement a 'Car'. A car has a 'make' and a 
'speed' property. The 'speed' property is the current speed of the car in 
km/h
2. Implement an 'accelerate' method that will increase the car's speed by 10, 
and log the new speed to the console
3. Implement a 'brake' method that will decrease the car's speed by 5, and log 
the new speed to the console
4. Create 2 'Car' objects and experiment with calling 'accelerate' and 
'brake' multiple times on each of them
Test data:
§ Data car 1: 'BMW' going at 120 km/h
§ Data car 2: 'Mercedes' going at 95 km/ */

const Car = function(make, speed) {
    this.make = make;
    this.speed = speed;
}

Car.prototype.accelerate = function() {
    this.speed += 10;
    console.log(`new speed of ${this.make} after acc.:  ${this.speed}`);
}

Car.prototype.break = function() {
    this.speed -= 5;
    console.log(`new speed of ${this.make} after break:  ${this.speed}`);
}

const bmw = new Car('BMW', 120);

bmw.accelerate();
bmw.break();

////////////////////////////////////////////////
// 010 ES6 Classes

// class expression
// const personCl = class {}

// class declaration
class personCl {
    constructor(fName, bYear) {
        this.fName = fName;
        this.bYear = bYear;
    }

    // Method willl bee added to .prototype property
    calcAge() {
        console.log(2024 - this.bYear);
    }

    greet() {
        console.log(`Hey! ${this.fName}`);
    }

    get age() {
        return 2024 - this.bYear;
    }

    // set a property that already exists
    set fName(name) {
        if(name.includes(' ')) this._fName = name;
        else alert(`${name} is not a full name`);
    }

    get fName() {
        return this._fName;
    }

    // 012 Static methods
    static hey() {
        console.log('Hey There 💚');
        console.log(this);
    }
}

const janki = new personCl('janki devi', 2003);
console.log(janki);
janki.calcAge();
console.log('age property by get: ', janki.age);
// personCl.prototype.greet = function() {
//     console.log(`Hey! ${this.fName}`);
// }

janki.greet();

const ruhi = new personCl('ruhi limbani', 2001);

personCl.hey();

// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens
// 3. Classes are executed in strict mode

//////////////////////////////////////////////////
/// 011 Setters and Getters

const account = {
    owner: 'janvi',
    movments: [200, 400, 670, 300],

    get latest() { // Property
        return this.movments.slice(-1).pop();
    },

    set latest(mov) {
        this.movments.push(mov);
    },
};

console.log(account.latest);

account.latest = 50;
console.log(account.movments);

////////////////////////////////////////////
// 012 Static Methods
Person.hey = function() {
    console.log('Hey there 💛');
}
// only for Person not for its obj
Person.hey();

///////////////////////////////////////////
// 013 Object.create

const PersonProto = {
    calcAge() {
        console.log(2024 - this.bYear);
    },

    init(fName, bYear) {
        this.fName = fName;
        this.bYear = bYear;
    },
};

const saanu = Object.create(PersonProto);
console.log(saanu);

saanu.name = 'saanu';
saanu.bYear = 2002;

saanu.calcAge();

const sahu = Object.create(PersonProto);
sahu.init('sahu', 2007);
sahu.calcAge();

//////////////////////////////////////////////
// 014 Coding Challenge #2

/* Coding Challenge #2
Your tasks:
1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide 
by 1.6)
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but 
converts it to km/h before storing the value, by multiplying the input by 1.6)
4. Create a new car and experiment with the 'accelerate' and 'brake'
methods, and with the getter and setter.
Test data:
§ Data car 1: 'Ford' going at 120 km/ */

class carCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    get speedUS() {
        return this.speed / 1.6;
    }

    set speedUS(speed) {
        this.speed = speed * 1.6;
    }

    accelerate() {
        this.speed += 10;
        console.log(`new speed of ${this.make} after acc.:  ${this.speed}`);
    }
    
    break() {
        this.speed -= 5;
        console.log(`new speed of ${this.make} after break:  ${this.speed}`);
    }
}

const ford = new carCl('Ford', 120);
console.log(ford.speedUS);
ford.accelerate();
ford.break();
ford.speedUS = 50;
console.log(ford);

////////////////////////////////////////////////////////
// 015 Inheritance Between _Classes__ Constructor Functions

const Persons = function(fName, bYear) {
    this.fName = fName;
    this.bYear = bYear;
};

Persons.prototype.calcAge = function() {
    console.log(2024 - this.bYear);
};

const Student = function(fName, bYear, course) {
    Persons.call(this, fName, bYear);
    this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Persons.prototype);

Student.prototype.intro = function() {
    console.log(`Hey studentt 👩‍🎓`);
}

const mini = new Student('mini', 2003, 'CE');
mini.intro();
mini.calcAge();

console.log(mini instanceof Student);
console.log(mini instanceof Persons);
console.log(mini instanceof Object);

Student.prototype.constructor = Student;
console.log(Student.prototype.constructor);

////////////////////////////////////////////////////
// 016 Coding Challenge #3

/* Coding Challenge #3
Your tasks:
1. Use a constructor function to implement an Electric Car (called 'EV') as a child
"class" of 'Car'. Besides a make and current speed, the 'EV' also has the 
current battery charge in % ('charge' property)
2. Implement a 'chargeBattery' method which takes an argument 
'chargeTo' and sets the battery charge to 'chargeTo'
3. Implement an 'accelerate' method that will increase the car's speed by 20, 
and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 
km/h, with a charge of 22%'
4. Create an electric car object and experiment with calling 'accelerate', 
'brake' and 'chargeBattery' (charge to 90%). Notice what happens when 
you 'accelerate'! Hint: Review the definiton of polymorphism �
Test data:
§ Data car 1: 'Tesla' going at 120 km/h, with a charge of 23% */

const EV = function(make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
}

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function(chargeTo) {
    this.charge = chargeTo;
}

EV.prototype.accelerate = function() {
    this.speed += 20;
    this.charge--;
    console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`);
}

const tesla = new EV('Tesla', 120, 23);

console.log(tesla.charge);
tesla.chargeBattery(40);
tesla.accelerate();
tesla.break();

////////////////////////////////////////////////////
// 017 Inheritance Between _Classes__ ES6 Classes

class studentCl extends personCl{
    constructor(fName, bYear, course) {
        /// Always need to happen first
        super(fName, bYear);
        // this.course = course;
    }

    intro() {
        console.log('Hey student 👩‍🌾', this.fName);
    }
}

const  moni = new studentCl('moni joy', 2005, 'IT');
moni.intro();
moni.calcAge();

////////////////////////////////////////////////
// 018 Inheritance Between _Classes__ Object.create


const StudentProto = Object.create(PersonProto);

StudentProto.init = function(fName, bYear, course) {
    PersonProto.init.call(this, fName, bYear);
    this.course = course;
}

const jenni = Object.create(StudentProto);
jenni.init('jenni', 1999, 'CSE');
jenni.calcAge();

///////////////////////////////////////////////
// 019 Another Class Example

class Account {
    constructor(owner, curr, pin) {
        this.owner = owner;
        this.curr = curr;
        this.pin = pin;
        this._movements = []; // Protected property by _
        this.locale = navigator.language;

        console.log(`Thank for opening acc ${owner}`);
    }

    // Public interface
    getMovements() {
        return this._movements;
    }

    deposit(val) {
        this._movements.push(val);
    }

    withdraw(val) {
        this.deposit(-val);
    }

    _approveLoan(val) {
        return true;
    }

    requestLoan(val) {
        if(this._approveLoan(val)) {
            this.deposit(val);
            console.log('Loan approved');
        }
    }
}

const acc1 = new Account('janvi', 'INR', 1111);

acc1.deposit(4000);
acc1.withdraw(200);
console.log(acc1);
acc1.requestLoan(1000);
console.log(acc1.getMovements());

/////////////////////////////////////////////////////
// 020 Encapsulation_ Protected Properties and Methods
// Just edit above code by making property protected

// 021 Encapsulation_ Private Class Fields and Methods

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also the static version)






