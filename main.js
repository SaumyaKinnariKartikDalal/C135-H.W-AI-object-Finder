video = "";
status = "";
objects = [];

function preload() {
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
}

function draw() {
    image(video, 0, 0, 380, 380);
    textSize(20);

    if (status !=""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        document.getElementById("status").innerHTML = "Status: Object Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of objects detected: " + objects.length;
        for (i = 0; i < objects.length; i++){
            fill(r,g,b);
            strokeWeight(2);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y-20);
            noFill();
            stroke(r,g,b);
            strokeWeight(5);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            label = document.getElementById("object").value;
            if (objects[i].label == label ) {
                document.getElementById("found").innerHTML = "Object Found";
            }
            else {
                document.getElementById("found").innerHTML = "Object Not Found";
            }
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results) {
    if (error){
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}