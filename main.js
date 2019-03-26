var canv = document.getElementById("canv");
var ctx = canv.getContext("2d");

canv.width = window.innerWidth;
canv.height = window.innerHeight;

document.addEventListener("mousemove", upDest, false);

// input -> calculation -> display

//player: player

//cam: cam
// everything is draw relative to cam position

//components: components[]
let midx = canv.width/2;
let midy = canv.height/2;

let pl = [
    {x: midx, y: midy, d: 15},
     {x: midx, y: midy, d: 15},
    // {x: midx, y: midy, d: 15},
    // {x: midx, y: midy, d: 15},
    // {x: midx, y: midy, d: 15},
    // {x: midx, y: midy, d: 15},
    // {x: midx, y: midy, d: 15},
    // {x: midx, y: midy, d: 15}
]
let cam = {x: 0, y: 0}
let dest = {gx: 0, gy: 0}


setInterval(() => {
    ctx.clearRect(0, 0, canv.width, canv.height);
    upScene();
    drScene();
}, 1000);

// draw

function drScene(){
    drBackground();
    drPlayer();
    drComponents();
    
}

function drPlayer() {
    pl.map((p) => {
        gx = canv.width/2 - p.x - cam.x
        gy = canv.height/2 - p.y - cam.y
        ctx.beginPath();
        ctx.arc(gx, gy, 15, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.fill();
        ctx.closePath();
    })
}

function drComponents() {

}

function drBackground() {
    ctx.beginPath();
    ctx.rect(0,0,canv.width,canv.height);
    ctx.fillStyle = "rgb(126, 126, 126)";
    ctx.fill();
    ctx.closePath();
}

// calculate

function upScene() {
    upCamPos();
    upPlPos();
    upCom();
}

function upCamPos() {
    cam.x = pl[pl.length-1].x
    cam.y = pl[pl.length-1].y
}

function upPlPos() {
    
    for(let i = 0; i < pl.length; i++) {
        let a = mode(pl[i].x  - dest.gx)
        let b = mode(pl[i].y  - dest.gy)
        let r = pita(a,b)

        console.log(i,pl[i].x, cam.x, dest.gx, a)

        let d = 1
        if (r > 0.5){
            d = 5 + r/100 - 3/(i+1)
        } else d = 0;
        
        if (pl[i].x <= dest.x)  pl[i].x += (d * (a/r))
            else pl[i].x -= (d * (a/r));
    
        if (pl[i].y <= dest.y)  pl[i].y += (d * (b/r))
            else pl[i].y -= (d * (b/r));
    }


    // pl.map((p,i) => {
    //     let a = mode(p.x - cam.x - dest.gx)
    //     let b = mode(p.y - cam.y - dest.gy)
    //     let r = pita(a,b)

    //     console.log(p.x, cam.x, dest.gx, a)

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

function upCom() {

}

function upDest(e) {
    dest.gx = e.clientX - canv.offsetLeft;
    dest.gy = e.clientY - canv.offsetTop;
}



function pita(x, y) {
    return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
}

function sin(x,y) {
    return Math.sin(x/y)
}

function mode(x) {
    return Math.sqrt(Math.pow(x,2))
}
















