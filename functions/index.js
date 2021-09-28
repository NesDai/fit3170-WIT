const functions = require("firebase-functions");

const { exec } = require("child_process");

exports.getTranscript =
    functions.https.onCall((data, context) => {
        let audioData = data.audioData;

        return {text: "This is a test"};
    });

function extractAudioFromBlob() {
    exec("ffmpeg -i example.mp4", (error, stdout, stderr) => {
        //ffmpeg logs to stderr, but typically output is in stdout.
        console.log(stderr);
    });
}