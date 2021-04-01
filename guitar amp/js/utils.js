convertToMono = (context, input) => {
    const splitter = context.createChannelSplitter(2);
    const merger = context.createChannelMerger(2);

    input.connect(splitter);
    splitter.connect(merger, 0, 0);
    splitter.connect(merger, 0, 1);
    return merger;
};

const turnKnob = (knob, scaledToTen) => {
    // range = [-145, 145]
    const degrees = (290 * scaledToTen / 10) - 145;
    knob.style.transform = `rotate(${degrees}deg)`;
};

const turnPresetKnob = (inputValue) => {
    // range = [-150, 120]
    const degrees = ((270 * inputValue) / 9) - 150;
    presetKnob.style.transform = `rotate(${degrees}deg)`;
}

const initialiseButtonRotations = () => {
    turnKnob(bassKnob, (parseFloat(bass.value) + 10) / 2);
    turnKnob(midKnob, (parseFloat(mid.value) + 10) / 2);
    turnKnob(trebleKnob, (parseFloat(treble.value) + 10) / 2);
    turnPresetKnob(parseFloat(preset.value));
};