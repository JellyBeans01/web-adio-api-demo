setupInitialValues = () => {
    volumeOutput.innerText = volume.value;
    volumeOutput.hidden = true;

    bassOutput.innerText = bass.value;
    bassOutput.hidden = true;

    midOutput.innerText = mid.value;
    midOutput.hidden = true;

    trebleOutput.innerText = treble.value;
    trebleOutput.hidden = true;

    distortionOutput.innerText = distortion.value;
    distortionOutput.hidden = true;

    delayOutput.innerText = delay.value;
    delayOutput.hidden = true;
}

convertToMono = (context, input) => {
    const splitter = context.createChannelSplitter(2);
    const merger = context.createChannelMerger(2);

    input.connect(splitter);
    splitter.connect(merger, 0, 0);
    splitter.connect(merger, 0, 1);
    return merger;
};