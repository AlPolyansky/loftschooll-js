/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 * 
 */


let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */



function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return response;
}

function loadTowns() {
    return fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
        .then(handleErrors)
        .then(function(res) {
            return res.json();
        })
        .then(function(arr) {
            return arr;
        })
        .catch(error => {
            throw new Error(error);
        });

}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    full = '' + full;
    chunk = '' + chunk;

    let a = '' + full.toLowerCase();
    let b = '' + chunk.toLowerCase();

    return a.indexOf(b) < 0 ? false : true;
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let reloadBlock = homeworkContainer.querySelector('#reload-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let townsPromise;

let allTowns;

townsPromise = loadTowns();

function addReloadButton() {
    reloadBlock.style.display = 'block';
    loadingBlock.style.display = 'none';

    let text = document.createElement('p');
    let button = document.createElement('button');

    text.innerHTML = 'Не удалось загрузить города';
    button.innerHTML = 'Повторить';

    reloadBlock.appendChild(text);
    reloadBlock.appendChild(button);

    button.addEventListener('click', function() {
        townsPromise = loadTowns();
    });
}



townsPromise
    .then(function(res) {
        allTowns = res;
        loadingBlock.style.display = 'none';
        filterBlock.style.display = 'block';
    })
    .catch(function(err) {
        console.log(err);
        addReloadButton();
    })




filterInput.addEventListener('keyup', function(e) {
    let val = e.target.value;

    while (filterResult.firstChild) {
        filterResult.removeChild(filterResult.firstChild);
    }

    if (!val.length) {
        return false;
    }

    allTowns.forEach(item => {
        if (isMatching(item.name, val)) {
            let div = document.createElement('div');

            div.innerHTML = item.name;
            filterResult.appendChild(div);
        }
    });

});

export {
    loadTowns,
    isMatching
};