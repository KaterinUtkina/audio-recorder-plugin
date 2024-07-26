import {AudioRecorderPlugin} from "../lib";

document.addEventListener('DOMContentLoaded', () => {
    const recorder = new AudioRecorderPlugin();

    document.getElementById('start')?.addEventListener('click', () => {
        startAudioRecording();
    });

    document.getElementById('stop')?.addEventListener('click', () => {
        stopAudioRecording();
    });

    async function startAudioRecording() {
        try {
            await recorder.init();
            await recorder.startRecording();
        } catch (error) {
            console.error('Error starting the audio recorder:', error);
        }
    }

    async function stopAudioRecording() {
        try {
            const audio = await recorder.stopRecording();
            document.body.appendChild(audio);
        } catch (error) {
            console.error('Error stopping the audio recorder:', error);
        }
    }
});