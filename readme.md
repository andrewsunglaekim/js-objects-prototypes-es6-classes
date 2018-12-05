# Learning Objectives (2/2)

- Create an object literal with properties and methods
- Define encapsulation
- Create a function that returns an object literal
- Create an object using a constructor function
- Create a prototype for an object
- Define methods on an object prototype
- Differentiate between prototype methods and methods on the constructor
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
var person = {
  name: 'bob',
  greet: () => {
    console.log('hello, my name is bob');
  },
};
```

Neat, in just 6 lines of code We've got an object that not only has a property... but also a method!

Suppose we need to create two instances of the same type of object. We could do something like this:

```
var person = {
  name: 'bob',
  greet: () => {
    console.log('hello, my name is bob');
  },
};

var person2 = {
  name: 'mary',
  greet: () => {
    console.log('hello, my name is mary');
  },
};
```

## Discussion - 4m

- What are some issues with creating two "people" objects in this way?
- What are some different approaches to writing the following code?

# Encapsulation - A reason for object types
There are lots of reason why me might want to define a type of object. Encapsulation is probably at the top of the list. [Eloquent Javascript](https://eloquentjavascript.net/06_object.html) says it well here:

```
The core idea in object-oriented programming is to divide programs into smaller pieces and make each piece responsible for managing its own state.
```

## Group Activity
As a group let's list out at least 10 types of objects we've used in our collective careers.

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
```

It's certainly a lot better and now we have a way to create as many people as we want. But we have a issue where we create a `greet` method for every instance of a person. What if the partner wants greet to say something different? Now it needs to be changed in the `createPerson` function and then all the people need to be recreated.

# A better approach - Constructor Functions






Well, to be exact, the properties and methods are defined on the prototype property on the Objects' constructor functions, not the object instances themselves.

https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes
