import AudioRecorder from 'audio-recorder-polyfill';

// Set the MediaRecorder polyfill
window.MediaRecorder = AudioRecorder;

/**
 * Class for handling audio recording.
 * Uses MediaRecorder API to capture and process audio data.
 */
export class AudioRecorderPlugin {
    // Instance of MediaRecorder for recording audio
    private mediaRecorder: MediaRecorder | null = null;
    // Array to store recorded audio chunks
    private recordedChunks: Blob[] = [];

    /**
     * Constructor for AudioRecorderPlugin.
     * Initializes mediaRecorder and recordedChunks.
     */
    constructor() {
        this.mediaRecorder = null;
        this.recordedChunks = [];
    }

    /**
     * Initializes the media recorder.
     * Requests access to the user's microphone and creates a MediaRecorder instance.
     * @returns Promise<void> - Resolves when initialization is complete or rejects with an error.
     */
    public async init(): Promise<void> {
        try {
            // Request access to the user's microphone
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            // Create a MediaRecorder instance with the obtained stream
            this.mediaRecorder = new window.MediaRecorder(stream);

            // Check if the mediaRecorder was successfully created
            if (!this.mediaRecorder) {
                return Promise.reject('MediaRecorder error: is null');
            }

            // Event handler for dataavailable to collect audio data
            this.mediaRecorder.addEventListener('dataavailable', (event: BlobEvent) => {
                if (event.data.size > 0) {
                    this.recordedChunks.push(event.data);
                }
            });

            // Event handler for error to handle MediaRecorder errors
            this.mediaRecorder.addEventListener('error', () => {
                return Promise.reject('MediaRecorder error');
            });

            return Promise.resolve();

        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Starts recording audio.
     * @returns Promise<void> - Resolves when recording starts or rejects with an error.
     */
    public startRecording(): Promise<void> {
        return new Promise((resolve, reject) => {
            // Check if the mediaRecorder is initialized
            if (!this.mediaRecorder) {
                return reject('MediaRecorder error: not initialized.');
            }

            // Start recording
            this.mediaRecorder.start();
        });
    }

    /**
     * Stops recording and returns an Audio object with the recorded audio.
     * @returns Promise<HTMLAudioElement> - Resolves with an Audio object or rejects with an error.
     */
    public stopRecording(): Promise<HTMLAudioElement> {
        return new Promise((resolve, reject) => {
            // Check if the mediaRecorder is initialized
            if (!this.mediaRecorder) {
                return reject('MediaRecorder error: not initialized.');
            }

            // Event handler for stop to finalize recording and create an Audio object
            this.mediaRecorder.addEventListener('stop', () => {
                try {
                    // Create a Blob from the recorded chunks
                    const audioBlob = new Blob(this.recordedChunks, { type: 'audio/wav' });
                    // Create a URL for the created Blob
                    const audioUrl = URL.createObjectURL(audioBlob);
                    // Create an Audio element and set its source
                    const audio = new Audio(audioUrl);
                    audio.controls = true;

                    // Clear the recorded chunks array
                    this.recordedChunks = [];

                    resolve(audio);
                } catch (error) {
                    reject(error);
                }
            });

            // Stop recording
            this.mediaRecorder.stop();
        });
    }
}