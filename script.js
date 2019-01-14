function Person(name) {
  this.name = name
  this.greet = () => {
    console.log(`hello, my name is ${this.name}`)
  }
}

function Developer(name) {
  Person.call(this, name);
  this.isCool = true;
}

Developer.prototype = new Person();

Developer.prototype.someDeveloperSpecificMethod = () => {
  console.log('hello');
  // some method that is specific to the Developer instances
}

class Person {
  constructor(name) {
    this.name = name
  }

  greet() {
    console.log(`hello, my name is ${this.name}`)
  }
}

class Developer extends Person {
  constructor(name) {
    super(name)
    this.isCool = true;
  }

  someDeveloperSpecificMethod() {
    console.log('hello');
  }
}
