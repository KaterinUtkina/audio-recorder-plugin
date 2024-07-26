/**
 * Class for handling audio recording.
 * Uses MediaRecorder API to capture and process audio data.
 */
export declare class AudioRecorderPlugin {
    /**
     * Private field to hold the MediaRecorder instance
     */
    private mediaRecorder: MediaRecorder | null;

    /**
     * Private field to store recorded audio chunks
     */
    private recordedChunks: Blob[];

    /**
     * Initializes the media recorder.
     * Requests access to the user's microphone and creates a MediaRecorder instance.
     * @return Promise<void> - Resolves when initialization is complete or rejects with an error.
     */
    public init(): Promise<void>;

    /**
     * Starts recording audio.
     * @return Promise<void> - Resolves when recording starts or rejects with an error.
     */
    public startRecording(): Promise<void>;

    /**
     * Stops recording and returns an Audio object with the recorded audio.
     * @return Promise<HTMLAudioElement> - Resolves with an Audio object or rejects with an error.
     */
    public stopRecording(): Promise<HTMLAudioElement>;
}