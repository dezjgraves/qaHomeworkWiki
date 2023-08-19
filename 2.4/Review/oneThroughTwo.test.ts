//SETTING VARIABBLES REVIEW
var numberOne: number = 10;
var numberTwo: number = 15;
var wordOne: string = "word";
var wordTwo: string = "two";
var booleanOne: boolean = true;
var booleanTwo: boolean = false;

describe("Should add variables", () => {
    it("should add the numbers", () => {
        expect(numberOne + numberTwo).toEqual(25);
        expect(numberTwo) -  numberOne).toEqual(5);
    })
})
it("should not pass with caps", () => {
    expect(wordOne).not.toEqual('Word');
    expect(wordTwo).toEqual('two');
})

it("should compare the booleans", () => {
    expect(booleanOne).not.toEqual(booleanTwo)
})


//FUNCTIONS REVIEW W/ IF ELSE
function wordPass(word:string): string {
    if (word === 'first') {
        return 'this is the first option'
    }
    else if (word === 'second') {
        return 'this is the second option'
    }
    else {
        return 'you only have two options!'
    }
 }

 describe("testing the wordPass Function", () => {
    it("should pass the first option", () => {
        expect(wordPass('first')).toBe('this is the first option')
    });
    it('should pass the second option', () => {
        expect(wordPass('second')).toBe('this is the second option')
    });
    it('should pass the third option', () => {
        expect(wordPass('second')).toBe('this is the second option')
    });
 })