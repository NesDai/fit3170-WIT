const functions = require("firebase-functions");

const { exec } = require("child_process");
const {Storage} = require("@google-cloud/storage");

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

// TODO Cloud storage stuff goes here
exports.uploadRecording =
    functions.https.onCall((data, context) => {
        // The ID of your GCS bucket
        const bucketName = 'thisisonlyatest';

        // The new ID for your GCS file
        const destFileName = 'recording';

        // Creates a client
        const storage = new Storage();

        async function uploadFile() {
            const filePath = data.filePath;

            await storage.bucket(bucketName).upload(filePath, {
                destination: destFileName,
            });

            console.log(`${filePath} uploaded to ${bucketName}`);
        }

        uploadFile().catch(reason => {
            return {text: reason};
        });
    });
