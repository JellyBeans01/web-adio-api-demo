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
        console.log("switch to clean")
        isCleanChannel = true;
        cleanLed.classList.add("led-on");
        cleanLed2.classList.add("led-on");

        leadLed.classList.remove("led-on");
        leadLed2.classList.remove("led-on");
    }
});

lead.addEventListener("click", () => {
    if (isCleanChannel && poweredOn) {
        console.log("switch to lead")
        isCleanChannel = false;
        leadLed.classList.add("led-on");
        leadLed2.classList.add("led-on");

        cleanLed.classList.remove("led-on");
        cleanLed2.classList.remove("led-on");
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
    // range = [0, 400]
    const value = parseFloat(evt.target.value);

    if (value > 0 && poweredOn) efxLed.classList.add("led-on");
    else efxLed.classList.remove("led-on");

    turnKnob(efxKnob, value / 40);
});

delay.addEventListener("input", (evt) => {
    // range = [0, 200]
    const value = parseFloat(evt.target.value);

    if (value > 0 && poweredOn) delayLed.classList.add("led-on");
    else delayLed.classList.remove("led-on");

    turnKnob(delayKnob, value / 20);
});

reverb.addEventListener("input", (evt) => {
    // range = [0, 200]
    const value = parseFloat(evt.target.value);

    if (value > 0 && poweredOn) reverbLed.classList.add("led-on");
    else reverbLed.classList.remove("led-on");

    turnKnob(reverbKnob, value / 20);
});

cleanVolume.addEventListener("input", (evt) => {
    // range = [0, 1]
    const value = parseFloat(evt.target.value);
    turnKnob(cleanVolumeKnob, value * 10);
});

leadVolume.addEventListener("input", (evt) => {
    // range = [0, 1]
    const value = parseFloat(evt.target.value);
    turnKnob(leadVolumeKnob, value * 10);
});

masterVolume.addEventListener("input", (evt) => {
    // range = [0, 1]
    const value = parseFloat(evt.target.value);
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
    turnPresetKnob(value);
});
