const canvas = document.getElementById("calculatorCanvas");
const ctx = canvas.getContext("2d");

let value = "";
let result = "";

canvas.width = 500;
canvas.height = 550;

let buttonWidth = 100;
let buttonHeight = 80;

// creating circles for the icons
const drawCircles =(x,color) =>{
    ctx.beginPath();
    ctx.arc(x,20,10,0,Math.PI*2,false)
    ctx.fillStyle=color
    ctx.fill()
}
drawCircles(20,"red")
drawCircles(50,"yellow")
drawCircles(80,"green")

// input and output values display
const drawValue = () =>{
    ctx.clearRect(0, 50, canvas.width, 100);
    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "right";
    ctx.fillText(value, canvas.width - 10, 85);
}


// styling the button in the calculator
const drawButton = (x, y, text,color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, buttonWidth, buttonHeight);
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(x, y, buttonWidth, buttonHeight);
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x + buttonWidth / 2, y + buttonHeight / 2);
}

// this function draws the button on which the values are displayed such as numbers nad symbols
const drawCalculator = () => {
    drawValue();
    drawButton(0, 150, "","darkgray");
    drawButton(buttonWidth, 150, "","darkgray");
    drawButton(buttonWidth * 2, 150, "","darkgray");
    drawButton(buttonWidth * 3, 150, "%","darkgray");
    drawButton(buttonWidth * 4, 150, "/","orange");
    drawButton(0, 150 + buttonHeight, "(","darkgray");
    drawButton(buttonWidth, 150 + buttonHeight, "7","darkgray");
    drawButton(buttonWidth * 2, 150 + buttonHeight, "8","darkgray");
    drawButton(buttonWidth * 3, 150 + buttonHeight, "9","darkgray");
    drawButton(buttonWidth * 4, 150 + buttonHeight, "X","orange");
    drawButton(0, 150 + buttonHeight * 2, ")","darkgray");
    drawButton(buttonWidth, 150 + buttonHeight * 2, "4","darkgray");
    drawButton(buttonWidth * 2, 150 + buttonHeight * 2, "5","darkgray");
    drawButton(buttonWidth * 3, 150 + buttonHeight * 2, "6","darkgray");
    drawButton(buttonWidth * 4, 150 + buttonHeight * 2, "-","orange");
    drawButton(0, 150 + buttonHeight * 3, "Back","darkgray");
    drawButton(buttonWidth, 150 + buttonHeight * 3, "1","darkgray");
    drawButton(buttonWidth * 2, 150 + buttonHeight * 3, "2","darkgray");
    drawButton(buttonWidth * 3, 150 + buttonHeight * 3, "3","darkgray");
    drawButton(buttonWidth * 4, 150 + buttonHeight * 3, "+","orange");
    drawButton(0, 150 + buttonHeight * 4, "","darkgray");
    drawButton(buttonWidth, 150 + buttonHeight * 4, "0","darkgray");
    drawButton(buttonWidth * 2, 150 + buttonHeight * 4, "","darkgray");
    drawButton(buttonWidth * 3, 150 + buttonHeight * 4, ".","darkgray");
    drawButton(buttonWidth * 4, 150 + buttonHeight * 4, "=","orange");
}

//this function is used to clear the values but never used
const clearValue = () => {
    value = "";
    drawValue();
}

// adds values side by side
const addValue = (newValue) => {
    value += newValue;
    drawValue();
}

// clears value using back button
const deleteValue = () => {
    value = value.slice(0, -1);
    drawValue();
}

function output() {
    ctx.clearRect(0, 50, canvas.width, 120);
    ctx.font = "24px Arial";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "right";
    ctx.fillText(value, canvas.width - 10, 115);
    
}

// evaluates the result
const parseExpression = (expression) => {
    // define allowed operators and their precedence
    const operators = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
      "%": 2
    };
  
    const isOperator = (char) => operators[char] !== undefined;
  
    const outputQueue = [];
    const operatorStack = [];
  
    // tokenize the input expression
    const tokens = expression
      .replace(/\s+/g, "") // remove whitespace
      .match(/(\d+(\.\d+)?)|([+\-*/%()])/g);
  
    // parse each token
    tokens.forEach((token) => {
      if (!isNaN(token)) {
        // token is a number
        outputQueue.push(parseFloat(token));
      } else if (isOperator(token)) {
        // token is an operator
        while (
          operatorStack.length > 0 &&
          isOperator(operatorStack[operatorStack.length - 1]) &&
          operators[token] <= operators[operatorStack[operatorStack.length - 1]]
        ) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
      } else if (token === "(") {
        // token is left parenthesis
        operatorStack.push(token);
      } else if (token === ")") {
        // token is right parenthesis
        while (operatorStack[operatorStack.length - 1] !== "(") {
          outputQueue.push(operatorStack.pop());
          if (operatorStack.length === 0) {
            throw new Error("Invalid Expression: Mismatched Parentheses");
          }
        }
        operatorStack.pop();
      } else {
        throw new Error("Invalid Expression");
      }
    });
  
    // pop any remaining operators off the stack and push to output queue
    while (operatorStack.length > 0) {
      const operator = operatorStack.pop();
      if (operator === "(") {
        throw new Error("Invalid Expression: Mismatched Parentheses");
      }
      outputQueue.push(operator);
    }
  
    // evaluate the postfix expression
    const stack = [];
    outputQueue.forEach((token) => {
      if (!isNaN(token)) {
        // token is a number
        stack.push(token);
      } else if (isOperator(token)) {
        // token is an operator
        if (stack.length < 2) {
          throw new Error("Invalid Expression");
        }
        const operand2 = stack.pop();
        const operand1 = stack.pop();
        let result;
        switch (token) {
          case "+":
            result = operand1 + operand2;
            break;
          case "-":
            result = operand1 - operand2;
            break;
          case "*":
            result = operand1 * operand2;
            break;
          case "/":
            if (operand2 === 0) {
              if (operand1 === 0) {
                result = NaN; // 0/0 is undefined
              } else {
                result = Infinity; // n/0 is infinity
              }
            } else {
              result = operand1 / operand2;
            }
            break;
          case "%":
            if(operand2 === 0) {
                throw new Error("Invalid Expression: Division by 0")
            }
            result = operand1 % operand2;
            break;
        }
        stack.push(result);
      }
    });
  
    if (stack.length !== 1) {
      throw new Error("Inv Expression");
    }
  
    return stack.pop();
};
 
// displays the output or error
const evaluate = () => {
  try {
    let input = value;
    
    value = parseExpression(input).toString();
  } catch (e) {
    value = "Invalid Expression";
  }
  drawValue();
};

  
  
// Event listener so that when we click on the numbers, it gets clicked and performs the required task
canvas.addEventListener("mousedown", function(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    if (y >= 150 && y <= 150 + buttonHeight) {
        if (x >= 0 && x <= buttonWidth) {
            //;
        } else if (x >= buttonWidth && x <= buttonWidth * 2) {
            //;
        } else if (x >= buttonWidth * 2 && x <= buttonWidth * 3) {
            //;
        } else if (x >= buttonWidth * 3 && x <= buttonWidth * 4) {
            addValue("%");
        } else if (x >= buttonWidth * 4 && x <= buttonWidth * 5) {
            addValue("/");
        }
    } else if (y >= 150 + buttonHeight && y <= 150 + buttonHeight * 2) {
        if (x >= 0 && x <= buttonWidth) {
            addValue("(");
        } else if (x >= buttonWidth && x <= buttonWidth * 2) {
            addValue("7");
        } else if (x >= buttonWidth * 2 && x <= buttonWidth * 3) {
            addValue("8");
        } else if (x >= buttonWidth * 3 && x <= buttonWidth * 4) {
            addValue("9");
        } else if (x >= buttonWidth * 4 && x <= buttonWidth * 5) {
            addValue("*");
        }
    } else if (y >= 150 + buttonHeight * 2 && y <= 150 + buttonHeight * 3) {
        if (x >= 0 && x <= buttonWidth) {
            addValue(")");
        } else if (x >= buttonWidth && x <= buttonWidth * 2) {
            addValue("4");
        } else if (x >= buttonWidth * 2 && x <= buttonWidth * 3) {
            addValue("5");
        } else if (x >= buttonWidth * 3 && x <= buttonWidth * 4) {
            addValue("6");
        } else if (x >= buttonWidth * 4 && x <= buttonWidth * 5) {
            addValue("-");
        }
    } else if (y >= 150 + buttonHeight * 3 && y <= 150 + buttonHeight * 4) {
        if (x >= 0 && x <= buttonWidth) {
            deleteValue();
        } else if (x >= buttonWidth && x <= buttonWidth * 2) {
            addValue("1");
        } else if (x >= buttonWidth * 2 && x <= buttonWidth * 3) {
            addValue("2");
        } else if (x >= buttonWidth * 3 && x <= buttonWidth * 4) {
            addValue("3");
        } else if (x >= buttonWidth * 4 && x <= buttonWidth * 5) {
            addValue("+");
        }
    } else if (y >= 150 + buttonHeight * 4 && y <= 150 + buttonHeight * 5) {
        if (x >= 0 && x <= buttonWidth) {
            //;
        } else if (x >= buttonWidth && x <= buttonWidth * 2) {
            addValue("0");
        } else if (x >= buttonWidth * 2 && x <= buttonWidth * 3) {
            //;
        } else if (x >= buttonWidth * 3 && x <= buttonWidth * 4) {
            addValue(".");
        } else if (x >= buttonWidth * 4 && x <= buttonWidth * 5) {
            evaluate();
        }
    }
});


drawCalculator();
