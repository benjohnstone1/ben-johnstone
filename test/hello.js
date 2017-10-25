// compile in terminal with $ tsc hello.ts
// tsc is typescript compiler
var Person = (function () {
    function Person(fName, lName) {
        this.firstName = fName;
        this.lastName = lName;
    }
    return Person;
}());

function hello(firstName, lastName) {
    console.log("Hello" + firstName + " " + lastName);
}
hello("Ben", "Johnstone");
