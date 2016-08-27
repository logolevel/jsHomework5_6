(function() {
//находим наши кнопки и поле вывода секундомера
var timerOutput = document.getElementById('timer');
var btnStart = document.getElementById('start');
var btnStop = document.getElementById('stop');
var btnSplit = document.getElementById('split');
var btnClearSplit = document.getElementById('clear_split');
//функция старт
function startCount() {
    id = setInterval(function() {
        timer.innerHTML = count();
    }, 1);
//удаляем событие запуска и добавляем паузу
    btnStart.removeEventListener('click', startCount);
    btnStart.innerHTML = 'Pause';
    btnStart.style.backgroundColor = '#f0ad4e';
    btnStart.style.borderColor = '#eea236';
    btnStart.addEventListener('click', pauseCount);
    btnSplit.style.display = 'inline-block';
    btnStop.style.display = 'inline-block';
}
//функция паузы, она же ф-ия продолжения
function pauseCount() {
    clearInterval(id);
    btnStart.innerHTML = 'Resume';
    btnStart.style.backgroundColor = '#5cb85c';
    btnStart.style.borderColor = '#4cae4c';
    btnStart.addEventListener('click', startCount);
}
//функция остановки секундомера
function stopCount() {
    clearInterval(id);
    timer.innerHTML = '00:00:00.000';
    hs = mts = ss = ms = msOutput = 0;
    date = new Date(0,0);
    btnStart.innerHTML = 'Start';
    btnStart.addEventListener('click', startCount);
    btnSplit.style.display = 'none';
    btnStop.style.display = 'none';
    btnStart.style.backgroundColor = '#5cb85c';
    btnStart.style.borderColor = '#4cae4c';
}
//функция сохранения интервала
function splitCount() {
    var newLi = document.createElement('li');
    newLi.innerHTML = count();
    split_list.appendChild(newLi);
    btnClearSplit.style.display = 'inline-block';
}
//функция очистки всех интервалов
//удаляем все элементы списка
function clearSplitCount() {
    var delLi = document.getElementById('split_list');
    while (delLi.firstChild) {
        delLi.removeChild(delLi.firstChild);
    }
    btnClearSplit.style.display = 'none';
}
//вешаем события на кнопки
btnStart.addEventListener('click', startCount)
btnStop.addEventListener('click', stopCount)
btnSplit.addEventListener('click', splitCount)
btnClearSplit.addEventListener('click', clearSplitCount)
//объявляем переменные
var id;
var hs = mts = ss = ms = msOutput = 0;
var date = new Date(0,0);
//Главная функция
function count() {
//ПОДСКАЗАЛИ ДОБРЫЕ ЛЮДИ, Я НЕ ЗНАЮ ПОЧЕМУ +4
//И НЕ ЗНАЮ ПОЧЕМУ ДО 996ms, НО ЧТОБЫ УСКОРИТЬ
//СЧЁТЧИК ЭТО СРАБОТАЛО
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
date.setMilliseconds(date.getMilliseconds() +4);
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//НЕПОНЯТНАЯ МНЕ МАГИЧЕСКАЯ СТРОЧКА ЗАКОНЧИЛИСЬ
var ms = date.getMilliseconds();
//условия для миллисекунд
if ( ms == 996 ) {
    ms = 0;
    msOutput = '000';
    ++ss;
}
if ( ms < 999 ) {
    ms++;
    msOutput = ms;
}
if ( ms < 100 ) {
    ms++;
    msOutput = '0' + ms;
}
if ( ms < 10 ) {
    ms++;
    msOutput = '00' + ms;
}
//условия для секунд и минут
if (ss >= 60) {
    ss = 0;
    ++mts;
}
if ( ss < 10 ) {
    ss = '0' + Number(ss);
}
if ( mts < 10 ) {
    mts = '0' + Number(mts);
}
//условие для часов
if ( hs < 10 ) {
    hs = '0' + Number(hs);
}
return hs + ':' +  mts + ':' + ss + '.' +  msOutput;  
}//end count

})();

