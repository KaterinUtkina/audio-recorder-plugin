> # 🚧 Development in Progress 🚧

# audio-recorder-plugin

Audio Recorder Plugin is a versatile and easy-to-use plugin for recording audio in the browser using the MediaRecorder API. It includes polyfill support to ensure compatibility across different browsers, making it a reliable choice for your web audio recording needs.

## Table of Contents

- [Features](#features)
- [Live Demo](#live-demo)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [License](#license)

## Features

- **Cross-Browser Support:** Utilizes a polyfill to handle browser inconsistencies.
- **Simple API:** Easy methods for initializing, starting, and stopping audio recordings.
- **Playback Ready:** Returns the recorded audio as an HTMLAudioElement for straightforward playback.

## Live Demo


## Installation
You can install the plugin via npm or yarn:
```bash
npm install audio-recorder-plugin
```
or
```bash
yarn add audio-recorder-plugin
```
## Usage
Here's how you can use the AudioRecorderPlugin in your JavaScript project:

```
import { AudioRecorderPlugin } from 'audio-recorder-plugin';
const recorder = new AudioRecorderPlugin();
```
## API

### `AudioRecorderPlugin`

The `AudioRecorderPlugin` provides a simple interface for recording audio in the browser. Below are the methods available in the plugin:

#### `init(): Promise<void>`

Initializes the audio recorder. This method must be called before starting the recording. It sets up any necessary resources and ensures the recorder is ready for use.

#### `startRecording(): Promise<void>`

Starts the audio recording process. This method begins capturing audio from the user's microphone. Make sure to call `init()` successfully before invoking this method.

#### `stopRecording(): Promise<HTMLAudioElement>`

Stops the audio recording process and returns an `HTMLAudioElement` containing the recorded audio. The returned audio element can be appended to the DOM or used for playback.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.