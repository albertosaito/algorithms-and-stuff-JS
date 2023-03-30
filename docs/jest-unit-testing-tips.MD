# Jest Unit Testing
When in doubt, GO [HERE](https://jestjs.io/) AND RTFM! lol jk :p

## Unit testing intervals

This can be tricky sometimes... To unit test a JavaScript function that runs in an interval, you can
 use Jest's jest.useFakeTimers() function to mock the timer APIs and control the passage of time in
 your test.

Here's an example of how you can test a function that runs in an interval using Jest:

``` javascript
// myIntervalFunction.js
function myIntervalFunction() {
  setInterval(() => {
    console.log('Hello from the interval!');
  }, 1000);
}

module.exports = myIntervalFunction;
```

``` javascript
// myIntervalFunction.test.js
const myIntervalFunction = require('./myIntervalFunction');

jest.useFakeTimers();

test('myIntervalFunction should log every second', () => {
  myIntervalFunction();

  // Advance time by 1 second
  jest.advanceTimersByTime(1000);

  expect(console.log).toHaveBeenCalledWith('Hello from the interval!');

  // Advance time by 3 more seconds
  jest.advanceTimersByTime(3000);

  expect(console.log).toHaveBeenCalledTimes(4);
});
```

In this example, we're testing a simple function that logs a message to the console every second
using `setInterval()`. We use `jest.useFakeTimers()` to mock the timer APIs so we can control the
passage of time in our test.

We call `myIntervalFunction()` to start the interval, and then we use `jest.advanceTimersByTime()`
to advance time by 1 second and check that the message was logged to the console. We then advance
time by 3 more seconds and check that a total of 4 messages were logged.

Note that in order for `jest.advanceTimersByTime()` to work properly, your interval function should
use setInterval() instead of setTimeout(). If your function uses `setTimeout()`, you can use
`jest.advanceTimersToNextTimer()` instead to advance time to the next timer.

## Unit testing JavaScript classes
To use Jest to unit test constructors and instances in JavaScript, you can create a test file that
imports the module or class you want to test and then use Jest's assertion functions to test the
behavior of the constructor and its instances.

Here's an example of how you can test a simple constructor and its instances using Jest:

``` javascript
// myClass.js
class MyClass {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello, ${this.name}!`);
  }
}

module.exports = MyClass;
```

``` javascript
// myClass.test.js
const MyClass = require('./myClass');

test('MyClass constructor sets name property', () => {
  const instance = new MyClass('John');

  expect(instance.name).toBe('John');
});

test('MyClass instance can say hello', () => {
  const instance = new MyClass('John');

  console.log = jest.fn();

  instance.sayHello();

  expect(console.log).toHaveBeenCalledWith('Hello, John!');
});
```

In this example, we're testing a simple class `MyClass` that has a constructor and a method. In the
first test, we create an instance of `MyClass` and check that the name property is set correctly. In
the second test, we create an instance of `MyClass`, mock the `console.log()` method using
`jest.fn()`, and then call the `sayHello()` method to check that it logs the correct message to the
console.

Note that in order to mock the `console.log()` method, we're assigning it to `jest.fn()` and then
using that mocked function in the test. This allows us to check that the method was called with the
correct arguments without actually logging anything to the console.

Additionally, if your class has dependencies, you can use Jest's mocking capabilities to mock those
dependencies and test the behavior of your class in isolation. You can use the `jest.mock()`
function to replace the implementation of a dependency with a mock implementation, and then use
`jest.fn()` to mock methods on the mock implementation.

## Unit testing `EventEmitter` logic
To unit test event emitters using Jest, you can follow these steps:

1. Create a new Jest test file for your event emitter class or module.
2. Import your event emitter class or module into your Jest test file.
3. Write a test case that creates an instance of your event emitter class or module.
4. Use Jest's expect function to assert that the event emitter instance is not null or undefined.
5. Write additional test cases that simulate events being emitted from the event emitter and use
Jest's expect function to assert that the events were emitted with the correct data.

Here's an example test file for an event emitter class:

``` javascript
const { EventEmitter } = require('events');

describe('EventEmitter', () => {
  test('should create an instance of EventEmitter', () => {
    const emitter = new EventEmitter();
    expect(emitter).toBeDefined();
  });

  test('should emit events with correct data', () => {
    const emitter = new EventEmitter();

    const onData = jest.fn();
    const onEnd = jest.fn();

    emitter.on('data', onData);
    emitter.on('end', onEnd);

    emitter.emit('data', { message: 'hello' });
    expect(onData).toHaveBeenCalledWith({ message: 'hello' });

    emitter.emit('end');
    expect(onEnd).toHaveBeenCalled();
  });
});
```

In this example, the first test case creates an instance of the EventEmitter class and asserts that
it is not null or undefined.

The second test case creates an instance of the EventEmitter class and attaches event listeners for
the 'data' and 'end' events. Then, it simulates the 'data' and 'end' events being emitted from the
event emitter and uses Jest's expect function to assert that the events were emitted with the
correct data.

By testing your event emitter in this way, you can ensure that it is emitting events correctly and
handling them appropriately.

Here's a more complex example that shows how to test an event emitter that communicates with an
external service:

``` javascript
const { EventEmitter } = require('events');
const { Client } = require('my-service-client');

class MyService extends EventEmitter {
  constructor(config) {
    super();
    this.client = new Client(config);
  }

  async start() {
    try {
      await this.client.connect();
      this.emit('connected');
    } catch (err) {
      this.emit('error', err);
    }
  }

  async stop() {
    try {
      await this.client.disconnect();
      this.emit('disconnected');
    } catch (err) {
      this.emit('error', err);
    }
  }
}

describe('MyService', () => {
  let myService;
  let mockClient;

  beforeEach(() => {
    mockClient = {
      connect: jest.fn(),
      disconnect: jest.fn(),
    };

    myService = new MyService({
      client: mockClient,
    });
  });

  test('should start and emit connected event', async () => {
    const onConnected = jest.fn();

    myService.on('connected', onConnected);

    mockClient.connect.mockResolvedValueOnce();

    await myService.start();

    expect(mockClient.connect).toHaveBeenCalledTimes(1);
    expect(onConnected).toHaveBeenCalledTimes(1);
  });

  test('should stop and emit disconnected event', async () => {
    const onDisconnected = jest.fn();

    myService.on('disconnected', onDisconnected);

    mockClient.disconnect.mockResolvedValueOnce();

    await myService.stop();

    expect(mockClient.disconnect).toHaveBeenCalledTimes(1);
    expect(onDisconnected).toHaveBeenCalledTimes(1);
  });

  test('should emit error event on start failure', async () => {
    const onError = jest.fn();
    const errorMsg = 'Failed to connect to client';

    myService.on('error', onError);

    mockClient.connect.mockRejectedValueOnce(new Error(errorMsg));

    await expect(myService.start()).rejects.toThrowError(errorMsg);

    expect(mockClient.connect).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(new Error(errorMsg));
  });

  test('should emit error event on stop failure', async () => {
    const onError = jest.fn();
    const errorMsg = 'Failed to disconnect from client';

    myService.on('error', onError);

    mockClient.disconnect.mockRejectedValueOnce(new Error(errorMsg));

    await expect(myService.stop()).rejects.toThrowError(errorMsg);

    expect(mockClient.disconnect).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(new Error(errorMsg));
  });
});
```

In this example, we have a MyService class that extends EventEmitter and uses an external service
client to connect and disconnect from a service.

The MyService class has two methods: start() and stop(), which connect and disconnect from the
external service respectively. Both methods emit events when they succeed or fail.

In the Jest tests, we create a mock client object and pass it to a new instance of MyService. Then,
we write four test cases:

- The first test case checks that `start()` connects to the client and emits a 'connected' event.
- The second test case checks that `stop()` disconnects from the client and emits a 'disconnected'
event.
- The third test case checks that `start()` emits an 'error' event if the client fails to connect.
- The fourth test case checks that `stop()` emits an 'error' event if the client fails to
disconnect.

## Unit testing timeouts

When testing `setTimeout` logic, it's important to ensure that the callback function is executed
after the specified delay, and that any associated state changes occur as expected. Here's an
example of how to test `setTimeout` logic using Jest:

``` javascript
function delayedAction(callback, delay) {
  setTimeout(() => {
    callback();
  }, delay);
}

describe('delayedAction', () => {
  jest.useFakeTimers();

  test('callback is called after specified delay', () => {
    const callback = jest.fn();
    const delay = 1000;

    delayedAction(callback, delay);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(delay);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('callback changes state as expected', () => {
    let state = 0;

    const callback = () => {
      state = 1;
    };

    const delay = 1000;

    delayedAction(callback, delay);

    expect(state).toBe(0);

    jest.advanceTimersByTime(delay);

    expect(state).toBe(1);
  });
});
```

In this example, we have a delayedAction function that takes a callback function and a delay time as
arguments. The function uses setTimeout to call the callback function after the specified delay.

To test this function, we use Jest's useFakeTimers function to create a fake timer environment.
Then, we write two test cases:

The first test case checks that the callback function is called after the specified delay. We pass a
mock callback function that uses `jest.fn()` to count how many times it is called. We then call 
`delayedAction` with the mock callback and a delay of 1000ms. We use
`expect(callback).not.toBeCalled()` to ensure that the callback has not yet been called, and then we
use `jest.advanceTimersByTime(delay)` to advance the fake timer by the specified delay time.
Finally, we use `expect(callback).toBeCalled()` to ensure that the callback has been called once.

The second test case checks that the callback function changes state as expected. We declare a state
variable with an initial value of 0. We then pass a mock callback function that sets the state
variable to 1. We call `delayedAction` with the mock callback and a delay of 1000ms. We use
`expect(state).toBe(0)` to ensure that the state has not yet changed, and then we use
`jest.advanceTimersByTime(delay)` to advance the fake timer by the specified delay time. Finally, we
use `expect(state).toBe(1)` to ensure that the state has been changed as expected.

By testing the delayedAction function in this way, we can ensure that it behaves as expected when
used in real code.

## Unit testing native streams
Node.js provides a set of built-in stream modules that can be used to read and write data from
various sources and destinations. When working with these stream modules, it's important to test
that they are working correctly and producing the expected output. Here's an example of how to unit
test native streams in Node.js using Jest:

``` javascript
const fs = require('fs');
const { Readable } = require('stream');

function readStream(filePath) {
  const stream = fs.createReadStream(filePath);
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => {
      chunks.push(chunk);
    });
    stream.on('end', () => {
      resolve(Buffer.concat(chunks).toString('utf8'));
    });
    stream.on('error', reject);
  });
}

describe('readStream', () => {
  test('reads a file stream and returns the contents', async () => {
    const content = 'hello, world!';
    const stream = new Readable({
      read() {
        this.push(content);
        this.push(null);
      }
    });

    const filePath = 'test.txt';
    fs.createWriteStream(filePath).write(content);

    const result = await readStream(filePath);
    expect(result).toBe(content);
  });
});
```

In this example, we have a `readStream` function that reads the contents of a file and returns them
as a string. The function uses Node.js' built-in `fs.createReadStream` function to create a stream
object, and listens for data, end, and error events to handle the data read from the file.

To test this function, we use Jest to create a test suite with a single test case. In the test case,
we create a `Readable` stream object with a hardcoded string value, and a corresponding file with
the same content. We then call `readStream` with the file path, and use
`expect(result).toBe(content)` to verify that the function returns the expected output.

Note that we're not actually using a file stream in our test, but instead simulating a file stream
with the `Readable` stream object. This allows us to test the `readStream` function without relying
on an external file, and ensures that our test is deterministic and does not rely on external
factors.

Here's a more complex example of unit testing native streams in Node.js using Jest. In this example,
we have a function that reads a CSV file and returns its contents as an array of objects. We'll use
Jest to test this function and ensure that it correctly parses the CSV data into objects.

``` javascript
const fs = require('fs');
const { Transform } = require('stream');

function parseCSV(csvString) {
  const rows = csvString.trim().split('\n');
  const headers = rows[0].split(',');
  const data = rows.slice(1);
  return data.map((row) => {
    const values = row.split(',');
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index];
      return obj;
    }, {});
  });
}

function readCSV(filePath) {
  const stream = fs.createReadStream(filePath);
  const transform = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      const csvString = chunk.toString();
      const data = parseCSV(csvString);
      data.forEach((obj) => this.push(obj));
      callback();
    }
  });

  return new Promise((resolve, reject) => {
    const rows = [];
    stream.on('error', reject);
    transform.on('error', reject);
    transform.on('data', (row) => rows.push(row));
    transform.on('end', () => resolve(rows));
    stream.pipe(transform);
  });
}

describe('readCSV', () => {
  test('reads a CSV file and returns an array of objects', async () => {
    const content = 'id,name,age\n1,Alice,25\n2,Bob,30\n3,Charlie,35\n';
    const filePath = 'test.csv';
    fs.createWriteStream(filePath).write(content);

    const result = await readCSV(filePath);
    expect(result).toEqual([
      { id: '1', name: 'Alice', age: '25' },
      { id: '2', name: 'Bob', age: '30' },
      { id: '3', name: 'Charlie', age: '35' }
    ]);
  });
});
```

In this example, we have a `readCSV` function that reads a CSV file and returns its contents as an
array of objects. The function uses Node.js' built-in `fs.createReadStream` function to create a
stream object, and pipes the stream through a Transform object that converts the CSV data into
objects.

To test this function, we create a CSV file with hardcoded content, and call `readCSV` with the file
path. We then use `expect(result).toEqual(expected)` to verify that the function returns the
expected output. In this case, we expect the output to be an array of three objects, each with id,
name, and age properties.

Note that this example also includes error handling for the stream and transform objects, and uses
Jest's async and await syntax to handle the asynchronous nature of the function.

## Testing "builder" pattern modules and classes
Let's start describing the "Builder" pattern:
The builder pattern is a design pattern that can be used in JavaScript (and in general in any OO
programming language) to simplify the creation of complex objects. It is a creational pattern, which
means it provides a way to create objects while hiding the creation logic and complexity from the
client code.

In the builder pattern, instead of directly creating an object and setting its properties using a
constructor or setters, you use a builder object to construct the object step by step. The builder
object exposes methods for setting the properties of the object, and each method returns the builder
object itself. This allows you to chain the method calls together, creating a fluent interface that
reads like a sentence.

Once you have set all the properties using the builder object, you call a final `build` method to
return the fully constructed object. This separation of concerns makes the code more modular, easier
to read, and easier to maintain.

If you want to mock a module or class instance that uses the "builder" pattern you can do something
like this: Assuming we have a `CarBuilder` class, in order to test other parts of your code that
depend on it, you can use Jest's `jest.mock()` function to create a mock implementation of the
class.

Here's an example of how you can mock the `CarBuilder` class:

``` javascript
// carBuilder.js
class CarBuilder {
  constructor() {
    this.car = {};
  }

  setMake(make) {
    this.car.make = make;
    return this;
  }

  setModel(model) {
    this.car.model = model;
    return this;
  }

  setYear(year) {
    this.car.year = year;
    return this;
  }

  setColor(color) {
    this.car.color = color;
    return this;
  }

  build() {
    return this.car;
  }
}

module.exports = CarBuilder;
```

``` javascript
// otherModule.js
const CarBuilder = require('./carBuilder');

function buildCar() {
  return new CarBuilder()
    .setMake('Toyota')
    .setModel('Camry')
    .setYear(2020)
    .setColor('blue')
    .build();
}

module.exports = { buildCar };
```

``` javascript
// otherModule.test.js
const CarBuilder = require('./carBuilder');
const otherModule = require('./otherModule');

jest.mock('./carBuilder');

describe('otherModule', () => {
  test('buildCar calls CarBuilder correctly', () => {
    CarBuilder.mockImplementation(() => {
      return {
        setMake: jest.fn().mockReturnThis(),
        setModel: jest.fn().mockReturnThis(),
        setYear: jest.fn().mockReturnThis(),
        setColor: jest.fn().mockReturnThis(),
        build: jest.fn().mockReturnValue({ make: 'Toyota', model: 'Camry', year: 2020, color: 'blue' })
      };
    });

    const car = otherModule.buildCar();

    expect(CarBuilder).toHaveBeenCalled();
    expect(car).toEqual({ make: 'Toyota', model: 'Camry', year: 2020, color: 'blue' });
  });
});
```

In this example, we have two modules: `carBuilder.js` and `otherModule.js`. The `otherModule.js`
file depends on the CarBuilder class from the `carBuilder.js` file. We want to test the
`otherModule.js` file, but we need to mock the `CarBuilder` class to isolate the code being tested.

In the test file `otherModule.test.js`, we use `jest.mock()` to mock the `CarBuilder class`. We then
define a single unit test that sets up a mock implementation of the `CarBuilder` class using
`jest.fn()` to create mock functions for each method. The `build()` method is then mocked to return
a test object.

We then call the `buildCar()` function from the `otherModule.js` file, and use the `expect()`
function to check that the `CarBuilder` class was called and that the resulting car object has the
correct properties.

Note that by default, Jest's mock implementation of a class will return another mock implementation,
which can be chained to create complex mock objects. You can customize the behavior of the mock
implementation by providing your own implementation code using `mockImplementation()`. In this
example, we used `mockImplementation()` to create a mock implementation that returns a mock object
with the expected properties.

Also note how we are using `jest.fn().mockReturnThis`. In Jest, `mockReturnThis()` is a method on
mock functions that can be used to create a mock function that always returns `this`. In this
context, the `this` keyword refers to the object that the method is being called on, so in the
context of a mock function, it refers to the mock object itself.