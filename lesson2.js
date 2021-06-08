
//1 task

console.log("++val - Префиксный инкремент (сначала инкремент затем возврат)\nval++ - Постфиксный инкремент(сначала возврат затем инкремент) ");

//2 task

var a = 2;
var x = 1 + (a *= 2);
console.log(x + " - Потому что сначала обработается a*=2, так как в скобках, затем прибавится 1")

//3 task

function script(a,b) {
	if (a >= 0 && b >= 0)
		return a - b;
	else if (a < 0 && b < 0)
		return a * b;
	else 
		return a + b;
}

console.log("input(1,2):" + script(1,2) + " ; input(-1, -2):" + script(-1, -2) + " ; input(1,-1):" + script(1,-1))

//4 task

function switchMadness(val) {
	switch (val) {
		case 0: console.log(val++);
		case 1: console.log(val++);
		case 2: console.log(val++);
		case 3: console.log(val++);
		case 4: console.log(val++);
		case 5: console.log(val++);
		case 6: console.log(val++);
		case 7: console.log(val++);
		case 8: console.log(val++);
		case 9: console.log(val++);
		case 10:console.log(val++);
		case 11:console.log(val++);
		case 12:console.log(val++);
		case 13:console.log(val++);
		case 14:console.log(val++);
		case 15:console.log(val++);
	}
}

let i = 3;
switchMadness(i)

//5 task

function plus(a,b) {
	return a + b;
}
function minus(a,b) {
	return a - b;
}
function mul(a,b) {
	return a * b;
}
function div(a,b) {
	return a / b;
}

console.log("1+1=" + plus(1,1) + "; 2-1=" + minus(2,1) + "; 3*3=" + mul(3,3) + "; 9/3" + div(9,3));

//6 task

function mathOperation(arg1, arg2, operation) {
	switch(operation){ 
	case '+':
	return plus(arg1, arg2);
	case '-':
	return minus(arg1, arg2);
	case '*':
	return mul(arg1, arg2);
	case '/':
	return div(arg1, arg2);
	}
	return null;
}

console.log("passing 10,2,'/' returns " + mathOperation(10,2,'/') + "; passing 2,2,'lol unknown' returns " + mathOperation(2,2,'lol unknown'))

//7 task

console.log("0==null - " + (0 == null) + "; 0 === null - " + (0 === null) + " : Because 0 is integer value and null is especial state of object");

//8 task

function _power(val, pow, res) {	
	if (pow == 0)
		return res;
	else if(pow > 0) {
		return _power(val, --pow, res*val)
	}
	else {		
		return _power(val, ++pow, res.toFixed(4) / val.toFixed(4))	
	}
}

function power(val, pow) {
	let res = 1;
	return _power(val, pow, res)
}

console.log("2^8=" + power(2,8) + "; 10^0=" + power(10,0) + "; 10^-3=" + power(10,-3));