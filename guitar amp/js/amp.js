"use strict"

const visualiser = document.getElementById("visualiser");
const powerBtn = document.getElementById("power-btn");

const cleanLed = document.getElementById("clean-led");
const leadLed = document.getElementById("lead-led");
const cleanLed2 = document.getElementById("clean-led-2");
const leadLed2 = document.getElementById("lead-led-2");
const efxLed = document.getElementById("efx-led");
const delayLed = document.getElementById("delay-led");
const reverbLed = document.getElementById("reverb-led");

let poweredOn = false;
const context = new AudioContext({ latencyHint: "interactive" });
const analyserNode = new AnalyserNode(context, { fftSize: 256 });

const masterVolumeNode = new GainNode(context, { gain: masterVolume.value });
const gainNode = new GainNode(context, { gain: gain.value });


const distortionNode = context.createWaveShaper();
const delayNode = context.createDelay(100);
const feedbackNode = context.createGain();
const bypassNode = context.createGain();
const reverbNode = context.createConvolver();

let source = null;
const sampleRate = 44100;

initialiseButtonRotations();


/*
    Filters
 ==================================================================================================================== */
const bassEQ = new BiquadFilterNode(context, {
    type: "lowshelf",
    frequency: 500,
    gain: bass.value,
});
const midEQ = new BiquadFilterNode(context, {
    type: "peaking",
    Q: Math.SQRT1_2,
    frequency: 1500,
    gain: mid.value,
});
const trebleEQ = new BiquadFilterNode(context, {
    type: "highshelf",
    frequency: 3000,
    gain: treble.value,
});

/*
    Setup Context
 ==================================================================================================================== */
const setupContext = async () => {
    const guitar = await getInput();

    // workaround for interacting with the page before playing audio error
    if (context.state === "suspended") await context.resume();

    source = context.createMediaStreamSource(guitar);
    source = convertToMono(context, source);

    source
        .connect(bassEQ)
        .connect(midEQ)
        .connect(trebleEQ)
        .connect(masterVolumeNode)
        .connect(distortionNode)
        .connect(reverbNode)
        // .connect(delayNode)
        // .connect(feedbackNode)
        // .connect(delayNode)
        // .connect(bypassNode)
        .connect(analyserNode)
};

const getInput = () => {
    return navigator.mediaDevices.getUserMedia({
        // Disable auto audio clean from browser
        audio: {
            echoCancellation: false,
            autoGainControl: false,
            noiseSuppression: false,
            latency: 0,
        },
    });
};


/*
    Visualiser
 ==================================================================================================================== */
const drawVisualiser = () => {
    requestAnimationFrame(drawVisualiser);

    const bufferLength = analyserNode.frequencyBinCount; // Determines how many diff frequencies we are measuring
    const dataArray = new Uint8Array(bufferLength);
    // Array is populated with the value corresponding how loud the particular frequency is
    analyserNode.getByteFrequencyData(dataArray);

    // Setup canvas
    const { width, height } = visualiser;
    const barWidth = width / bufferLength;
    const canvasContext = visualiser.getContext("2d");
    canvasContext.clearRect(0, 0, width, height);

    // Draw the bargraphs
    dataArray.forEach((amplitude, index) => {
        const scaledValue = amplitude / 255 // Returns a value between 0 and 1
        const y  = scaledValue * (height / 2); // Bars will only go halfway up the page
        const x = barWidth * index;

        canvasContext.fillStyle = `hsl(${y / height * 400}, 100%, 50%)`;
        canvasContext.fillRect(x, height - y, barWidth, y);
    });
};

const resize = () => {
    visualiser.width = visualiser.clientWidth * window.devicePixelRatio;
    visualiser.height = visualiser.clientHeight * window.devicePixelRatio;
}

window.addEventListener("resize", resize);

/*
    Power On / Off
 ==================================================================================================================== */
powerBtn.addEventListener("click", () => {
    poweredOn = !poweredOn;

    if (poweredOn) {
        powerBtn.classList.add("powered-on");
        cleanLed.classList.add("led-on");
        cleanLed2.classList.add("led-on");

        if (parseFloat(efx.value) > 0) efxLed.classList.add("led-on");
        if (parseFloat(delay.value) > 0) delayLed.classList.add("led-on");
        if (parseFloat(reverb.value) > 0) reverbLed.classList.add("led-on");

        setupContext();
        resize();
        drawVisualiser();
    } else {
        powerBtn.classList.remove("powered-on");
        cleanLed.classList.remove("led-on");
        cleanLed2.classList.remove("led-on");
        leadLed.classList.remove("led-on");
        leadLed2.classList.remove("led-on");
        efxLed.classList.remove("led-on");
        delayLed.classList.remove("led-on");
        reverbLed.classList.remove("led-on");

        source.disconnect();
        source = null;
    }
});
