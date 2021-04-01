const makeDistortionCurve = (amount, sampleRate) => {
    let curve = new Float32Array(sampleRate);

    for (let i = 0; i < sampleRate; ++i) {
        const x = i * 2 / sampleRate - 1;
        curve[i] = (3 + amount) * Math.atan(Math.sinh(x * 0.25) * 5) / (Math.PI + amount * Math.abs(x));
    }

    return curve;
};

const getReverbEffect = (context, impuleUrl) => {
    return fetch(impuleUrl)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => context.decodeAudioData(arrayBuffer));
};

checkEffects = (presetValue, isCleanChannel) => {
    if (presetValue === 1 && !isCleanChannel) distortionNode.curve = makeDistortionCurve(400, sampleRate);
    else distortionNode.curve = makeDistortionCurve(0, sampleRate);
};