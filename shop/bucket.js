const NAME = 0;
const PRICE = 1;
const COUNT = 2;
const DISCOUNT = 3;
	
let g_busket = [
	["Apple", 20, 3, 15],
	["Potato", 10, 20, 30],
	["Watermelon", 100, 1, 0]
];

function countPrice(good) {
	return good[PRICE] * (1 - good[DISCOUNT]/100) * good[COUNT];
}

function printGood(index, good) {
	console.log(index + ")", good[NAME], "Price:", good[PRICE], "Count:", good[COUNT], "Discount", good[DISCOUNT]);
}

function printBasket(busket) {	
	busket.forEach(function(good, index, array) {
		printGood(index, good);
	});
}

function countBasketPrice(busket) {
	let totalPrice = 0;

	busket.forEach(function(good, index, array) {

		totalPrice += countPrice(good);
	});
	return totalPrice;
}

printBasket(g_busket);
console.log("Total price:", countBasketPrice(g_busket));