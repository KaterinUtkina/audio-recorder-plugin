import AudioRecorder from 'audio-recorder-polyfill';

window.MediaRecorder = AudioRecorder;

export class AudioRecorderPlugin {
    private mediaRecorder: MediaRecorder | null = null;
    private recordedChunks: Blob[] = [];

    constructor() {
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.init();
    }

    private init(): void {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream: MediaStream) => {
                this.mediaRecorder = new window.MediaRecorder(stream);

                if (this.mediaRecorder === null) {
                    return console.error('Media recorder is null');
                }

                this.mediaRecorder.addEventListener('dataavailable', (event: BlobEvent) => {
                    if (event.data.size > 0) {
                        this.recordedChunks.push(event.data);
                    }
                });

                this.mediaRecorder.addEventListener('stop', () => {
                    const audioBlob = new Blob(this.recordedChunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);
                    audio.controls = true;

                    this.recordedChunks = [];

                    return audio;
                });

                this.mediaRecorder.addEventListener('error', (event: Event) => {
                    console.error('MediaRecorder error:', event);
                });

            })
            .catch((error: Error) => {
                console.error('The following getUserMedia error occurred: ' + error);
            });
    }

    public startRecording(): void {
        if (this.mediaRecorder) {
            this.mediaRecorder.start();
        } else {
            console.error('MediaRecorder is not initialized.');
        }
    }

    public stopRecording(): void {
        if (this.mediaRecorder) {
            return this.mediaRecorder.stop();
        } else {
            console.error('MediaRecorder is not initialized.');
        }
    }
}