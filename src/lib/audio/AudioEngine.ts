import { Howl, Howler } from 'howler';

class AudioEngine {
    private sound: Howl | null = null;
    private currentSrc: string | null = null;
    private static instance: AudioEngine;

    private constructor() {
        // Initialize defaults
        Howler.volume(0.8);
    }

    public static getInstance(): AudioEngine {
        if (!AudioEngine.instance) {
            AudioEngine.instance = new AudioEngine();
        }
        return AudioEngine.instance;
    }

    public play(src: string, onEnd?: () => void) {
        if (this.sound) {
            if (this.currentSrc === src) {
                this.sound.play(); // Resume if same sourced
                return;
            }
            this.sound.unload(); // Cleanup prev
        }

        this.currentSrc = src;
        this.sound = new Howl({
            src: [src],
            html5: true, // Force HTML5 Audio for large files
            onend: onEnd,
        });

        this.sound.play();
    }

    public pause() {
        this.sound?.pause();
    }

    public setVolume(vol: number) {
        Howler.volume(vol / 100);
    }

    public seek(val: number) {
        this.sound?.seek(val);
    }

    public getDuration() {
        return this.sound?.duration() || 0;
    }
}

export const audioEngine = AudioEngine.getInstance();
