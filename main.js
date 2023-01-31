sound="";
status="";
objects=[];


function preload(){
sound=loadSound('miley_cyrus_flowers.mp3');
}
function setup(){
    canvas=createCanvas(400,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(400,400);
    video.hide();
    object_detector=ml5.objectDetector('cocossd',modalLoaded);
document.getElementById('status').innerHTML="Status:Detecting";
}
function modalLoaded(){
    console.log('Modal is loaded');
    status=true;
    
}
function gotResult(error,results){
if(error){
    console.log(error);
}
console.log(results);
objects=results;
}
    function draw(){
        image(video,0,0,400,400);
        if(status!=""){
            object_detector.detect(video,gotResult);
            for(i=0;i<objects.length;i++){
                document.getElementById('status').innerHTML="Status:Object Detected";
            
                fill('#9a50b9');
                noFill()
                stroke('#9a50b9');
                rect(objects[i].x-25,objects[i].y-60,objects[i].width,objects[i].height);
                percent=floor(objects[i].confidence*100);
                text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y+20);
                if(objects[i].label=="person"){
                    document.getElementById('status_of_baby').innerHTML="Baby Found";
                    sound.stop();
                }
                else{
                    document.getElementById('status_of_baby').innerHTML="Baby Not Found";
                    sound.play();
                }
            }
            if(objects.length==0){
                document.getElementById('status_of_baby').innerHTML="Baby Not Found";
                sound.play();
          
        }
    }
    }
