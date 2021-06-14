const USD = 'usd';
const RUB = 'rub';

let busket = {
	goods: [
		{
			name: "IPhone12",
			price: 1000,
			currency: USD,
			count: 1,
			discount: 15
		},
		{
			name: "Macbook Air 13 M1",
			price: 85000,
			currency: RUB,
			count: 1,
			discount: 5
		}
	],	

	countBasketPrice(currency) {
		let totalPrice = 0;
		this.goods.forEach(function(good, index, array) {			
			totalPrice += countPrice(good, (good.currency == USD ? currency : 1));			
		});
		return totalPrice.toFixed(2);
	}
}

function countPrice(good, currency) {
	return currency * good.price * (1 - good.discount/100) * good.count;		;
};


/*************************
 * Currency converter
 * */
let converter = {			
	httpGet(fromCurrency, toCurrency)
	{		    	
		const theUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency}/${toCurrency}.json`		
		return new Promise((resolve, reject) => {
	    	const https = require('https');
			
			https.get(theUrl, (response) => {	    
			    let jsonText = '';		  		
				response.on('data', (chunk) => {
				    jsonText += chunk;
				});		  		
				response.on('end', () => {
				  	const jsonRes = JSON.parse(jsonText); 		  	
				  	resolve(jsonRes[toCurrency])
				});

			}).on("error", (error) => {
			    reject("Error currency request: " + error.message);
			});
		
		});
	}
}

function handleError(errMsg) {
	console.log(errMsg);
}

function handleSuccess(currency) {
	busketPrice = busket.countBasketPrice(currency);
	console.log(busketPrice, RUB)
}

function onClickAddToBusket() {	
	alert('busket', busketPrice)
}

function Main() {
	let resolve = converter.httpGet('usd', 'rub');
	resolve.then(handleSuccess, handleError);
}

Main();
