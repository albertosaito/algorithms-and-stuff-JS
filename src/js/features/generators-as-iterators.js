// Another great use case for generator functions in JavaScript is to implement iterators.In fact, generator functions
// are often used to implement custom iterators for data structures that do not have built -in iterators.

// For example, let's say you have a custom data structure called MyList that stores a list of values. You can use a 
// generator function to implement an iterator for this data structure, which allows you to iterate over the values 
// in the list.

// In this example, the MyList class has a Symbol.iterator method that returns a generator function. The generator
// function uses the yield keyword to iterate over the items in the list, one at a time.

// By using a generator function to implement the iterator, we can write code that is much more concise and readable
// than if we were to manually iterate over the items in the list using a for loop or similar construct.It also
// allows us to easily add custom logic or behavior to the iterator, such as filtering or mapping the values in the
// list before they are returned.

// Note: This example may seem trivial, but it illustrates the potential of generator functions to iterate over
// complex data structures or API responses

class MyList {
  constructor() {
    this.items = [];
  }

  add(item) {
    this.items.push(item);
  }

  *[Symbol.iterator]() {
    for (let item of this.items) {
      yield item;
    }
  }
}

const list = new MyList();
list.add(1);
list.add(2);
list.add(3);

for (let item of list) {
  console.log(item);
}
