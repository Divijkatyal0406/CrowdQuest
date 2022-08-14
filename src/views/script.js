const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');

function getUserMediaSupported() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
  }
  
  if (getUserMediaSupported()) {
    enableWebcamButton.addEventListener('click', enableCam);
  } else {
    console.warn('getUserMedia() is not supported by your browser');
  }
  
  function enableCam(event) {
    console.log("hhehe");
    console.log("byeee");
    if (!model) {
      return;
    }
    
    event.target.classList.add('removed');  
    
    const constraints = {
      video: true
    };
  
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
      video.srcObject = stream;
      video.addEventListener('loadeddata', predictWebcam);
    });
  }

  function predictWebcam() {
    }

    var model = true;
    var model = undefined;

cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
  console.log("bye");
});


var children = [];

function predictWebcam() {
  model.detect(video).then(function (predictions) {
    for (let i = 0; i < children.length; i++) {
      liveView.removeChild(children[i]);
    }
    children.splice(0);
    
    for (let n = 0; n < predictions.length; n++) {
      if(predictions[n].class=="cell phone"){
        var w = window.open('','','width=300,height=100')
        w.document.write('Phone detected!! Access Denied')
        w.focus()
        setTimeout(function() {w.close();}, 5000)
        // alert("Phone detected!! Access Denied");
        window.location="http://localhost:3000/";

    }
      if (predictions[n].score > 0.66) {
        const p = document.createElement('p');
        p.innerText = predictions[n].class  + ' - with ' 
            + Math.round(parseFloat(predictions[n].score) * 100) 
            + '% confidence.';
        p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: '
            + (predictions[n].bbox[1] - 10) + 'px; width: ' 
            + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';

        const highlighter = document.createElement('div');
        highlighter.setAttribute('class', 'highlighter');
        highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
            + predictions[n].bbox[1] + 'px; width: ' 
            + predictions[n].bbox[2] + 'px; height: '
            + predictions[n].bbox[3] + 'px;';

        liveView.appendChild(highlighter);
        liveView.appendChild(p);
        children.push(highlighter);
        children.push(p);
        
      }
    }
    
    window.requestAnimationFrame(predictWebcam);
  });
}
