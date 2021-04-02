const makeDistortionCurve = (amount, sampleRate) => {
    let curve = new Float32Array(sampleRate);

    for (let i = 0; i < sampleRate; ++i) {
        const x = i * 2 / sampleRate - 1;
        curve[i] = (3 + amount) * Math.atan(Math.sinh(x * 0.25) * 5) / (Math.PI + amount * Math.abs(x));
    }

    return curve;
};

const efxDestroy = () => console.log(`[EFX] Off`);
const efxChorus = (value) => console.log(`[EFX] Chorus: ${value}%`);
const efxFlanger = (value) => console.log(`[EFX] Flanger: ${value}%`);
const efxPhaser = (value) => console.log(`[EFX] Phaser: ${value}%`);
const efxTremolo = (value) => console.log(`[EFX] Tremolo: ${value}%`);
const efxHeavyOctave = (value) => console.log(`[EFX] Heavy Octave: ${value}%`);

const delayDestroy = () => console.log("[DELAY] Off");
const delayWarm = (value) => console.log(`[DELAY] Warm: ${value}`);
const delayClear = (value) => console.log(`[DELAY] Clear: ${value}`);

const reverbDestroy = () => console.log("[REVERB] Off");
const reverbSpring = (value) => console.log(`[REVERB] Spring: ${value}`);
const reverbPlate = (value) => console.log(`[REVERB] Plate: ${value}`);

checkEffects = (presetValue, isCleanChannel) => {
    // if (presetValue === 1 && !isCleanChannel) distortionNode.curve = makeDistortionCurve(400, sampleRate);
    // else distortionNode.curve = makeDistortionCurve(0, sampleRate);
    if (!isCleanChannel) {
        switch (presetValue) {
            case 0:
                distortionNode.curve = makeDistortionCurve(0, sampleRate);
                break;
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                distortionNode.curve = makeDistortionCurve(400, sampleRate);
                break;

            case 8:
                distortionNode.curve = makeDistortionCurve(1200, sampleRate);
                break;

            case 9:
                distortionNode.curve = makeDistortionCurve(0, sampleRate);
                break;
        }
    } else {
        distortionNode.curve = makeDistortionCurve(0, sampleRate);
    }
};