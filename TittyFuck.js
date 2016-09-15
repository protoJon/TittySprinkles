//Init vars
var WindowW = window.innerWidth;
var WindowH = window.innerHeight;
var FPSVal = 0
var c = document.getElementById("Canvas");
var ctx = c.getContext("2d");
c.width = WindowW
c.height = WindowH
var BGzoom = 0
var BGisZooming = false;
var BGzoomRate = 0.06
var BGmaxZoom = 100
var IntroCompleted = true
var EventsTickDelay = 500;
var ChatBarOpacity = 0.7;
var fps = {
    startTime: 0,
    frameNumber: 0,
    getFPS: function () {
        this.frameNumber++;
        var d = new Date().getTime(),
            currentTime = (d - this.startTime) / 1000,
            result = Math.floor((this.frameNumber / currentTime));
        if (currentTime > 1) {
            this.startTime = new Date().getTime();
            this.frameNumber = 0;
        }
        return result;
    }
};

var bg = new Image();
var bgLoaded = false;
bg.onload = function () {
    if (bgLoaded == false) {
        bgLoaded = true;
    }
    ctx.drawImage(this, -BGzoom, -BGzoom, c.width + (BGzoom * 2), c.height + (BGzoom * 2));
  
};
bg.src = "./tits.jpg";


var menuimg = new Image();
var menuimgLoaded = false;
menuimg.onload = function () {
    if (menuimgLoaded == false) {
        menuimgLoaded = true;
    }
    ctx.drawImage(this, c.width - 80, 15, 70, 70);
};
menuimg.src = "./menu.png";

var logoimg = new Image();
var logoimgLoaded = false;
logoimg.onload = function () {
    if (logoimgLoaded == false) {
        logoimgLoaded = true;
    }
    ctx.drawImage(this, 20, 20, 60, 60);
};
logoimg.src = "./boob.png";

var audio = new Audio('./TittySprinklesMonolouge.mp3');
audio.play();
var IntroStartTime = new Date()

function RenderFrame() {
    if (bgLoaded) {
        bg.onload()
    };
    if (menuimgLoaded) {
        menuimg.onload()
    };
	grd = ctx.createLinearGradient(0, 100, 0, 150);
    grd.addColorStop(0, "rgb(0, 0, 200)");
    grd.addColorStop(1, "transparent");
	ctx.fillStyle = grd;
	ctx.globalAlpha = 0.4;
	ctx.fillRect(0, 100, c.width, 50)
	grd = ctx.createLinearGradient(0, 0, 0, 100);
    grd.addColorStop(0, "rgb(30, 30, 30)");
    grd.addColorStop(0.5, "rgb(10, 10, 10)");
    grd.addColorStop(1, "rgb(30, 30, 30)");
    ctx.fillStyle = grd;
	ctx.globalAlpha = 0.8;
    ctx.fillRect(0, 0, c.width, 100)
	
    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    
    ctx.lineWidth = 6
    var grd = ctx.createLinearGradient(15, 0, 425, 0);
    grd.addColorStop(0, "rgb(50, 50, 50)");
    grd.addColorStop(1, "rgb(100, 100, 100)");
    ctx.strokeStyle = grd
    ctx.strokeRect(15, 15, 380, 70)
	if (logoimgLoaded) {
        logoimg.onload()
    };
    ctx.fillStyle = "white";
	ctx.font = "40px Calibri"
	var Str = "TittySprinkles.com"
    ctx.fillText(Str, 85, 50)
	ctx.font = "20px Calibri";
	Str = "Mmm. That's the good stuff."
    ctx.fillText(Str, 150, 75)
	
    RenderDebug(c.width - 100, 10);
    if (IntroCompleted) {
        ctx.globalAlpha = ChatBarOpacity;
        ctx.fillStyle = "rgb(245, 245, 245)";
        ctx.fillRect(10, c.height - 40, c.width / 2, 30)
    }
    if (BGisZooming) {
        BGzoom += BGzoomRate
        if (BGzoom >= BGmaxZoom) {
            BGzoom = BGmaxZoom
            BGisZooming = false
        }
    } else {
        BGzoom -= BGzoomRate
        if (BGzoom <= 0) {
            BGzoom = 0
            BGisZooming = true
        }
    }
    FPSVal = fps.getFPS();
    requestAnimationFrame(RenderFrame);
}

function EventsTick() {
    var now = new Date()
    if (IntroCompleted == false) {
        var TimeElapsed = now - IntroStartTime
        if (TimeElapsed >= 38000) {
            IntroCompleted = true
        }
    }
    setInterval(EventsTick, EventsTickDelay)
}
function RenderDebug(x, y) {
    ctx.globalAlpha = 1;
    ctx.font = "15px Helvitica Nue";
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.fillText(FPSVal, x, y);
}

function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}
RenderFrame();
EventsTick()

function Resize() {
    WindowW = window.innerWidth;
    WindowH = window.innerHeight;
    c.width = WindowW;
    c.height = WindowH;
}

window.addEventListener("resize", Resize);