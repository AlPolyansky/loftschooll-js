/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */

function createDiv() {

    let div = document.createElement('div');

    const getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const randomColor = function() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    div.classList.add('draggable-div');
    div.style.position = 'absolute';
    div.style.width = `${getRandomInt(0, 500)}px`;
    div.style.height = `${getRandomInt(0, 500)}px`;
    div.style.backgroundColor = randomColor();
    div.style.top = `${getRandomInt(30, 500)}px`;
    div.style.left = `${getRandomInt(0, 500)}px`;
    div.style.cursor = 'pointer';
    div.setAttribute('draggable', 'true');

    return div;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners() {

    const getCoords = function(elem) { // кроме IE8-
        var box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };

    }


    const checkElement = function(event, className, cb) {
        if (event.target.classList.contains(className)) {
            return cb();
        }
    };

    document.addEventListener('dragstart', function(e) {
        checkElement(e, 'draggable-div', () => {

        })
    });

    document.addEventListener('dragend', function(e) {
        checkElement(e, 'draggable-div', () => {
            e.target.style.top = e.clientY + 'px';
            e.target.style.left = e.clientX + 'px';
        })
    });

}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function(e) {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners();
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};