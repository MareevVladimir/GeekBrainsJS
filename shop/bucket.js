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

	add(name, price, currency, discount, viewCount) {
		let good = this.goods.find((good) => { return good.name == name; });
		if (good != null) {
			good.count += 1;
		}
		else {
			this.goods.push({
				name: name,
				price: price,
				discount: discount,
				currency: currency,
				viewCount: viewCount
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
			

			let divItemImage = document.createElement('div');
			divItemImage.className = 'catalog-item-image';
			for (let imgIndex = 0; imgIndex < productItem.viewCount; ++imgIndex) {
				let itemImage = document.createElement('img');
				//itemImage.className = 'catalog-item-image';

				itemImage.src = './img/' + productItem.name.replaceAll(' ', '-').toLowerCase() + '-min.jpg';				
				itemImage.dataset.full_image_url = './img/' + productItem.name.replaceAll(' ', '-').toLowerCase() + `-max-${imgIndex + 1}.jpg`;
				if (imgIndex){
					itemImage.style.visibility='hidden';
					itemImage.style.width = 0;
				}
				divItemImage.appendChild(itemImage);
				itemImage.alt = productItem.name;
			}
			

			let itemButton = document.createElement('input');
			itemButton.className="button-buy";
			itemButton.type="button";
			itemButton.value="В корзину";	
			itemButton.addEventListener('click', onButtonBuyClick);

			item.appendChild(itemName);
			item.appendChild(itemPrice);
			item.appendChild(divItemImage);
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

const gallery = {
  openedImageEl: null,

  settings: {
    previewSelector: '.mySuperGallery',
    openedImageWrapperClass: 'galleryWrapper',
    openedImageClass: 'galleryWrapper__image',
    openedImageScreenClass: 'galleryWrapper__screen',
    openedImageCloseBtnClass: 'galleryWrapper__close',
    openedImageCloseBtnSrc: 'img/gallery/close.png',
    openedImageNextBtnSrc: 'img/gallery/next.png',
    openedImageNextBtnClass: 'galleryWrapper__next',
    openedImageBackBtnSrc: 'img/gallery/prev.png',
    openedImageBackBtnClass: 'galleryWrapper__back',
    imageNotFoundSrc: 'img/gallery/not_found.png',
  },

  /**
   * Инициализирует галерею, ставит обработчик события.
   * @param {Object} settings Объект настроек для галереи.
   */
  init(settings) {
    // Записываем настройки, которые передал пользователь в наши настройки.
    this.settings = Object.assign(this.settings, settings);

    // Находим элемент, где будут превью картинок и ставим обработчик на этот элемент,
    // при клике на этот элемент вызовем функцию containerClickHandler в нашем объекте
    // gallery и передадим туда событие MouseEvent, которое случилось.
    let sels = document
      .querySelectorAll(this.settings.previewSelector);

    for (sel of sels) {
       sel.addEventListener('click', event => this.containerClickHandler(event));
  	}
    
  },

  /**
   * Обработчик события клика для открытия картинки.
   * @param {MouseEvent} event Событие клики мышью.
   * @param {HTMLElement} event.target Событие клики мышью.
   */
  containerClickHandler(event) {
    // Если целевой тег не был картинкой, то ничего не делаем, просто завершаем функцию.
    
    if (event.target.tagName !== 'IMG') {
      return;
    }

    // Записываем текущую картинку, которую хотим открыть.
    this.openedImageEl = event.target;
    console.log(this.openedImageEl)

    // Открываем картинку.
    this.openImage(event.target.dataset.full_image_url);
  },

  /**
   * Открывает картинку.
   * @param {string} src Ссылка на картинку, которую надо открыть.
   */
  openImage(src) {
    // Пробуем загрузить картинку, если картинка загружена - показываем картинку с полученным из
    // целевого тега (data-full_image_url аттрибут), если картинка не загрузилась - показываем картинку-заглушку.
    // Получаем контейнер для открытой картинки, в нем находим тег img и ставим ему нужный src.
    
    console.log(src);
    const openedImageEl = this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`);
    const img = new Image();
    img.onload = () => openedImageEl.src = src;
    img.onerror = () => openedImageEl.src = this.settings.imageNotFoundSrc;
    img.src = src;
  },

  /**
   * Возвращает контейнер для открытой картинки, либо создает такой контейнер, если его еще нет.
   * @returns {Element}
   */
  getScreenContainer() {
    // Получаем контейнер для открытой картинки.
    const galleryWrapperElement = document.querySelector(`.${this.settings.openedImageWrapperClass}`);
    // Если контейнер для открытой картинки существует - возвращаем его.
    if (galleryWrapperElement) {
      return galleryWrapperElement;
    }

    // Возвращаем полученный из метода createScreenContainer контейнер.
    return this.createScreenContainer();
  },

  /**
   * Создает контейнер для открытой картинки.
   * @returns {HTMLElement}
   */
  createScreenContainer() {
    // Создаем сам контейнер-обертку и ставим ему класс.
    const galleryWrapperElement = document.createElement('div');
    galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

    // Добавляем кнопку назад.
    const backBtn = new Image();
    backBtn.classList.add(this.settings.openedImageBackBtnClass);
    backBtn.src = this.settings.openedImageBackBtnSrc;
    galleryWrapperElement.appendChild(backBtn);

    // Добавляем обработчик события при клике, ставим новую открытую картинку и открываем ее.
    backBtn.addEventListener('click', () => {
      this.openedImageEl = this.getPrevImage();
      this.openImage(this.openedImageEl.dataset.full_image_url);
    });

    // Добавляем кнопку вперед.
    const nextBtn = new Image();
    nextBtn.classList.add(this.settings.openedImageNextBtnClass);
    nextBtn.src = this.settings.openedImageNextBtnSrc;
    galleryWrapperElement.appendChild(nextBtn);

    // Добавляем обработчик события при клике, ставим новую открытую картинку и открываем ее.
    nextBtn.addEventListener('click', () => {
      this.openedImageEl = this.getNextImage();
      this.openImage(this.openedImageEl.dataset.full_image_url);
    });

    // Создаем контейнер занавеса, ставим ему класс и добавляем в контейнер-обертку.
    const galleryScreenElement = document.createElement('div');
    galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
    galleryWrapperElement.appendChild(galleryScreenElement);

    // Создаем картинку для кнопки закрыть, ставим класс, src и добавляем ее в контейнер-обертку.
    const closeImageElement = new Image();
    closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
    closeImageElement.src = this.settings.openedImageCloseBtnSrc;
    closeImageElement.addEventListener('click', () => this.close());
    galleryWrapperElement.appendChild(closeImageElement);

    // Создаем картинку, которую хотим открыть, ставим класс и добавляем ее в контейнер-обертку.
    const image = new Image();
    image.classList.add(this.settings.openedImageClass);
    galleryWrapperElement.appendChild(image);

    // Добавляем контейнер-обертку в тег body.
    document.body.appendChild(galleryWrapperElement);

    // Возвращаем добавленный в body элемент, наш контейнер-обертку.
    return galleryWrapperElement;
  },

  /**
   * Возвращает следующий элемент (картинку) от открытой или первую картинку в контейнере,
   * если текущая открытая картинка последняя.
   * @returns {Element} Следующую картинку от текущей открытой.
   */
  getNextImage() {
    // Получаем элемент справа от текущей открытой картинки.
    const nextSibling = this.openedImageEl.nextElementSibling;
    // Если элемент справа есть, его отдаем, если нет, то берем первый элемент в родительском контейнере.
    return nextSibling ? nextSibling : this.openedImageEl.parentElement.firstElementChild;
  },

  /**
   * Возвращает предыдущий элемент (картинку) от открытой или последнюю картинку в контейнере,
   * если текущая открытая картинка первая.
   * @returns {Element} Предыдущую картинку от текущей открытой.
   */
  getPrevImage() {
    // Получаем элемент слева от текущей открытой картинки.
    const prevSibling = this.openedImageEl.previousElementSibling;
    // Если элемент слева есть, его отдаем, если нет, то берем последний элемент в родительском контейнере.
    if (prevSibling) {
      return prevSibling;
    } else {
      return this.openedImageEl.parentElement.lastElementChild;
    }
  },

  /**
   * Закрывает (удаляет) контейнер для открытой картинки.
   */
  close() {
    document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
  }
};

function Gen() {
	product.add('Macbook Air 13', 85000, RUB, 0, 3);
	product.add('IPhone 12', 1000, USD, 15, 3);
	product.add('Airpods', 20000, RUB, 20, 2);	
	console.log(busket.goods.length);
	form.buildProduct();
	form.buildBusket();
	gallery.init({previewSelector: '.catalog-item-image'});
}
