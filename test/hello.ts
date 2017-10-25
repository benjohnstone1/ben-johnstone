// compile in terminal with $ tsc hello.ts
// tsc is typescript compiler

class Person {
    private firstName: string;
    private lastName: string;
    
    constructor(fName: string, lName: string){
        this.firstName = fName:
        this.lastName = lName;
    }
}

function hello(firstName: string, lastName: string) {
    console.log("Hello"+ firstName + " " + lastName);
}

hello("Ben", "Johnstone");