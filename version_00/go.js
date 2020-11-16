window.addEventListener('DOMContentLoaded', function (event) {
    console.log('DOM fully loaded and parsed');
    drawLine();
    drawPanel();
    nextChange();
});

var current = 'black';
var pointers = [];
var counter = 1;
var isShowCount = false;

function drawLine() {
    console.log("drawPanel....");
    var area = document.getElementById("panel-line");
    var pointertable = document.createElement('table');
    for (var i = 0; i < 18; i++) {
        var line = document.createElement('tr');
        line.className = 'line';
        for (var j = 0; j < 18; j++) {
            var pointer = document.createElement('td');
            pointer.className = 'pointer';
            line.appendChild(pointer);
        }
        pointertable.appendChild(line);
    }
    area.appendChild(pointertable);
}

function drawPanel() {
    console.log("drawPanel....");
    var area = document.getElementById("panel-pointer");
    var pointertable = document.createElement('table');
    for (var i = 0; i < 19; i++) {
        var line = document.createElement('tr');
        line.className = 'line';
        for (var j = 0; j < 19; j++) {
            var pointer = document.createElement('td');
            pointer.className = 'pointer';
            pointer.dataset.rowNum = i;
            pointer.dataset.colNum = j;
            pointer.addEventListener('click', onClickPointer);
            if ((i == 3 || i == 9 || i == 15) && (j == 3 || j == 9 || j == 15)) {
                pointer.innerHTML = '<div class="dot"></div>';
            }
            line.appendChild(pointer);
        }
        pointertable.appendChild(line);
    }
    area.appendChild(pointertable);
}

function onClickPointer() {
    this.innerHTML = '';
    if (this.childElementCount) {

    } else {
        var stone = document.createElement('div');
        this.dataset.stone = current;
        this.dataset.counter = counter;
        if (isShowCount) {
            stone.innerHTML = counter;
        }

        if (current == 'black') {
            stone.classList.add('stone');
            stone.classList.add('black');
            current = 'white';
        } else {
            stone.classList.add('stone');
            stone.classList.add('white');
            current = 'black';
        }
        this.appendChild(stone);
        pointers.push({
            counter: counter++,
            row: this.dataset.rowNum,
            col: this.dataset.colNum,
            stone: this.dataset.stone
        });
        nextChange();
        console.log(pointers);
    }
}

function nextChange(color) {
    var currentPanel = document.getElementById('current');
    if (current == 'black') {
        currentPanel.classList.remove('white');
        currentPanel.classList.add('stone','black');
    } else {
        currentPanel.classList.remove('black');
        currentPanel.classList.add('stone','white');
    }
}

function showCounter() {
    var pPointer = document.getElementById('panel-pointer');
    var pointers = pPointer.getElementsByClassName('pointer');
    console.log('Pointers', pointers);
    console.log('Pointers Length', pointers.length);
    var btn = document.getElementById('btncounter');
    if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        isShowCount = false;
        for (var i = 0; i < pointers.length; i++) {
            var pointer = pointers[i];
            if (pointer.childNodes.length != 0) {
                var stone = pointer.querySelector('div.stone');
                if (stone) {
                    stone.innerHTML = '';
                }
            }
        }
    } else {
        btn.classList.add('active');
        isShowCount = true;
        for (var i = 0; i < pointers.length; i++) {
            var pointer = pointers[i];
            var cnt = pointer.dataset.counter;
            if (pointer.childNodes.length != 0) {
                var stone = pointer.querySelector('div.stone');
                if (stone) {
                    stone.innerHTML = cnt;
                }
            }
        }
    }
}

function clearPanel() {
    if(confirm('Are you sure Reload Panel?')){
        window.location.reload();
    }
}