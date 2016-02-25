/*
Examples of higher order functions
*/
var employees = [
  {employeeId : '1', name : 'Jimmy', status : 'active', salary : 100},
  {employeeId : '2', name : 'Mark', status : 'active', salary : 200},
  {employeeId : '3', name : 'Fred', status : 'inactive', salary : 150},
  {employeeId : '4', name : 'John', status : 'active', salary : 180},
  {employeeId : '5', name : 'Larry', status : 'active', salary : 190},
  {employeeId : '6', name : 'Craig', status : 'inactive', salary : 300},
  {employeeId : '7', name : 'Peter', status : 'inactive', salary : 15},
];

// 1. using filter-map-reduce with fat arrow notation
var combinedActiveSalary = employees
  .filter((e) => e.status === 'active')
  .map((e) => e.salary)
  .reduce((a,b) => a+b).toFixed(2);
console.log(combinedActiveSalary);

// 2. using filter-map with function as variables
var salaryGreaterThanPredicateFactory = function (amount) {
  //function that return a function (predicate)
  return function makePredicate(employee) {
    return employee.salary > amount;
  };
};
var getName = function (employee) {
  return employee.name;
}
var employeesThatEarnMoreThan175 = employees
  .filter(salaryGreaterThanPredicateFactory(175))
  .map(getName);
console.log(employeesThatEarnMoreThan175);

// 3. using filter-forEach with fat arrow notation
employees
.filter((e) => e.salary > 175)
.forEach((e) => console.log(e.name)
);
