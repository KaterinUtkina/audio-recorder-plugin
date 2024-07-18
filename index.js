import AudioRecorder from 'audio-recorder-polyfill';
window.MediaRecorder = AudioRecorder;

class AudioRecorderPlugin {
    constructor() {
        this.mediaRecorder = null;
        this.recordedChunks = [];
    }

    initRecorder() {
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream => {
            this.mediaRecorder = new MediaRecorder(stream);

            this.mediaRecorder.addEventListener('dataavailable', (event) =>  {
                if (event.data.size > 0) {
                    this.recordedChunks.push(event.data);
                }
            });

            this.mediaRecorder.addEventListener('stop', () => {
                const audioBlob = new Blob(this.recordedChunks, { 'type': 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audio.controls = true;

                document.body.appendChild(audio);

                this.recordedChunks = [];
            });

            this.mediaRecorder.addEventListener('error', function(error) {
                console.error('MediaRecorder error:', error);
            });

        }).catch(error => {
            console.error('The following getUserMedia error occurred: ' + error);
        });
    }

    stopRecording() {
        this.mediaRecorder.stop();
    }

    startRecording() {
        this.mediaRecorder.start();
    }
}

const recorder = new AudioRecorderPlugin();
recorder.initRecorder();

export function startRecording() {
    recorder.startRecording();
}


export function stopRecording() {
    recorder.stopRecording();
}