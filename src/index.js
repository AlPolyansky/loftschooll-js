/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
	for(let i = 0; i < array.length; i++){
		fn(array[i],i,array);
	}
}
 
/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
	let output = [];
	for(let i = 0; i < array.length; i++){
		output.push(fn(array[i],i,array));
	}
	return output;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {

	let i = initial ? 0 : 1;
	initial = initial || array[0];


	for(; i < array.length; i++){
		initial = fn(initial,array[i], i, array);
	}

	return initial;
}



/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
	delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
	return obj.hasOwnProperty(prop);
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
	let output = [];

	for(let prod in obj){
		output.push(prod);
	}

	return output;
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
	let output = [];

	for(let prod in obj){
		output.push(prod.toUpperCase());
	}

	return output;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {

	let output = [];


	from = from || 0;
	from = from < 0 ? array.length - Math.abs(from) : from;
	from = from < 0 ? 0 : from;

	to = to === undefined ? array.length : to;
	to = to < 0 ? array.length - Math.abs(to) : to;
	to = to < 0 ? 0 : to;														
	to = to > array.length ? array.length : to;


	for(; from < to; from++){
		output.push(array[from]);
	}

	return output;

}


/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
	let proxy = new Proxy(obj,{
		set(target,prop,value){
			target[prop] = value * value;
			return true;
		}
	});

	return proxy;
}


export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
