$(document).ready(function () {

    let winnerImage = ['0px 0px', '-100px 0px', '-200px 0px', '-300px 0px', '0px -100px ', '-100px -100px', '-200px -100px ', '-300px -100px ', '0px -200px', '-100px -200px ', '-200px -200px', '-300px -200px', '0px -300px', '-100px -300px', '-200px -300px', '-300px -300px'];

    random();
    implementPuzzle();

    let sec = 60;
    let min = 0;
    let timer;

    // Events

    $('#start-game').click(function () {
        sec = 60;
        min = 0;
        clearInterval(timer);
        timer = setInterval(startTimer, 1000);
        $('#check-result').prop("disabled", false);
        $('#start-game').prop("disabled", true);
    });

    $('#check-result').click(function () {
        clearInterval(timer);
        $('.modal').css('display', 'block');
        $('.message').html(`You still have time, you sure? 0${min}:${sec}`);
    });

    $('#new-game').click(function () {
        location.reload();
    });

    $('#close-btn').click(function () {
        clearInterval(timer);
        if (sec > 0) timer = setInterval(startTimer, 1000);
        $('.modal').css('display', 'none');
    });

    $('#check-btn').click(function () {
        clearInterval(timer);
        min = 0;
        sec = 60;
        checkPuzzle();
        $('.modal').css('display', 'block');
        $('#check-result').prop("disabled", true);
        $('#check-btn').css('display', 'none');
        $('#start-game').prop("disabled", false);
        $('#close-btn').css('display', 'none');
        $('#close-second-btn').css('display', 'block');
    });

    $('#close-second-btn').click(function() {
        clearInterval(timer);
        $('.modal').css('display', 'none');
        $('#start-game').prop("disabled", true);
    })

    //   Functions

    function random() { 
        let arrRandom = ['0px 0px', '-100px 0px', '-200px 0px', '-300px 0px', '0px -100px ', '-100px -100px', '-200px -100px ', '-300px -100px ', '0px -200px', '-100px -200px ', '-200px -200px', '-300px -200px', '0px -300px', '-100px -300px', '-200px -300px', '-300px -300px'];
        arrRandom = arrRandom.sort(() => Math.random() - 0.5);
        $('.puzzle').each(function (index, element) {
            $(this).css('background-position', arrRandom[index]);
        });
    };

    function implementPuzzle() {

        $('.puzzle').draggable({
            containment: '.puzzle-container',
            revert: 'invalid',
            start: function () {
                $('#check-result').prop("disabled", false);
                $('#start-game').prop("disabled", true);
                if ($(this).hasClass('dropped-puzzle')) {
                    $(this).removeClass('dropped-puzzle');
                    $(this).parent().removeClass('puzzle-present');
                }
            }
        });

        $('.box').droppable({
            hoverClass: 'hover',
            accept: function () {
                return !$(this).hasClass('puzzle-present')
            },
            over: function (event, ui) {
                if($('.second-block .dropped-puzzle').length < 1) {
                    clearInterval(timer);
                    timer = setInterval(startTimer, 1000);
                }
            },
            drop: function (event, ui) {
                let draggableElement = ui.draggable;
                let droppedOn = $(this);
                droppedOn.addClass('puzzle-present');
                $(draggableElement).addClass('dropped-puzzle');
                $(draggableElement).css({
                    top: 0,
                    left: 0,
                    position: 'relative'
                }).appendTo(droppedOn);
            },
        });
    };

    function checkPuzzle() {

        if ($('.second-block .dropped-puzzle').length != 16) {
            $('.message').html(`It's a pity, but you lost`);
            return false;
        } 
        for (let i = 0; i < 16; i++) {
            let item = $(`.second-block .dropped-puzzle:eq(${i})`).css('background-position');
            let order = winnerImage[i];
            if (item != order) {
                $('.message').html(`It's a pity, but you lost`);
                return false;
            } 
            $('.message').html(`Woohoo, well done, you did it!`);
            return true;
        };
    };

    function startTimer() {
        sec--;
        if (sec < 10) sec = '0' + sec;
        $('.min').text(`0${min}`);
        $('.sec').text(sec);
        if (sec < 1) {
            clearInterval(timer);
            $('.modal').css('display', 'block');
            $('.message').html(`It's a pity, but you lost`);
            $('#check-btn').css('display', 'none');
            $('#check-result').prop("disabled", true);
            $('#start-game').prop("disabled", true);
        }
        return sec;
    }

}) 