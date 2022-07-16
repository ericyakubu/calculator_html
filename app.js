const prevRef = document.querySelector("#prevRef");
const inputRef = document.querySelector("#inputRef");
const calculator = document.querySelector("#calculator");
const numRef = document.querySelectorAll(".numRef");
const calcValues = ["clear", "clear-one", "x²", "√", "1/x", "÷", "1", "2", "3", "×", "4", "5", "6", "+", "7", "8", "9", "-", "±", "0", ".", "="];
let numOne, numTwo, opt, result;

// --------------------- Functions ---------------------
const _addNumRef = (el) => {
    if (!numRef.includes(el)) {
        numRef.push(el);
    }
};
const _convertSign = () => {
    if (isNaN(inputRef.value)) inputRef.value = parseFloat(inputRef.value);
    inputRef.value = inputRef.value * -1;
};
const _sqrRoot = () => {
    numOne = parseFloat(inputRef.value);
    prevRef.value = `√${numOne}`;
    inputRef.value = Math.sqrt(numOne);
    numOne = "";
    numTwo = "";
};
const _pow2 = () => {
    numOne = parseFloat(inputRef.value);
    prevRef.value = `${numOne}²`;
    inputRef.value = Math.pow(numOne, 2);
    numOne = "";
    numTwo = "";
};
const _oneDivNum = () => {
    numOne = parseFloat(inputRef.value);
    prevRef.value = `1/${numOne}`;
    inputRef.value = 1 / numOne;
    numOne = "";
    numTwo = "";
};
const _submit = () => {
    if (numOne && (opt === "÷" || opt === "×" || opt === "+" || opt === "-")) {
        numTwo = parseFloat(inputRef.value);
        prevRef.value = `${numOne} ${opt} ${numTwo}`;
        switch (opt) {
            case "÷":
                result = numOne / numTwo;
                break;
            case "×":
                result = numOne * numTwo;
                break;
            case "+":
                result = numOne + numTwo;
                break;
            case "-":
                result = numOne - numTwo;
                break;
            default:
                break;
        }
        numOne = "";
        numTwo = "";
        inputRef.value = result;
    }
};
const _functionOpt = (e) => {
    if (numOne && (opt === "÷" || opt === "×" || opt === "+" || opt === "-") && inputRef.value) {
        _submit();
    }
    opt = e.target.value;

    if (opt === "÷" || opt === "×" || opt === "+" || opt === "-") {
        if (!numOne) {
            numOne = parseFloat(inputRef.value);
            prevRef.value = `${numOne} ${opt}`;
            inputRef.value = "";
        } else if (numOne) {
            prevRef.value = `${numOne} ${opt}`;
            inputRef.value = "";
        }
    } else if (opt === "√") {
        _sqrRoot();
    } else if (opt === "x²") {
        _pow2();
    } else if (opt === "1/x") {
        _oneDivNum();
    }
};
const _clear = (e) => {
    if (e.target.value === "clear") {
        numOne = "";
        numTwo = "";
        opt = "";
        result = "";
        inputRef.value = null;
        prevRef.value = "";
    } else {
        inputRef.value = parseFloat(inputRef.value.toString().slice(0, -1));
    }
};
const _handleNumber = (e) => {
    inputRef.value += e.target.value;
};

// --------------------- Etc. ---------------------

const _calculator = () => {
    calcValues.map((calcValue) => {
        const calculatorBtn = document.createElement("button");
        calculatorBtn.value = calcValue;

        calcValue !== "clear-one" ? (calculatorBtn.innerText = `${calcValue}`) : (calculatorBtn.innerHTML = `<i class="fas fa-backspace"></i>`);
        calcValue !== "clear" ? null : calculatorBtn.setAttribute("id", `${calcValue}`);

        isNaN(calcValue) ? calculatorBtn.classList.add("function") : null;
        calcValue === "." || isNaN(Number(calcValue)) === false ? calculatorBtn.classList.add("numRef") : null;

        calcValue === "="
            ? calculatorBtn.addEventListener("click", _submit)
            : calcValue === "clear" || calcValue === "clear-one"
            ? calculatorBtn.addEventListener("click", _clear)
            : calcValue === "±"
            ? calculatorBtn.addEventListener("click", _convertSign)
            : isNaN(Number(calcValue)) === false || calcValue === "."
            ? calculatorBtn.addEventListener("click", _handleNumber)
            : calculatorBtn.addEventListener("click", _functionOpt);

        calculator.appendChild(calculatorBtn);
    });
};

_calculator();
