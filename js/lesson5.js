// Array.from(document.getElementByClassName(''))
// document.getElementByTagName
/*
document.querySelector('.testClass:last-child')

tag.textContent
tag.innerText
tag.innerHTML
getComputedStyle(tag)

classList
	add
	remove
	toggle
	contains

let mydiv = document.createElement('div');
let i = document.createElement('i');
i.textContent =  'Hello';
myDiv.appendChild(i);
document.body.appendChild(myDiv)
document.body.insertAdjacentHTML('beforebegin', '<div><i>Hello</i></div>');

addEventListener
*/

const settings = {
	rowCount: 8,
	colCount: 8,
	color1: 'black',
	color2: 'white',	
}

let board = {
	settings,
	document,

	initBoard() {
		//let rootNode = document.querySelector('.board');
		let rootNode = document.getElementsByClassName('board')[0];
		console.log(rootNode);
		let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
		for (let row = 0; row < settings.rowCount; ++row) {
			let tr = document.createElement('tr');
			
			rootNode.appendChild(tr);
			console.log('tr', tr)
			for (let col = 0; col < settings.colCount; ++col) {
				let td = document.createElement('td');						
				td.innerText += letters[row] + col;				
				td.style.backgroundColor = (row % 2 ? (col % 2 ? settings.color1 : settings.color2) : (col % 2 ? settings.color2 : settings.color1));
				td.style.color = td.style.backgroundColor;				
				tr.appendChild(td);		
			}	
		}
		
	}
}

function Main(event) {
	console.log('main')	
	board.initBoard();	
}

document.addEventListener('load', Main(event));