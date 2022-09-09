let board = [-1, -1, -1, -1] //记录每一行黑格的下标
let start = -1 //记录最后一行的下标位置，即黑格开始位置
let block
let time = 0.000//时间
let timeout //定时器
let first = 1 //判断是否第一次输入

$(function () {
    init()
})

function init() {
    $('.gameover').css('display','none')
    for (let i = 0; i < 4; i++) {
        let j = Math.floor(Math.random() * 3)
        while (i > 0 && board[i - 1] == j) {
            j = Math.floor(Math.random() * 3)
        }
        board[i] = j
        block = $('.grid-' + i + '-' + j)
        block.css('background-color', '#000')
        if (i == 3) {
            start = j
            let text = String.fromCharCode(74 + j)
            block.text('请按' + text + '开始')
        }
    }
}

function down() { //按键成功-》方格下移
    if(first){
        block.text('')
        timeRun()
        first = 0
    }
    for (let i = 3; i > 0; i--) {
        block = $('.grid-' + i + '-' + board[i])
        block.css('background-color', '#fff')
        board[i] = board[i - 1]
        block = $('.grid-' + i + '-' + board[i])
        block.css('background-color', '#000')
    }
    let j = Math.floor(Math.random() * 3)
    while (board[1] == j) {
        j = Math.floor(Math.random() * 3)
    }
    block = $('.grid-' + 0 + '-' + board[0])
    block.css('background-color', '#fff')
    board[0] = j
    block = $('.grid-' + 0 + '-' + board[0])
    block.css('background-color', '#000')
    start = board[3]
}

function timeRun(){
    time += 0.001
    $('.time').text(time.toString().slice(0,5))
    timeout = setTimeout(timeRun,1)
}

function end(){
    $('.gameover').css('display','block')
    clearTimeout(timeout)
    $(document).unbind('keydown')
}

$(document).keydown(function(e){
    switch (e.keyCode) {
        case 74:
            if (start == 0) down()
            else end()
            break;
        case 75:
            if (start == 1) down()
            else end()
            break;
        case 76:
            if (start == 2) down()
            else end()
            break;
    }
})