let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mouse = {
    x: undefined,
    y: undefined
};
window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener("resize", function () {  //Resize canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    rectangle.X = innerWidth / 2;
    rectangle.Y = innerHeight / 2;
});

function isColliding(rect1, rect2) {
    return rect1.X < rect2.X + rect2.BigRectWidth &&
           rect1.X + rect1.BigRectWidth > rect2.X &&
           rect1.Y < rect2.Y + rect2.BigRectHeight &&
           rect1.Y + rect1.BigRectHeight > rect2.Y;
}

function Rectangle() {
    let obj = {};   // All properties and methods are stored in it

    obj.BigRectWidth = 150;
    obj.BigRectHeight = 150;
    obj.SmallRectWidth = 150;
    obj.SmallRectHeight = 150;
    obj.X = (innerWidth / 2) - (obj.BigRectWidth / 2);
    obj.Y = (innerHeight / 2) - (obj.BigRectHeight / 2);

    obj.draw = () => {
        // Draw the big rectangle
        c.fillStyle = "black";
        c.fillRect(obj.X, obj.Y, obj.BigRectWidth, obj.BigRectHeight);
    
        // Draw the non-colliding portion of the small rectangle in red
        let hoverRectX = mouse.x - obj.SmallRectWidth / 2;
        let hoverRectY = mouse.y - obj.SmallRectHeight / 2;
        c.fillStyle = "red";
        c.fillRect(hoverRectX, hoverRectY, obj.SmallRectWidth, obj.SmallRectHeight);
    
        // If colliding, draw the colliding portion in green
        if (isColliding(rectangle, { X: mouse.x - rectangle.SmallRectWidth / 2, Y: mouse.y - rectangle.SmallRectHeight / 2, BigRectWidth: rectangle.SmallRectWidth, BigRectHeight: rectangle.SmallRectHeight })) {
            let collisionRectX = Math.max(obj.X, mouse.x - rectangle.SmallRectWidth / 2);
            let collisionRectY = Math.max(obj.Y, mouse.y - rectangle.SmallRectHeight / 2);
            let collisionRectWidth = Math.min(obj.X + obj.BigRectWidth, mouse.x + rectangle.SmallRectWidth / 2) - collisionRectX;
            let collisionRectHeight = Math.min(obj.Y + obj.BigRectHeight, mouse.y + rectangle.SmallRectHeight / 2) - collisionRectY;
    
            c.fillStyle = "green";
            c.fillRect(collisionRectX, collisionRectY, collisionRectWidth, collisionRectHeight);
        }
    }

    obj.update = () => {
        obj.draw();
    }

    return obj;
}
let rectangle = Rectangle();

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    if (isColliding(rectangle, { X: mouse.x - rectangle.SmallRectWidth / 2, Y: mouse.y - rectangle.SmallRectHeight / 2, BigRectWidth: rectangle.SmallRectWidth, BigRectHeight: rectangle.SmallRectHeight })) {}
    rectangle.update();
}
animate();