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
        getTranscript(recordedChunks);

        // Show link
        document.body.innerHTML += `<a id="download">Download</a>`;
        let downloadLink = document.getElementById("download");

        downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
        downloadLink.download = 'acetest.wav';

        // Try uploading to Cloud Storage
        const uploadRecording = firebase.functions().httpsCallable("uploadRecording");
        uploadRecording({filePath: downloadLink.href})
            .then(result => {
                console.log(("File uploaded!"));
                console.log(result.data.text);
            });
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