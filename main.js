var canv = document.getElementById("canv");
var ctx = canv.getContext("2d");

canv.width = window.innerWidth;
canv.height = window.innerHeight;

document.addEventListener("click", upDest, false);
document.addEventListener("touchstart", upDest, false);
//document.addEventListener("mousemove", upDest, false);

// input -> calculation -> display

//player: player

//cam: cam
// everything is draw relative to cam position

//components: components[]
let isActv = false;

let midx = canv.width / 2;
let midy = canv.height / 2;

let pl = [
    { x: midx, y: midy, w: 15, h: 15, d: 15 },
    { x: midx, y: midy, w: 15, h: 15, d: 15 },
    { x: midx, y: midy, w: 15, h: 15, d: 15 },
    { x: midx, y: midy, w: 15, h: 15, d: 15 },
    { x: midx, y: midy, w: 15, h: 15, d: 15 },
    { x: midx, y: midy, w: 15, h: 15, d: 15 },
    { x: midx, y: midy, w: 15, h: 15, d: 15 },
    { x: midx, y: midy, w: 15, h: 15 }
]

let comp = objGen(10, 30, 50);

let part = objGen(50,5,5);

let cam = { x: 0, y: 0 }

let dest = { x: midx + 0.01, y: midy + 0.01 }


setInterval(() => {
    ctx.clearRect(0, 0, canv.width, canv.height);
    upScene();
    drScene();
}, 10);

// draw

function drScene() {
    drBackground();
    drPlayer();
    drComponents();
    drPart();

}

function drPlayer() {
    pl.map((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.w, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.fill();
        ctx.closePath();
    })
}

function drComponents() {
    comp.map((c) => {
        ctx.beginPath();
        ctx.rect(c.x, c.y, c.w, c.h);
        ctx.fillStyle = "rgba(200, 200, 200, 1)";
        ctx.fill();
        ctx.closePath();
    })
}

function drPart() {
    part.map((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.w, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.fill();
        ctx.closePath();
    })
}

function drBackground() {
    ctx.beginPath();
    ctx.rect(0, 0, canv.width, canv.height);
    ctx.fillStyle = "rgb(126, 126, 126)";
    ctx.fill();
    ctx.closePath();
}



// calculate

function upScene() {
    upPlPos();
    upCom();
    upPart(part);
}

function upPlPos() {

    for (let i = 0; i < pl.length; i++) {
        let a = mode(pl[i].x - dest.x)
        let b = mode(pl[i].y - dest.y)
        let r = pita(a, b)


        let d = 1
        if (r > 10 && colDet(comp, pl[i])) {
            d = 2 * (1 / (i * i / 2 + 3) + r / 100)
        } else d = 0.5;


        if (pl[i].x <= dest.x) pl[i].x += (d * (a / r))
        else pl[i].x -= (d * (a / r));

        if (pl[i].y <= dest.y) pl[i].y += (d * (b / r))
        else pl[i].y -= (d * (b / r));

    }


    // pl.map((p,i) => {
    //     let a = mode(p.x - cam.x - dest.x)
    //     let b = mode(p.y - cam.y - dest.y)
    //     let r = pita(a,b)

    //     console.log(p.x, cam.x, dest.x, a)

    //     let d = 1
    //     if (r > 0.5){
    //         d = 5 + r/100 - 3/(i+1)
    //     } else d = 0;

    //     if (p.x <= dest.x)  p.x += (d * (a/r))
    //         else p.x -= (d * (a/r));

    //     if (p.y <= dest.y)  p.y += (d * (b/r))
    //         else p.y -= (d * (b/r));
    // })
}

function upPart(p) {

    for (let i = 0; i < p.length; i++) {
        for(let j = 0; j < pl.length; j++) {

        
        let a = mode(p[i].x - pl[j].x)
        let b = mode(p[i].y - pl[j].y)
        let r = pita(a, b)


        let d = 1
        if (r > 10 && r < canv.width/2 && colDet(comp, p[i])) {
            d = 200/(r*r)
        } else if (r > canv.width/2) {
            d = -2000/(r*r)
        } else d = 0;


        if (p[i].x <= dest.x) p[i].x -= (d * (a / r))
        else p[i].x += (d * (a / r));

        if (p[i].y <= dest.y) p[i].y -= (d * (b / r))
        else p[i].y += (d * (b / r));
        }
    }
}

function upCom() {

}

function upDest(e) {
    document.removeEventListener("touchstart",upDest)
    dest.x = e.clientX - canv.offsetLeft;
    dest.y = e.clientY - canv.offsetTop;
}

function mouseActv(e) {
    console.log(e)
}



function colDet(a, b) {
    let isTrue = true
    a.forEach((c) => {
        if (c.x < b.x + b.w &&
            c.x + c.w > b.x &&
            c.y < b.y + b.h &&
            c.h + c.y > b.y) {
            isTrue = false
        }
    })
    return isTrue
}

function objGen(num, w, h) {
    let objArr = []
    for (let i = 0; i < num; i++) {
        
        let a = {
            x: randInt(canv.width),
            y: randInt(canv.height),
            w: w,
            h: h
        }
        console.log(a)
        objArr.push(a)
    }
    console.log(objArr)
    return objArr
}



function pita(x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function sin(x, y) {
    return Math.sin(x / y)
}

function mode(x) {
    return Math.sqrt(Math.pow(x, 2))
}

function randInt(m) {
    return Math.floor(Math.random() * Math.floor(m));
}















