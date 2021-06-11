let tempC = 36.6

function celcToFarengate(tempC) {
	return (9/5) * tempC + 32;
}

tempF = celcToFarengate(tempC);
console.log("Farengate temp: " + tempF);

alert(tempF);


//////////////////////////////////////////////

let admin, name;
name = "Василий";
admin = name;

console.log("Admin name: " + admin);

//////////////////////////////////////////////

console.log("1000+\"108\" = " + (1000 + "108"))

//////////////////////////////////////////////

console.log("defer vs async: both attrs load html and js code in parallel but defer waits for fully loaded html, which the async does not");