/* ДЗ 2 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isAllTrue(array, fn) {

	if(!Array.isArray(array)){
		throw new Error('empty array');
	}

	if(!array.length){
		throw new Error('empty array');
	}

	if(typeof fn !== 'function'){
		throw new Error('fn is not a function');
	}

	let flag = true;
	for(let i = 0; i < array.length; i++){
		if(!fn(array[i])){
			flag = false;
		};
	}

	return flag;
}

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {

	if(!Array.isArray(array)){
		throw new Error('empty array');
	}

	if(!array.length){
		throw new Error('empty array');
	}

	if(typeof fn !== 'function'){
		throw new Error('fn is not a function');
	}

	let flag = false;
	for(let i = 0; i < array.length; i++){
		if(fn(array[i])) flag = true;
	}

	return flag;
}

isSomeTrue([1,2,3],function(item){
	return false;
})



/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn) {

	let args = arguments;
	let exc = [];

	if(typeof args[0] !== 'function'){
			throw new Error('fn is not a function');
	}

	
	if(args.length === 1){
		return [];
	}


	for(let i = 1; i < args.length; i++){
			try{
				fn(args[i]);
			}
			catch(e){
				exc.push(args[i]);
			}
	}
	
	return exc;
	
}



/*
 Задача 4:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(num = 0) {

	let result = num;

	if(typeof num !== 'number'){
		throw new Error('number is not a number');
	}

	let loop = function(param,cb){
		for(let i = 0; i < param.length; i++){
			cb(param[i]);
		}
	}

	return {
		sum(){
			loop(arguments, item => {
				result = result + item;
			});
			return result;
		},
		dif(){
			loop(arguments, item => {
				result = result - item;
			});
			return result;
		},
		div(){
			loop(arguments, item => {
				if(result === 0 || item === 0){
					throw new Error('division by 0');
				}
				result = result / item;
			});
			return result;
		},
		mul(){
			loop(arguments, item => {
				result = result * item;
			});
			return result;
		}
	}

}

var calc = calculator(10);

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};
