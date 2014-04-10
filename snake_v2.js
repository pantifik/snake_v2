function gameSnake(){
   /////////////////////////////////////////////////////////////////////////////////
    //////////////////////  переменные   ///////////////////////////////////////
    var canvas = {
        height : 405,
        width : 405,
        fieldHeight : 400,
        fieldWidth : 400
    };
    var snake = {
        color : "BlueViolet",
        timer : null,
        body : [
            {x : 50, y : 200},
            {x : 50, y : 210},
            {x : 50, y : 220}
        ],
        direction : null
    };
    var rabbit = {
        color : "green",
        body : null
    };


    /////////////////////////////////////////////////////////////////////////////////
    //////////////////// функции  ///////////////////////////////////////////////


    draw(canvas);
    draw(snake);
    respRabbit(snake);
    draw(rabbit);

    function draw(drawObj) {
        var cvs = document.getElementById('canvas');
        var ctx = cvs.getContext('2d');
        if (!drawObj.color){
            ctx.fillStyle = "black";
        }else{
            ctx.fillStyle = drawObj.color;
        }

        if (drawObj == canvas) {
            cvs.height = drawObj.height;
            cvs.width = drawObj.width;
            ctx.clearRect(0, 0, drawObj.height, drawObj.width );
            ctx.strokeRect(1, 1, drawObj.fieldHeight, drawObj.fieldWidth);
        } else {
            if(drawObj.tail){
                ctx.clearRect(drawObj.tail.x, drawObj.tail.y, 9, 9);
            }
            for (var i = 0; i < drawObj.body.length; i++) {
                ctx.fillRect(drawObj.body[i].x, drawObj.body[i].y, 9, 9)
            }
        }
    }

    function respRabbit(objSnake){
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
            return (function(){
                rabbit.body =[{x : coorX, y : coorY}];
                draw(rabbit);
                })();
    }

    function moveSnake(obj){
        var moveUp = 38;
        var moveDown = 40;
        var moveLeft = 37;
        var moveRight = 39;
        var step = 10;
        var head = obj.body[0];

        if (obj.direction == moveUp) {
            obj.blockKey = moveDown;
            obj.head = { x : head.x, y : head.y - step}
        }
        if (obj.direction == moveDown) {
            obj.blockKey = moveUp;
            obj.head =  { x : head.x,
                    y : head.y + step};
        }
        if (obj.direction == moveLeft) {
            obj.blockKey = moveRight;
            obj.head =  { x : head.x - step,
                y : head.y};
        }
        if (obj.direction == moveRight) {
            obj.blockKey = moveLeft;
            obj.head =  { x : head.x + step,
                y : head.y };
        }
        obj.body.unshift(obj.head);
        obj.tail = obj.body.pop();
        draw(obj);

        (function() {
            for (var i = 1; obj.body.length > i; i++) {
                if ((obj.body[i].x == obj.head.x) && (obj.body[i].y == obj.head.y)) {
                    return (function(){
                        clearInterval(obj.timer);
                        gameSnake();
                    })();
                }
            }
            if (obj.head.x > (canvas.fieldWidth - step) || obj.head.y > (canvas.fieldWidth - step) || obj.head.x < 0 || obj.head.y < 0) {
                return (function(){
                    clearInterval(obj.timer);
                    gameSnake();
                })();
            }
        })();
        if (obj.head.x == rabbit.body[0].x && obj.head.y == rabbit.body[0].y){
            obj.body.push(rabbit.body[0]);
            respRabbit(snake);
        }

        if (!obj.timer) {
            obj.timer = setInterval(moveSnake, 100, obj);
        }
    }

    document.body.onkeydown = function(evt){
        if(evt.keyCode != snake.direction && evt.keyCode !=snake.blockKey){
            snake.direction = evt.keyCode;
            moveSnake(snake);
        }
    }
}