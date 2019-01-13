# Learning Objectives (2/2)

- Create an object literal with properties and methods
- Define encapsulation
- Create a function that returns an object literal
- Create an object using a constructor function
- Create a prototype for an object
- Define methods on an object prototype
- Identify some dangers of "monkey patching"
- Differentiate between prototype methods and methods on the constructor
- Inherit prototypes
- Create an es6 class
- Create a constructor method for an es6 class
- Create an instance method
- Create a static method
- Identify some use cases for a es6 class or es5 constructor function


## prereqs
- familiarity with JS object literals
- familiarity with JS functions

# Framing (1/3)

Objects are great. They store information that we can pass around, manipulate, aggregate and all sorts of other things. There are several ways to create and leverage objects in javascript. This workshop will dive into some of those ways.

# The Object Literal

The object literal is a versatile tool we can use to package some data together.

Here's an example:

```
const person = {
  name: 'bob',
  greet: () => {
    console.log('hello, my name is bob');
  },
};
```

Neat, in just 6 lines of code We've got an object that not only has a property... but also a method!

Suppose we need to create two instances of the same type of object. We could do something like this:

```
const person = {
  name: 'bob',
  greet: () => {
    console.log('hello, my name is bob');
  },
};

const person2 = {
  name: 'mary',
  greet: () => {
    console.log('hello, my name is mary');
  },
};
```

## Discussion - 3m

- What are some issues with creating two "people" objects in this way?
- What are some different approaches to writing the previous code?

# Encapsulation - A reason for object types
There are lots of reason why me might want to define a type of object. Encapsulation is probably at the top of the list. [Eloquent Javascript](https://eloquentjavascript.net/06_object.html) says it well here:

```
The core idea in object-oriented programming is to divide programs into smaller pieces and make each piece responsible for managing its own state.
```

# Another approach

Going back to the `person1` and `person2` code. We could potentially write it like this.

```
function createPerson(name){
  return {
    name,
    greet() {
      console.log(`hello, my name is ${this.name}`)
    },
  };
};

const person = createPerson('bob');
const person2 = createPerson('mary');
```

It's certainly a lot better and now we have a way to create as many people as we want. But we have a issue where we create a `greet` method for every instance of a person. What if the business partner wants greet to say something different? Now it needs to be changed in the `createPerson` function and then all the people need to be recreated. Not only that, we are still creating a greet method for each individual person.

# A better approach - Constructor Functions and Prototypes

In javascript all objects have a prototype property.

MDN really says it best [here](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes):

> Well, to be exact, the properties and methods are defined on the prototype property on Objects' constructor functions, not the object instances themselves. In JavaScript, a link is made between the object instance and its prototype (its __proto__ property, which is derived from the prototype property on the constructor), and the properties and methods are found by walking up the chain of prototypes.

Let's take a simple `String` method used in javascript: `split`.

```js
const name = 'Mary, Bob, Sue';
const nameArray = name.split(', ');
console.log(nameArray);
// nameArray returns ['Mary', 'Bob', 'Sue']
```

Sometimes, we as developers use tools like this and never really question why we're even able to. We're able to call the `split` method  on any string because `split` is defined on the `prototype` of the `String` type. We can see all the methods available to any value in js by accessing the `__proto__` property

But just like any method or function we use, it's specifically defined somewhere. The differences between the `greet` function we've written versus the `split` function defined natively is not too disparate apart from their functionalities.

Turns out, javascript has given us a way of defining a type of object and methods for those objects. In order to even use a prototype we must first create a constructor function.  Think of it as a way to create object types in javascript much like classes and interfaces in other languages.

```
function Person(name) {
  this.name = name
  this.greet = () => {
    console.log(`hello, my name is ${this.name}`)
  }
}
```

Now we can create as many `Person` objects we'd like. We still have a slight problem in that we're creating a greet method for every instance of our object. Instead let's leverage that prototype pattern and define a method on our `Person.prototype`



```
function Person(name) {
  this.name = name
}

Person.prototype.greet = () => {
  console.log(`hello, my name is ${this.name}`)
}
```

Now every instance of our `Person` constructor has access to a `greet` mmethod.

```
const person = new Person('bob');
person.greet();
// displays 'hello, my name is bob'
```

We can not only define methods for instances of our constructor, but we can also define methods on the constructor itself.

```
function Person(name) {
  this.name = name
}

Person.prototype.greet = () => {
  console.log(`hello, my name is ${this.name}`)
}

Person.someMethodOnTheConstructor = () => {
  console.log('I\'m a method on the constructor');
}
```

Defining things on the constructor is a way to encapsulate behavior about a whole type or class rather than a single instance.

## Inheritance

Prototypes can inherit other prototypes very simply. Say we wanted to make a `Developer` constructor and prototype. We could leverage our existing `Person` code in this way:

```js
function Developer(name) {
  Person.call(this, name);
  this.isCool = true;
}

Developer.prototype = new Person();

Developer.prototype.someDeveloperSpecificMethod = () => {
  console.log('hello');
  // some method that is specific to the Developer instances
}
```

In the above example we use [`call`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) to ... call the parent constructor. Then we set the prototype to be an instance of our Parent prototype.

## The prototype lookup

The [MDN docs] are unusually terse regarding inheritance in js. However their closing remarks on inheritance boil it down into a prototype lookup.

When accessing a property on an object `someObject.someProp` it will
- first look if `someObject` has a property `someProp`
- If not, checks if the prototype has that property
- If not, checks if the prototy of that prototype has a property, and on and on.

## Classes

Even though there are "classes" with es6. It should be noted that this is merely syntactic sugar that sits on top of the inheritance chain.

## Group Activity
As a group let's list out at least 10 types of objects we've used in our collective careers.
