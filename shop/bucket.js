const USD = 'usd';
const RUB = 'rub';

function convertCurrency(curr) {
	switch(curr) {
		case USD:
			return 71;
		case RUB:
		default:
			return 1;
	}
}

let product = {
	goods: [],	

	add(name, price, currency, discount) {
		let good = this.goods.find(good => good.name == name);
		if (good != null) {
			good.count += 1;
		}
		else {
			this.goods.push({
				name: name,
				price: price,
				discount: discount,
				currency: currency,	
			});
		}			
	},	
}

let busket = {
	goods: [],	

	addGood(name) {
		let good = this.goods.find(good => good.name == name);
		if (good != null) {
			good.count += 1;
		}
		else {
			this.goods.push({
				name: name,				
				count: 1,
			});
		}			
	},

	countBasketPrice() {
		let totalPrice = 0;		
		for (let i = 0; i < this.goods.length; ++i) {
			let busketItem = this.goods[i];
			let productItem = product.goods.find( (good) => {
				return good.name === busketItem.name;
			});
			totalPrice += countPrice(productItem, busketItem.count);
		}
		return totalPrice.toFixed(2);
	},

	goodsCount() {
		let count = 0;
		for (let i = 0; i < this.goods.length; ++i) {
			count += this.goods[i].count;
		}
		return count;
	}
};

function createBusketID(name) {
	return 'busket-item-' + name;
}


let form = {
	buildBusket() {	
		let busketNode = document.querySelector('.busket');
		busketNode.innerHTML = '';
		
		for (let i = 0; i < busket.goods.length; ++i) {
			let busketItem = busket.goods[i];
			let productItem = product.goods.find( (good) => {
				return good.name === busketItem.name;
			} );
			
			if (document.getElementById(createBusketID(busketItem.name)) != null)
				continue;

			let item = document.createElement('div');
			
			item.id = createBusketID(busketItem.name);
			item.className = 'busket-item'
			busketNode.appendChild(item);

			let itemName = document.createElement('p');
			itemName.innerText = busketItem.name;

			let itemCount = document.createElement('div');
			itemCount.className = 'busket-item-count';
			itemCount.innerText = busketItem.count;


			let itemPrice = document.createElement('p');
			itemPrice.innerText = productItem.price;
			itemPrice.className = 'busket-item-price';


			item.appendChild(itemName);
			item.appendChild(itemPrice);
			item.appendChild(itemCount);
		}
		
		let itemSum = document.querySelector('.busket-sum');
		
		if (busket.goodsCount() == 0) 
			itemSum.innerText = 'Корзина пуста'
		else 
			itemSum.innerText = 'Товаров ' + busket.goodsCount() + ' на сумму ' + busket.countBasketPrice();
	},

	buildProduct() {
		let productNode = document.querySelector('.product');
		productNode.innerHTML = '';
		
		for (let i = 0; i < product.goods.length; ++i) {
			let productItem = product.goods[i];
			
			let item = document.createElement('div');
						
			item.className = 'product-item';
			productNode.appendChild(item);

			let itemName = document.createElement('p');
			itemName.className = 'catalog-list-item-name';
			itemName.innerText = productItem.name;

			let itemPrice = document.createElement('p');
			itemPrice.className = 'catalog-item-price';
			itemPrice.innerText = productItem.price + ' ' + productItem.currency;			
			
			let itemImage = document.createElement('img');
			itemImage.className = 'catalog-item-image';
			itemImage.src = './img/' + productItem.name.replaceAll(' ', '-').toLowerCase() + '-min.jpg';			
			itemImage.alt = productItem.name;

			let itemButton = document.createElement('input');
			itemButton.className="button-buy";
			itemButton.type="button";
			itemButton.value="В корзину";	
			itemButton.addEventListener('click', onButtonBuyClick);

			item.appendChild(itemName);
			item.appendChild(itemPrice);
			item.appendChild(itemImage);
			item.appendChild(itemButton);

		}
	}
};


function countPrice(good, count) {
	return convertCurrency(good.currency) * good.price * (1 - good.discount/100) * count;
};


function onButtonBuyClick(event) {
	let item = this.parentNode;
	let name = item.querySelector('.catalog-list-item-name').innerText;	
	busket.addGood(name);
	form.buildBusket();
}



function Gen() {
	product.add('Macbook Air 13', 85000, RUB, 0);
	product.add('IPhone 12', 1000, USD, 15);
	product.add('Airpods', 20000, RUB, 20);	
	console.log(busket.goods.length);
	form.buildProduct();
	form.buildBusket();
}
