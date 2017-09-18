/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

let _data = {
    cookies: [],
};

// Функция получает и возвращает массив с куками
function getCookies() {
    if (!document.cookie) {
        return [];
    }

    return document.cookie.split('; ').map(item => {
        let cookieParam = item.split('=');

        return {
            name: cookieParam[0],
            value: cookieParam[1]
        }
    });
}

// Функция добавляет куку
function addCookie(params) {
    let cookieName = params.cookieName;
    let cookieVal = params.cookieValue;
    let replace = false;

    function setCookie() {
        document.cookie = `${cookieName}=${cookieVal}`;
        _data.cookies.push({
            name: cookieName,
            value: cookieVal
        });
    }



    if (!_data.cookies.length) {
        setCookie();
    } else {

        let filtered = _data.cookies.filter(item => {
            return item.name === cookieName;
        })

        if (filtered.length) {
            document.cookie = `${cookieName}=${cookieVal}`;
            filtered[0].value = cookieVal;
            replace = true;
        } else {
            setCookie();
        }
    }


    return replace ? 'replace' : 'add';

}

// Функция находит подстроку в строке, возращает true или false
function isMatching(full, chunk) {
    full = '' + full;
    chunk = '' + chunk;

    let a = '' + full.toLowerCase();
    let b = '' + chunk.toLowerCase();

    return a.indexOf(b) < 0 ? false : true;
}

// Фильтрует куки по имени
function cookieFilter(val) {
    return _data.cookies.filter(item => {
        return isMatching(item.name, val);
    });
};

// Функция добавляет ряд в таблицу
function addTableRow(params) {
    params.parent = params.parent || listTable;
    params.cookieName = params.cookieName || '';
    params.cookieValue = params.cookieValue || '';

    let tr = document.createElement('tr');
    let thFirst = document.createElement('th');
    let thMiddle = document.createElement('th');
    let thLast = document.createElement('th');
    let button = document.createElement('button');

    button.innerHTML = 'Удалить';
    button.setAttribute('data-delete', params.cookieName);

    thFirst.innerHTML = params.cookieName;
    thMiddle.innerHTML = params.cookieValue;
    thLast.appendChild(button);

    params.parent.appendChild(tr);
    tr.appendChild(thFirst);
    tr.appendChild(thMiddle);
    tr.appendChild(thLast);
}


// Удаляет куку
function removeCookie(cookieName) {
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// Фунция очищает таблицу
function clearTable() {
    while (listTable.firstChild) {
        listTable.removeChild(listTable.firstChild);
    }
}

// Инициализируем таблицу
function initTable(arr) {
    arr = arr || _data.cookies;

    arr.forEach(item => addTableRow({
        cookieName: item.name,
        cookieValue: item.value,
    }));
}

// Слушатель фильтра
let flag = false;

filterNameInput.addEventListener('keyup', function(e) {
    let eValue = e.target.value;

    if (eValue) {
        flag = true;
        clearTable();
        initTable(cookieFilter(eValue));
    } else {
        if (flag) {
            flag = false;
            clearTable();
            initTable();

        }

    }
});


// Слушатель добавляения куки
addButton.addEventListener('click', (e) => {


    let inputName = addNameInput.value.trim();
    let inputVal = addValueInput.value.trim();

    if (!inputName && !inputVal) {
        return false;
    }

    let cookieType = addCookie({
        cookieName: inputName,
        cookieValue: inputVal
    });



    if (cookieType === 'add') {
        addTableRow({
            cookieName: inputName,
            cookieValue: inputVal
        })
    }

    if (cookieType === 'replace') {
        [...document.querySelectorAll('tbody th')].forEach(item => {
            if (item.innerHTML === inputName) {
                item.nextSibling.innerHTML = inputVal;
            }
        });
    }



    addNameInput.value = '';
    addValueInput.value = '';
});


// Слушатель клика куки

document.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-delete')) {
        let cookieName = e.target.getAttribute('data-delete');

        listTable.removeChild(e.target.parentNode.parentNode);
        removeCookie(cookieName);
        _data.cookies = _data.cookies.filter(item => {
            return item.name !== cookieName;
        })
    }

    if (e.target.getAttribute('id') === 'add-button') {

    }

});

(function initModule() {
    _data.cookies = getCookies();
    initTable();
})();