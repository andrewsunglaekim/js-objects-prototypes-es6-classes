function Person(name) {
  this.name = name
}

Person.greet = () => {
  console.log('hello from greet');
}
person = new Person('bob');
person2 = person.constructor('tom')
console.log(person);
console.log(person2);

Person.greet();
