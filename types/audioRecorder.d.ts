export declare class AudioRecorderPlugin {
    private mediaRecorder;
    private recordedChunks;
    constructor();
    init(): Promise<void>;
    startRecording(): Promise<void>;
    stopRecording(): Promise<HTMLAudioElement>;
}
