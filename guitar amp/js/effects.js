const makeDistortionCurve = (amount, sampleRate) => {
    let curve = new Float32Array(sampleRate);

    for (let i = 0; i < sampleRate; ++i) {
        const x = i * 2 / sampleRate - 1;
        curve[i] = (3 + amount) * Math.atan(Math.sinh(x * 0.25) * 5) / (Math.PI + amount * Math.abs(x));
    }

    return curve;
};

const createDelay = () => {

}