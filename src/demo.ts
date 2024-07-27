import {AudioRecorderPlugin} from "../lib";

document.addEventListener('DOMContentLoaded', () => {
    const recorder = new AudioRecorderPlugin();
    const selectors = {
        startButton: ".js-button-start",
        stopButton: ".js-button-stop",
        container: ".js-container",
    }
    const startButton = document.querySelector(selectors.startButton);
    const stopButton = document.querySelector(selectors.stopButton);
    const container = document.querySelector(selectors.container);
    const SHOW_CLASS = 'show';

    startButton?.addEventListener('click', () => {
        startAudioRecording();
    });

    stopButton?.addEventListener('click', () => {
        stopAudioRecording();
    });

    async function startAudioRecording() {
        try {
            await recorder.init();
            await recorder.startRecording();

            toggleShowClass();
        } catch (error) {
            console.error('Error starting the audio recorder:', error);
        }
    }

    async function stopAudioRecording() {
        try {
            const audio = await recorder.stopRecording();

            toggleShowClass();

            setAudio(audio);
        } catch (error) {
            console.error('Error stopping the audio recorder:', error);
        }
    }

    const toggleShowClass = () => {
        startButton?.classList.toggle(SHOW_CLASS);
        stopButton?.classList.toggle(SHOW_CLASS);
    }

    const setAudio = (audio: HTMLAudioElement) => {
        container?.appendChild(audio);
    }
});