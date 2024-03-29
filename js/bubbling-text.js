var bgcolour = "#9b4ceb"; // background colour
var fgcolour = "#6600cc"; // foreground colour
var speed = 80; // speed of bubbling, lower is faster
var shades = 12; // number of shades of bubble

/****************************
 *    Bubbling Text Effect   *
 *(c)2003-13 mf2fm web-design*
 *  http://www.mf2fm.com/rv  *
 * DON'T EDIT BELOW THIS BOX *
 ****************************/
var bubbcol = new Array();
var bubbshd;
var bubbler, bubbtxt;
var bubbchr = new Array();

function addLoadEvent(funky) {
    var oldonload = window.onload;
    if (typeof (oldonload) != 'function') window.onload = funky;
    else window.onload = function () {
        if (oldonload) oldonload();
        funky();
    }
}

addLoadEvent(bubbagump);

function bubbagump() {
    if (document.getElementById) {
        var i, fg, bg, col;
        for (bubbler = 0; bubbler <= shades; bubbler++) {
            col = "#";
            for (i = 1; i < 6; i += 2) {
                bg = parseInt(bgcolour.substring(i, i + 2), 16);
                fg = parseInt(fgcolour.substring(i, i + 2), 16);
                col += dechex(bg + (fg - bg) * (bubbler / shades));
            }
            bubbcol[bubbler + 1] = col;
            if (bubbler == Math.floor(shades / 2)) bubbshd = col;
        }
        bubbler = document.getElementById("bubble");
        bubbtxt = bubbler.firstChild.nodeValue;
        while (bubbler.childNodes.length) bubbler.removeChild(bubbler.childNodes[0]);
        for (i = 0; i < bubbtxt.length; i++) {
            fg = document.createElement("span");
            fg.setAttribute("id", "bubb" + i);
            fg.style.textShadow = bubbshd + " 0px 0px 2px";
            fg.appendChild(document.createTextNode(bubbtxt.charAt(i)));
            bubbler.appendChild(fg);
        }
        bubbler = setInterval("bubbling()", speed);
    }
}

function dechex(dec) {
    dec = Math.floor(dec);
    return ((dec < 16) ? '0' : '') + dec.toString(16);
}

function bubbling() {
    var i, bubby;
    for (i = 0; i < bubbtxt.length; i++) {
        bubby = document.getElementById("bubb" + i);
        if (bubbchr[i]) {
            bubby.style.color = bubbcol[bubbchr[i]];
            bubbchr[i] = (bubbchr[i] + 1) % bubbcol.length;
        } else if (Math.random() < 7.5 / (shades * bubbtxt.length)) bubbchr[i] = 1;
    }
}