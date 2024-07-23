import AudioRecorder from 'audio-recorder-polyfill';

window.MediaRecorder = AudioRecorder;

export class AudioRecorderPlugin {
    private mediaRecorder: MediaRecorder | null = null;
    private recordedChunks: Blob[] = [];

    constructor() {
        this.mediaRecorder = null;
        this.recordedChunks = [];
    }

    public async init(): Promise<void> {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new window.MediaRecorder(stream);

            if (!this.mediaRecorder) {
                return Promise.reject('MediaRecorder error: is null');
            }

            this.mediaRecorder.addEventListener('dataavailable', (event: BlobEvent) => {
                if (event.data.size > 0) {
                    this.recordedChunks.push(event.data);
                }
            });

            this.mediaRecorder.addEventListener('error', () => {
                return Promise.reject('MediaRecorder error');
            });

            return Promise.resolve();

        } catch (error) {
            return Promise.reject(error);
        }
    }

    public startRecording(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.mediaRecorder) {
                return reject('MediaRecorder error: not initialized.');
            }

            this.mediaRecorder.start();
        })
    }

    public stopRecording(): Promise<HTMLAudioElement> {
        return new Promise((resolve, reject) => {
            if (!this.mediaRecorder) {
                return reject('MediaRecorder error: not initialized.');
            }

            this.mediaRecorder.addEventListener('stop', () => {
                try {
                    const audioBlob = new Blob(this.recordedChunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);
                    audio.controls = true;

                    this.recordedChunks = [];

                    resolve(audio);
                } catch (error) {
                    reject(error);
                }
            });

            this.mediaRecorder.stop();
        })
    }
}