const makeDistortionCurve = (amount, sampleRate) => {
    let curve = new Float32Array(sampleRate);

    for (let i = 0; i < sampleRate; ++i) {
        const x = i * 2 / sampleRate - 1;
        curve[i] = (3 + amount) * Math.atan(Math.sinh(x * 0.25) * 5) / (Math.PI + amount * Math.abs(x));
    }

    return curve;
};

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