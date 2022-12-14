
//a class for BodyParts so that each time a new part is added a new canvas is created. This gives
//a z-index and an instance count to the new BodyPart as well as a property with the context 
//of the canvas which is the property that allows you to draw. Also creates an array as a property in
//this.images
const imageDirectory = require('./getImageArrays.js');
class BodyPart {
    static instanceCount = 0;
    myInst = BodyPart.instanceCount;
    images = [];
    constructor() {
        BodyPart.instanceCount++;
        this.newCanvas()
        this.ctx = (document.getElementsByTagName('canvas'))[BodyPart.instanceCount - 1].getContext('2d');
    }
    newCanvas() {
        let x = document.createElement('canvas');
        x.style.zIndex = BodyPart.instanceCount;
        x.style.position = 'absolute';
        document.getElementById('face').appendChild(x);
    }
    push(image) {
        this.images.push(image);
    }
}
let skin = '1EE656';
let headShape = -1;
let earShape = -1;
let mouthShape = -1;
let eyesShape = -1;
//initialize different body parts which automatically creates a new canvas
//and gives it a position of absolute so they can rest on top of each other
//you should probably think about which things will be on top of eachother
//because you don't want hair behind the head and the first created get the
//lowest z-index
let ears = new BodyPart;
let heads = new BodyPart;
let eyes = new BodyPart;
let mouth = new BodyPart;

//create new image variables. need to figure out a way to do this using PHP
let img1 = new Image;
let img2 = new Image;
let img3 = new Image;
let img4 = new Image;
let img5 = new Image;
let img6 = new Image;
let img7 = new Image;
let img8 = new Image;
let img9 = new Image;
let img10 = new Image;
let img11 = new Image;
let img12 = new Image;

//Head images
img1.src = './images/heads/head1.png';
img4.src = './images/heads/head2.png';
img5.src = './images/heads/head3.png';
//Ear Images
img2.src = './images/ears/ears1.png';
img3.src = './images/ears/ears2.png';
img6.src = './images/ears/ears3.png';
//Eye Images
img7.src = './images/eyes/eyes1.png';
img8.src = './images/eyes/eyes2.png';
img9.src = './images/eyes/eyes3.png';
//Mouth Images
img10.src = './images/mouths/mouth1.png';
img11.src = './images/mouths/mouth2.png';
img12.src = './images/mouths/mouth3.png';

//creating arrays in each of the new BodyPart objects
//ears
ears.push(img2);
ears.push(img3);
ears.push(img6);
//heads
heads.push(img1);
heads.push(img5);
heads.push(img4);
//eyes
eyes.push(img7);
eyes.push(img8);
eyes.push(img9);
//mouths
mouth.push(img10);
mouth.push(img11);
mouth.push(img12);

//gets a random head and places it on the canvas on its own layer
function getHead(){
    let randomHead = getRando(heads.images);
    randomHead = stopRando(randomHead, headShape, heads);
    heads.ctx.clearRect(0,0,100,100);
    heads.ctx.drawImage(heads.images[randomHead],0,0);
    headShape = randomHead;
}
//gets a random ear and places it on the canvas on its own layer
function getEars(){
    let randomEars = getRando(ears.images);
    randomEars = stopRando(randomEars, earShape, ears);
    ears.ctx.clearRect(0,0,100,100);
    ears.ctx.drawImage(ears.images[randomEars],0,0);
    earShape = randomEars;
}
//gets a random set of eyes and places it on the canvas on its own layer
function getEyes(){
    let randomEyes = getRando(eyes.images);
    randomEyes = stopRando(randomEyes, eyesShape, eyes);
    eyes.ctx.clearRect(0,0,100,100)
    eyes.ctx.drawImage(eyes.images[randomEyes],0,0);
    eyesShape = randomEyes;
}
//gets a random mouth and places it on the canvas on its own layer
function getMouth(){
    let randomMouth = getRando(mouth.images);
    randomMouth = stopRando(randomMouth, mouthShape, mouth);
    mouth.ctx.clearRect(0,0,100,100);
    mouth.ctx.drawImage(mouth.images[randomMouth],0,0);
    mouthShape = randomMouth;
}
//a function to stop the random 
function stopRando(randomPart, shape, array){
    while(shape == randomPart){
        randomPart = getRando(array.images);
    }
    return randomPart
}
//function to replace one color with another
function changeSkin(){
    //if no head has been chosen produces an alert
    if (headShape == -1) {
        alert('You need to select at least a head first');
    } else {
        //draws the current image with green
        heads.ctx.drawImage(heads.images[headShape],0,0);
        //gets imageData for the original image from the selected area
        let imageData = heads.ctx.getImageData(0, 0, 100, 100);
        //creates a variable of just the image data. This is in an array
        //that is meant for holding image data
        let data = imageData.data;
        //resets skin tone
        skin = '1EE656';
        //parses skin tone from hexadecimal to integer
        skin = parseInt(skin, 16);
        //creates an object with the r g and b values of the color
        let oldColor = {
            r: skin >> 16 & 0xff,
            g: skin >> 8 & 0xff,
            b: skin & 0xff
        }
        //creates an array of the color possibilities and uses our random function
        //to select one
        let colors = ['c56ade', '6ac9de', 'cc9226'];
        colors = colors[getRando(colors)];
        //changes the color to an integer
        colors = parseInt(colors, 16);
        //creates new object with r g and b values for the new color
        let newColor = {
            r: colors >> 16 & 0xff,
            g: colors >> 8 & 0xff,
            b: colors & 0xff
        }
        //for loop scans our image data array and changes any green to the new color
        for(i = 0; i < data.length; i += 4){
            if(data[i] == oldColor.r && data[i+1] == oldColor.g && data[i+2] == oldColor.b){
                data[i] = newColor.r;
                data[i+1] = newColor.g;
                data[i+2] = newColor.b;
            }
        }
        //outputs the image data back to the canvas
        changeEarColor(oldColor, newColor);
        heads.ctx.putImageData(imageData, 0, 0);
    }
}
function changeEarColor(oldColor, newColor){
    if(earShape == -1){
        return
    } else{
        ears.ctx.drawImage(ears.images[earShape],0,0);
            //gets imageData for the original image from the selected area
        let imageData = ears.ctx.getImageData(0, 0, 100, 100);
            //creates a variable of just the image data. This is in an array
            //that is meant for holding image data
        let data = imageData.data;
        for(i = 0; i < data.length; i += 4){
            if(data[i] == oldColor.r && data[i+1] == oldColor.g && data[i+2] == oldColor.b){
                data[i] = newColor.r;
                data[i+1] = newColor.g;
                data[i+2] = newColor.b;
            }
        }
        ears.ctx.putImageData(imageData, 0, 0);
    }

}
//creates a random number between 0 and the length of an array,
//takes said array as a parameter
function getRando(array){
    return Math.floor(Math.random() * array.length);
}
//create listening for click events
document.getElementById('head').addEventListener('click', getHead);
document.getElementById('ears').addEventListener('click', getEars);
document.getElementById('eyes').addEventListener('click', getEyes);
document.getElementById('mouth').addEventListener('click', getMouth);
document.getElementById('skin').addEventListener('click', changeSkin);

//createing a backdrop canvas, not sure if this could be used to actually
//export an image later? either way it is needed since the other canvases
//are position: absolute to space the buttons
(document.getElementById('face').appendChild(document.createElement('canvas')));
