const volume = document.getElementById("volume");
const bass = document.getElementById("bass");
const mid = document.getElementById("mid");
const treble = document.getElementById("treble");
const distortion = document.getElementById("distortion");
const delay = document.getElementById("delay");

const volumeOutput = document.getElementById("volume-output");
const bassOutput = document.getElementById("bass-output");
const midOutput = document.getElementById("mid-output");
const trebleOutput = document.getElementById("treble-output");
const distortionOutput = document.getElementById("distortion-output");
const delayOutput = document.getElementById("delay-output");

setupInitialValues();

volume.addEventListener("input", (evt) => {
    gainNode.gain.setTargetAtTime(parseFloat(evt.target.value), context.currentTime, 0.01);
    volumeOutput.innerText = evt.target.value;
});
volume.addEventListener("mouseenter", () => volumeOutput.hidden = false);
volume.addEventListener("mouseleave", () => volumeOutput.hidden = true);

bass.addEventListener("input", (evt) => {
    bassEQ.gain.setTargetAtTime(parseFloat(evt.target.value), context.currentTime, 0.01);
    bassOutput.innerText = evt.target.value;
});
bass.addEventListener("mouseenter", () => bassOutput.hidden = false);
bass.addEventListener("mouseleave", () => bassOutput.hidden = true);

mid.addEventListener("input", (evt) => {
    midEQ.gain.setTargetAtTime(parseFloat(evt.target.value), context.currentTime, 0.01);
    midOutput.innerText = evt.target.value;
});
mid.addEventListener("mouseenter", () => midOutput.hidden = false);
mid.addEventListener("mouseleave", () => midOutput.hidden = true);

treble.addEventListener("input", (evt) => {
    trebleEQ.gain.setTargetAtTime(parseFloat(evt.target.value), context.currentTime, 0.01);
    trebleOutput.innerText = evt.target.value;
});
treble.addEventListener("mouseenter", () => trebleOutput.hidden = false);
treble.addEventListener("mouseleave", () => trebleOutput.hidden = true);

distortion.addEventListener("input", (evt) => {
    distortionNode.curve = makeDistortionCurve(evt.target.value, sampleRate);
    distortionOutput.innerText = evt.target.value;
});
distortion.addEventListener("mouseenter", () => distortionOutput.hidden = false);
distortion.addEventListener("mouseleave", () => distortionOutput.hidden = true);

delay.addEventListener("input", (evt) => {
    // delayNode.delayTime.value = 1;
    // feedbackNode.gain.value = 0.8;
    // bypassNode.gain.value = 1;
    delayOutput.innerText = evt.target.value;
});
delay.addEventListener("mouseenter", () => delayOutput.hidden = false);
delay.addEventListener("mouseleave", () => delayOutput.hidden = true);