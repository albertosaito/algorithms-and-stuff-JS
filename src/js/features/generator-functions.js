// One good use case for generator functions in JavaScript is for asynchronous programming with generators.Generator
// functions can be used to simplify the process of writing asynchronous code that involves multiple steps or 
// operations.

// For example, let's say you need to fetch data from an API and perform some complex calculations on the data before
// rendering it to the user.With generators, you can write the code in a way that looks synchronous, but actually 
// executes asynchronously in the background.

// In this example, the fetchData generator function uses the yield keyword to pause the execution of the function 
// and wait for the result of each asynchronous operation.The run function is a utility function that takes a 
// generator function and executes it, using promises to handle the asynchronous operations.

// By using generator functions and the yield keyword, we can write asynchronous code that is much easier to read and
// understand, without having to deal with complex callback chains or promise chains.

// Note: that this is just an example, and the same can be achieved easily just by using async/await syntax-sugar

const https = require('https')
const agent = new https.Agent({
  rejectUnauthorized: false,
})

function* fetchData() {
  const data = yield fetch(process.env.MY_LITTLE_API, { method: 'get', agent });
  const processedData = yield handleData(data);
  const result = yield renderData(processedData);
  return result;
}

function run(generator) {
  const iterator = generator();

  function iterate(iteration) {
    if (iteration.done) {
      return Promise.resolve(iteration.value);
    }

    return Promise.resolve(iteration.value)
      .then(x => iterate(iterator.next(x)))
      .catch(x => iterate(iterator.throw(x)));
  }

  return iterate(iterator.next());
}

function handleData(srcData) {
  // do something with your data
  return srcData.json()
}

function renderData(processedData) {
  // do something with your data. I n this case we assume the JSON response has a "name" property
  return processedData.name
}

run(fetchData)
  .then(result => console.log(result))
  .catch(error => console.error(error));

