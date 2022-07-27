const currentOperand = document.querySelectorAll('#current-operand');
const currentOperator = document.querySelectorAll('#current-operator');
const clearAll = document.querySelector("#clear-all");
const del = document.querySelector("#delete");
const previous = document.querySelector("#previous");
const current = document.querySelector("#current");
const equalsTo = document.querySelector("#equals-to");

class Calculator{
    constructor(previous, current){
        this.previous = previous;
        this.current = current;
        this.clear();
    }

    clear(){
        this.currOperand = "";
        this.prevOperand = "";
        this.operation = undefined;
    }

    delete(){
        this.currOperand = this.currOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if(number === "." && this.currOperand.includes(".")) return
        this.currOperand = this.currOperand.toString() + number.toString();
    }

    updateDisplay(){
        this.current.innerText = this.currOperand;
        if(this.operation != null){
            this.previous.innerText = `${this.prevOperand} ${this.operation}`
        }
        else this.previous.innerText = "";
    }

    chooseOperation(operation){
        if(this.currOperand === "") return
        if(this.prevOperand !== "") this.compute();
        this.operation = operation;
        this.prevOperand = this.currOperand;
        this.currOperand = "";
    }

    compute(){
        let computation;
        const prev = parseFloat(this.prevOperand)
        const current = parseFloat(this.currOperand);
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case "+":
                computation = prev + current;
                break;
            
            case "-":
                computation = prev - current;
                break;
            
            case "x":
                computation = prev * current;
                break;
            
            case "÷":
                computation = prev / current;
                break;
            
            default: return    

        }
        this.currOperand = computation;
        this.operation = undefined;
        this.prevOperand = "";
    }
}

const obj = new Calculator(previous, current);

currentOperand.forEach(button => {
    button.addEventListener("click", () => {
        obj.appendNumber(button.innerText)
        obj.updateDisplay();
    });
});

currentOperator.forEach(button => {
    button.addEventListener("click", () => {
        obj.chooseOperation(button.innerText)
        obj.updateDisplay();
    });
});

equalsTo.addEventListener("click", button => {
    obj.compute();
    obj.updateDisplay();
});

clearAll.addEventListener("click", button => {
    obj.clear();
    obj.updateDisplay();
});

del.addEventListener("click", button => {
    obj.delete();
    obj.updateDisplay();
});