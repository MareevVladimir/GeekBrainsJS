//С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
{
	function isSimple(number) {
		for (let i = 0; i < number; ++i) {
			if (i != 1 && number % i === 0) {
				return false;
			}
		}
		return true;
	}

	let i = 0;
	while(i <= 100) {
		if (isSimple(i))			
			console.log(i);
		++i;
	}	
	
}


/*
Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла. Выглядеть это должно так:
for(…){// здесь пусто}
*/
{
	let arr = [9,8,7,6,5,4,3,2,1,0];
	for(;arr.length != 0 ;console.log(arr.pop())){}
}


/*
Нарисовать пирамиду с помощью console.log, как показано на рисунке, только у вашей пирамиды должно быть 20 рядов, а не 5:
*/
{
	const symbol = 'x';
	const height = 20;
	let arr = [];
	for (let i = 0; i < height; ++i) {
		arr.push(symbol);
		console.log(arr);
	}
}