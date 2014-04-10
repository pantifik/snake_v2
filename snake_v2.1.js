function gameStart(obj) {
    if (!obj) {
        var canvas = {
                id: "canvas",
                height: 405,
                width: 405,
                fieldHeight: 400,
                fieldWidth: 400
            },
            snake = {
                id: "canvas",
                color: "BlueViolet",
                timer: null,
                body: [
                    {x: 50, y: 200},
                    {x: 50, y: 210},
                    {x: 50, y: 220}
                ]
            },
            rabbit = {
                id: "canvas",
                color: "green",
                body: null
            };
    } else {
        canvas = obj[0];
        snake = obj[1];
        rabbit = obj[2];
    }

    var startObj = [canvas,snake,rabbit];

    //отрисовка статичных объектов
    (function (staticObj) {
        var cvs = document.getElementById(staticObj.id);
        var ctx = cvs.getContext('2d');
        cvs.height = staticObj.height;
        cvs.width = staticObj.width;
        ctx.strokeRect(1, 1, staticObj.fieldHeight, staticObj.fieldWidth);
    })(canvas);

    respRabbit(rabbit, snake);
    draw(snake);
    draw(rabbit);
    document.body.onkeydown = function(evt){
        if(evt.keyCode != snake.direction && evt.keyCode !=snake.blockKey){
            snake.direction = evt.keyCode;
            moveSnake(rabbit,snake,canvas,startObj);
        }
    }
}

function draw(drawObj) {
    var ctx = document.getElementById(drawObj.id).getContext('2d');
    ctx.fillStyle = drawObj.color || "black";
        if(drawObj.tail){
            ctx.clearRect(drawObj.tail.x, drawObj.tail.y, 9, 9);
        }
        for (var i = 0; i < drawObj.body.length; i++) {
            ctx.fillRect(drawObj.body[i].x, drawObj.body[i].y, 9, 9)
        }
}

function respRabbit(objRabbit,objSnake){
    var coorX = (Math.round(Math.random() * 29 + 10)) * 10;
    var coorY = (Math.round(Math.random() * 29 + 10)) * 10;
    for (var i = 0; i < objSnake.body.length; i++) {
        if(objSnake.body[i].x == coorX) {
            coorX = (Math.round(Math.random() * 29 + 10)) * 10;
        }
    }
    for (i = 0; i < objSnake.body.length; i++) {
        if(objSnake.body[i].y == coorY) {
            coorY = (Math.round(Math.random() * 29 + 10)) * 10;
        }
    }
    objRabbit.body =[{x : coorX, y : coorY}];
    draw(objRabbit);
}

function moveSnake(objRabbit,objSnake,objCanvas,startObj) {
    var moveUp = 38,
        moveDown = 40,
        moveLeft = 37,
        moveRight = 39,
        step = 10,
        head = objSnake.body[0],
        confines = {
            x: objCanvas.fieldHeight - step,
            y: objCanvas.fieldWidth - step
        };

    if (objSnake.direction == moveUp) {
        objSnake.blockKey = moveDown;
        objSnake.head = { x: head.x, y: head.y - step}
    }
    if (objSnake.direction == moveDown) {
        objSnake.blockKey = moveUp;
        objSnake.head = { x: head.x,
            y: head.y + step};
    }
    if (objSnake.direction == moveLeft) {
        objSnake.blockKey = moveRight;
        objSnake.head = { x: head.x - step,
            y: head.y};
    }
    if (objSnake.direction == moveRight) {
        objSnake.blockKey = moveLeft;
        objSnake.head = { x: head.x + step,
            y: head.y };
    }
    objSnake.body.unshift(objSnake.head);
    objSnake.tail = objSnake.body.pop();
    draw(objSnake);

    (function () {
        for (var i = 1; objSnake.body.length > i; i++) {
            if ((objSnake.body[i].x == objSnake.head.x) && (objSnake.body[i].y == objSnake.head.y)) {
                clearInterval(objSnake.timer);
                gameStart(startObj);
            }
        }
        if (objSnake.head.x > (confines.x) || objSnake.head.y > (confines.y) || objSnake.head.x < 0 || objSnake.head.y < 0) {
            return (function () {
                clearInterval(objSnake.timer);
                gameStart(startObj);
            })();
        }
    })();
    if (objSnake.head.x == objRabbit.body[0].x && objSnake.head.y == objRabbit.body[0].y) {
        objSnake.body.push(objRabbit.body[0]);
        respRabbit(objRabbit, objSnake);
    }

    if (!objSnake.timer) {
        startObj = [objCanvas, objSnake, objRabbit];
        objSnake.timer = setInterval(moveSnake, 100, objRabbit, objSnake, objCanvas);
    }
}
