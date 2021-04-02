const bass = document.getElementById("bass");
const mid = document.getElementById("mid");
const treble = document.getElementById("treble");
const efx = document.getElementById("efx");
const delay = document.getElementById("delay");
const reverb = document.getElementById("reverb");
const cleanVolume = document.getElementById("clean-volume");
const leadVolume = document.getElementById("lead-volume");
const masterVolume = document.getElementById("master-volume");
const gain = document.getElementById("gain");
const preset = document.getElementById("preset");

const bassKnob = document.getElementById("bass-knob");
const midKnob = document.getElementById("middle-knob");
const trebleKnob = document.getElementById("treble-knob");
const efxKnob = document.getElementById("efx-knob");
const delayKnob = document.getElementById("delay-knob");
const reverbKnob = document.getElementById("reverb-knob");
const cleanVolumeKnob = document.getElementById("volume-clean");
const leadVolumeKnob = document.getElementById("volume-lead");
const masterVolumeKnob = document.getElementById("volume-master");
const gainKnob = document.getElementById("gain-knob");
const presetKnob = document.getElementById("preset-knob");

const clean = document.getElementById("clean-btn");
const lead = document.getElementById("lead-btn");

let isCleanChannel = true;

clean.addEventListener("click", () => {
    if (!isCleanChannel && poweredOn) {
        console.log(`[CHANNEL] Clean, volume: ${cleanVolume.value * 100}%`);
        isCleanChannel = true;
        cleanLed.classList.add("led-on");
        cleanLed2.classList.add("led-on");

        leadLed.classList.remove("led-on");
        leadLed2.classList.remove("led-on");

        channelVolume.gain.setTargetAtTime(cleanVolume.value, context.currentTime, 0.01);

        checkEffects(parseFloat(preset.value), isCleanChannel);
    }
});

lead.addEventListener("click", () => {
    if (isCleanChannel && poweredOn) {
        console.log(`[CHANNEL] Lead, volume: ${leadVolume.value * 100}%`);
        isCleanChannel = false;
        leadLed.classList.add("led-on");
        leadLed2.classList.add("led-on");

        cleanLed.classList.remove("led-on");
        cleanLed2.classList.remove("led-on");

        channelVolume.gain.setTargetAtTime(leadVolume.value, context.currentTime, 0.01);

        checkEffects(parseFloat(preset.value), isCleanChannel);
    }
});

bass.addEventListener("input", (evt) => {
    // range = [-10, 10]
    const value = parseFloat(evt.target.value);
    bassEQ.gain.setTargetAtTime(value, context.currentTime, 0.01);
    turnKnob(bassKnob, (value + 10) / 2);
});

mid.addEventListener("input", (evt) => {
    // range = [-10, 10]
    const value = parseFloat(evt.target.value);
    midEQ.gain.setTargetAtTime(value, context.currentTime, 0.01);
    turnKnob(midKnob, (value + 10) / 2);
});

treble.addEventListener("input", (evt) => {
    // range = [-10, 10]
    const value = parseFloat(evt.target.value);
    trebleEQ.gain.setTargetAtTime(value, context.currentTime, 0.01);
    turnKnob(trebleKnob, (value + 10) / 2);
});

efx.addEventListener("input", (evt) => {
    // range = [0, 433]
    const value = parseFloat(evt.target.value);

    // 0 = off; 101|201|301|401 = 1 (you cannot disable the effect when the knob is turned)
    if (value === 0) efxDestroy();
    else if (value > 0 && value <= 100) efxChorus(value);
    else if (value > 100 && value <= 200) efxFlanger(value - 100);
    else if (value > 200 && value <= 300) efxPhaser(value - 200);
    else if (value > 300 && value <= 400) efxTremolo(value - 300);
    else efxHeavyOctave((value - 400) * 3);

    checkLEDState(efxLed, value > 0 && poweredOn);
    turnKnob(efxKnob, value / 43.3);
});

delay.addEventListener("input", (evt) => {
    // range = [0, 200]
    const value = parseFloat(evt.target.value);

    if (value === 0) delayDestroy();
    else if (value > 0 && value <= 100) delayWarm(value);
    else delayClear(value - 100);

    checkLEDState(delayLed, value > 0 && poweredOn);
    turnKnob(delayKnob, value / 20);
});

reverb.addEventListener("input", async (evt) => {
    // range = [0, 200]
    const value = parseFloat(evt.target.value);

    if (value === 0) reverbDestroy();
    else if (value > 0 && value <= 100) reverbSpring(value);
    else reverbPlate(value - 100);

    checkLEDState(reverbLed, value > 0 && poweredOn);
    turnKnob(reverbKnob, value / 20);
});

cleanVolume.addEventListener("input", (evt) => {
    // range = [0, 1]
    const value = parseFloat(evt.target.value);
    if (isCleanChannel) channelVolume.gain.setTargetAtTime(value, context.currentTime, 0.01);
    turnKnob(cleanVolumeKnob, value * 10);
});

leadVolume.addEventListener("input", (evt) => {
    // range = [0, 1]
    const value = parseFloat(evt.target.value);
    if (!isCleanChannel) channelVolume.gain.setTargetAtTime(value, context.currentTime, 0.01);
    turnKnob(leadVolumeKnob, value * 10);
});

masterVolume.addEventListener("input", (evt) => {
    // range = [0, 1]
    const value = parseFloat(evt.target.value);
    masterVolumeNode.gain.setTargetAtTime(value, context.currentTime, 0.01);
    turnKnob(masterVolumeKnob, value * 10);
});

gain.addEventListener("input", (evt) => {
    // range = [0, 1]
    const value = parseFloat(evt.target.value);
    gainNode.gain.setTargetAtTime(value, context.currentTime, 0.01);
    turnKnob(gainKnob, value * 10);
});

preset.addEventListener("input", (evt) => {
    // range = [0, 9]
    const value = parseFloat(evt.target.value);
    checkEffects(value, isCleanChannel);
    turnPresetKnob(value);
});
