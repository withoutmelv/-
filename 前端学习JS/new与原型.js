function Person(name,age) {
	// let that=Object.create(Person.prototype);
	// that.name=name;
	// that.age=age;
	// return that
	this.name=name;
	this.age=age;
}
Person.prototype.hello="123"
var person = new Person("lvyi",21);
// console.log(Person.prototype.__proto__)
// console.log(Object.getPrototypeOf(person))
// console.log(Person.prototype)
// console.log(Object.create(Person.prototype))
// console.log(person.__proto__)

var newMethod=(className,...arguments)=>{
	let example=Object.create(className.prototype);
	let result=className.apply(example,arguments);
	return typeof result==='object'?result:example;
}

const child=newMethod(Person,"lvx","18");
// console.log(child.name)
// console.log(child instanceof Person)
// console.log(child)
// console.log(Object.create(Person.prototype).__proto__)
// console.log(Object.getPrototypeOf(child))
// console.log(Person.prototype)