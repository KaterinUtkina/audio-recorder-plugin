import {AudioRecorderPlugin} from "./audioRecorder";

document.addEventListener('DOMContentLoaded', () => {
    const recorder = new AudioRecorderPlugin();

    document.getElementById('start')?.addEventListener('click', () => {
        recorder.startRecording();
    });

    document.getElementById('stop')?.addEventListener('click', () => {
        recorder.stopRecording();
    });
});