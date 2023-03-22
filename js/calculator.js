// Setting canvas UI start
const canvas = document.getElementById("calculatorCanvas"); //gets a reference to the HTML <canvas> element
const ctx = canvas.getContext("2d"); //gets that calculator's context

elemLeft = canvas.offsetLeft,
elemTop = canvas.offsetTop,
elements = [];
console.log("here")
//set theme for buttons
primary100 = "#4e4f53";
primary80 = "#5e6066";
primary50 = "#787a7e";
secondary = "#ff9e0b";

fullText = ""

//array containing buttons and their properties
buttonsArr = [
{color:primary80,span:1,text:"",fontColor:"#fff",class:"empty",x:10,y:60,width:60,height:40, elPosW: 70,elPosH: 100},
{color:primary80,span:1,text:"",fontColor:"#fff",class:"empty",x:70,y:60,width:60,height:40, elPosW: 130, elPosH: 100},
{color:primary80,span:1,text:"AC",fontColor:"#fff",class:"clear",x:130,y:60,width:60,height:40, elPosW: 190, elPosH: 100},
{color:primary80,span:1,text:"%",fontColor:"#fff",class:"btn-number",x:190,y:60,width:60,height:40, elPosW: 250, elPosH: 100},
{color:secondary,span:1,text:"/",fontColor:"#fff",class:"btn-operator",x:250,y:60,width:60,height:40},

{color:primary80,span:1,text:"(",fontColor:"#fff",class:"btn-number",x:10,y:100,width:60,height:40},
{color:primary80,span:1,text:"7",fontColor:"#fff",class:"btn-number",x:70,y:100,width:60,height:40},
{color:primary80,span:1,text:"8",fontColor:"#fff",class:"btn-number",x:130,y:100,width:60,height:40},
{color:primary80,span:1,text:"9",fontColor:"#fff",class:"btn-number",x:190,y:100,width:60,height:40},
{color:secondary,span:1,text:"*",fontColor:"#fff",class:"btn-operator",x:250,y:100,width:60,height:40},

{color:primary80,span:1,text:")",fontColor:"#fff",class:"btn-number",x:10,y:140,width:60,height:40},
{color:primary80,span:1,text:"4",fontColor:"#fff",class:"btn-number",x:70,y:140,width:60,height:40},
{color:primary80,span:1,text:"5",fontColor:"#fff",class:"btn-number",x:130,y:140,width:60,height:40},
{color:primary80,span:1,text:"6",fontColor:"#fff",class:"btn-number",x:190,y:140,width:60,height:40},
{color:secondary,span:1,text:"-",fontColor:"#fff",class:"btn-operator",x:250,y:140,width:60,height:40},

{color:primary80,span:1,text:"Back",fontColor:"#fff",class:"back",x:10,y:180,width:60,height:40},
{color:primary80,span:1,text:"1",fontColor:"#fff",class:"btn-number",x:70,y:180,width:60,height:40},
{color:primary80,span:1,text:"2",fontColor:"#fff",class:"btn-number",x:130,y:180,width:60,height:40},
{color:primary80,span:1,text:"3",fontColor:"#fff",class:"btn-number",x:190,y:180,width:60,height:40},
{color:secondary,span:1,text:"+",fontColor:"#fff",class:"btn-operator",x:250,y:180,width:60,height:40},

{color:primary80,span:1,text:"0",fontColor:"#fff",class:"btn-number",x:10,y:220,width:180,height:40},
{color:primary80,span:1,text:".",fontColor:"#fff",class:"btn-number",x:190,y:220,width:60,height:40},
{color:secondary,span:1,text:"=",fontColor:"#fff",class:"equal",x:250,y:220,width:60,height:40},
]

  //append calculation to display
  const displayCalc = (text) => {
    // resetting the display element
    ctx.clearRect(10, 10, 301, 30);
    ctx.fillStyle = primary100;
    ctx.fillRect(10, 10, 301, 30);
    ctx.fillStyle = primary100; 
    ctx.fillText(fullText, 150, 30);
    fullText += text
    ctx.fillStyle = '#fff'; 
    ctx.fillText(fullText, 150, 30);

    // setting value to display element
    ctx.font = "15px Arial";
    ctx.fillStyle = "#fff";
    }


  const back = () => {
    //reseting the display element
    ctx.clearRect(10, 10, 301, 30);
    ctx.fillStyle = primary100;
    ctx.fillRect(10, 10, 301, 30);
    ctx.fillStyle = primary100; 
    ctx.fillText(fullText, 150, 30);
    //removing last string
    fullText = fullText.substring(0, fullText.length-1);
    ctx.fillStyle = '#fff'; 
    ctx.fillText(fullText, 150, 30);

    ctx.font = "15px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
  }
function clear(){
    //reseting the display element
    ctx.clearRect(10, 10, 301, 30);
    ctx.fillStyle = primary100;
    ctx.fillRect(10, 10, 301, 30);

    ctx.clearRect(110, 30, 301, 30);
    ctx.fillStyle = primary100;
    ctx.fillRect(10, 30, 301, 30);

    //emptying previous answers
    fullText = ""

}

  //loop through buttons array 
  buttonsArr.forEach(element => {
    ctx.fillStyle = element.color
    ctx.fillRect(element.x, element.y, element.width, element.height);

    //buttons style
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "black";
    ctx.strokeRect(element.x, element.y, element.width, element.height);
    ctx.font = "15px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(element.text, element.x + 30, element.y + 25) 

  });

  //element to display result
  ctx.fillStyle = primary100;
  ctx.fillRect(10, 10, 301, 30);
  //element to display calculations
  ctx.fillStyle = primary100;
  ctx.fillRect(10, 30, 301, 30);

  //get position of clicked item from canvas
  function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Filter clicked element
    const newArray = buttonsArr.filter(el => (
      x >= el.x &&
      x <= (el.x + el.width) && 
      y >= el.y && y <= (el.y + el.height)
    ));

    if (newArray[0]?.class === "btn-number" || newArray[0]?.class === "btn-operator") {
        displayCalc(newArray[0].text);
      } else if (newArray[0].class === "back") {
        back();
      } else if (newArray[0].class === "equal") {
        const result = evaluateExpression(fullText);
      } else if (newArray[0].class === "clear") {
        clear();
      }
  }

  canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
  })
// Setting canvas UI end

// Evaluate the expression in the display
const evaluateExpression = (exp) => {
  const expression = exp;

  // Check for invalid expressions
  if (!isValidExpression(expression)) {
    alert("Invalid Expression");
    return;
  }

  // Evaluate the expression
  const result = calculateExpression(expression);

  // Display the result
  ctx.clearRect(110, 30, 301, 30);
  ctx.fillStyle = primary100;
  ctx.fillRect(10, 30, 301, 30);

  let prevText = "";
  ctx.fillStyle = primary100;
  ctx.fillText(prevText, 150, 50);
  ctx.fillStyle = "#fff";
  ctx.fillText(result, 150, 50);
  ctx.font = "15px Arial";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
};

// Check if an expression is valid
const isValidExpression = (expression) => {
  try {
    calculateExpression(expression);
    return true;
  } catch (error) {
    return false;
  }
};
const outputQueue = [];
const operatorStack = [];
// Calculate the value of an expression
const calculateExpression = (expression) => {
  expression = expression.replace(/\s+/g, '');

      // Regular expression to match numbers (including decimals) and operators
      const regex = /(\d+(\.\d+)?)|([+\-*/%()])/g;
  
      // Convert the expression into an array of tokens
      const tokens = expression.match(regex);
  
      // Helper function to evaluate an expression inside parentheses
      const evaluateParentheses = (tokens) => {    
          let stack = [];
          let token = tokens.shift();
          while (token !== ')') { // looping until token is not equal to closing bracket
              if (token === '(') {
                  stack.push(evaluateParentheses(tokens));
              } else {
                  stack.push(token);
              }
              token = tokens.shift();
          }
          return evaluate(stack);
      }
  
      // Helper function to evaluate a sequence of tokens
      const evaluate = (tokens) => {
          l='';
          let stack = [];
          let operator = '+'; // deafult operator
          while (tokens.length > 0) { //looping until there are tokens
              let token = tokens.shift();
              if (token === '(') { // checking for opening paranthesis
                  stack.push(evaluateParentheses(tokens));
              } else if (/^[+\-*/%]$/.test(token)) { // checking for artimetic operators
                  operator = token; // is true, then that token will be assigned to operator
              } else {
                  let operand = parseFloat(token);
                  if (isNaN(operand)) {
                      throw new error ('Invalid token: ' + token);
                  }
                  // switch case to check for the cases of which operator 
                  switch (operator) {
                      case '+':
                          stack.push(operand);
                          break;
                      case '-':
                          stack.push(-operand);
                          break;
                      case '*':
                          stack.push(stack.pop() * operand);
                          break;
                      case '/':
                          stack.push(stack.pop() / operand);
                          break;
                      case '%': // Add support for the % operator
                          if (operand === 0) { // Check for 0 % operand
                              throw new error('Modulus by zero');
                          }
                          let dividend = stack.pop();
                          if (dividend === 0) { // Check for 0 % operand
                              stack.push(0);
                          } else if (dividend % operand === 0) { // Check for operand % 0
                              stack.push(0);
                          } else {
                              stack.push(dividend % operand);
                          }
                          break;
                    }
                    operator = '+';
                }
            }
            return stack.reduce((sum, value) => sum + value, 0);
        }
        // Evaluate the expression
        return evaluate(tokens);
};
