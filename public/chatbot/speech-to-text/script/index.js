let mediaRecorder;

function startRecording() {
    document.getElementById("toggle").innerText = "Stop Recording";
    document.getElementById("toggle").onclick = stopRecording;

    if (mediaRecorder === undefined) {
        initMediaRecorder();
    } else {
        mediaRecorder.start();
    }
}

function stopRecording() {
    document.getElementById("toggle").innerText = "Start Recording";
    document.getElementById("toggle").onclick = startRecording;

    mediaRecorder.stop();
}

function initMediaRecorder() {
    navigator.mediaDevices
        .getUserMedia({audio: true, video: false})
        .then(stream => {
            handleSuccess(stream);
        });
}

function handleSuccess(stream) {
    const recordedChunks = [];
    const options = {mimeType: "audio/webm"};
    mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener("dataavailable", event => {
        if (event.data.size > 0){
            recordedChunks.push(event.data);
        }
    });

    mediaRecorder.addEventListener("stop", () => {
        // When the recording is stopped
        console.log(new Blob(recordedChunks));
        getTranscript(recordedChunks);
    });

    mediaRecorder.start();
}

function getTranscript(audioData) {
    const getTranscript = firebase.functions().httpsCallable("getTranscript");

    getTranscript({audioData: audioData})
        .then(result => {
            console.log("Transcript GET!");
            document.getElementById("display").innerText
                = result.data.text;
        });
}
