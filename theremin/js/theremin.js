(() => {
    "use strict"

    const chordMap = {
        "A": [220, 440, 880, 1760],
        "A#": [233.08, 466.16, 932.33, 1964.66],
        "B": [246.94, 493.88, 987.77, 1975.53],
        "C": [130.82, 261.63, 523.25, 1046.5],
        "C#": [138.59, 277.18, 554.37, 1108.73],
        "D": [146.83, 293.66, 587.33, 1174.66],
        "D#": [155.56, 311.13, 622.25, 1244.51],
        "E": [164.81, 329.63, 659.26, 1318.51],
        "F": [174.61, 349.23, 698.46, 1396.91],
        "F#": [185, 369.99, 739.99, 1479.98],
        "G": [196, 392, 783.99, 1567.98],
        "G#": [207.65, 415.3, 830.61, 1661.22]
    };

    const calculateXPosition = (freq) => {
        const minFreq = 120;
        const maxFreq = 2000;

        return ((freq - minFreq) / maxFreq) * window.innerWidth;
    }

    const init = () => {
        const letterThreshold = 4;

        const masterDiv = document.querySelector(".flex");
        Object.entries(chordMap).forEach(([chord, frequencies]) => {
            frequencies.forEach((freq) => {
                const xPos = calculateXPosition(freq);

                const parentDiv = document.createElement("div");
                parentDiv.classList.add("chord-group");

                const chordLetter = document.createElement("div");
                chordLetter.innerText = chord;
                chordLetter.classList.add("chord");
                chordLetter.style.left = `${xPos - letterThreshold}px`;
                if (masterDiv.children.length % 2) chordLetter.style.top = `20px`;

                const line = document.createElement("div");
                line.classList.add("line");
                line.style.left = `${xPos}px`;

                parentDiv.appendChild(chordLetter);
                parentDiv.appendChild(line);
                masterDiv.appendChild(parentDiv);
            });
        });
    };

    const calculateFrequency = (xPosition) => {
        // Set frequency borders bcs of human ears :D
        const minFreq = 120;
        const maxFreq = 2000;

        // Add extra threshold of minFreq bcs 20Hz is inaudible
        return ((xPosition / window.innerWidth) * maxFreq) + minFreq;
    };

    const calculateGain = (yPosition) => {
        const minGain = 0;
        const maxGain = 1;

        return 1 - ((yPosition / window.innerHeight) * maxGain) + minGain;
    };

    window.onload = () => {
        init();

        let oscillator = null;
        let mouseDown = false;

        // Create the context + Gain
        const context = new AudioContext();
        const gainNode = context.createGain();

        // Event handlers
        document.body.addEventListener("mousedown", (evt) => {
            mouseDown = true;

            // Create oscillator
            oscillator = context.createOscillator();

            // set frequency smoothly
            oscillator.frequency.setTargetAtTime(calculateFrequency(evt.clientX), context.currentTime, 0.01);
            gainNode.gain.setTargetAtTime(calculateGain(evt.clientY), context.currentTime, 0.01);

            // Connect to our gain before connecting to speakers
            oscillator.connect(gainNode);
            gainNode.connect(context.destination);

            // Generate a tone
            oscillator.start(context.currentTime); // Start now
        });

        document.body.addEventListener("mousemove", (evt) => {
            if (mouseDown) {
                oscillator.frequency.setTargetAtTime(calculateFrequency(evt.clientX), context.currentTime, 0.01);
                gainNode.gain.setTargetAtTime(calculateGain(evt.clientY), context.currentTime, 0.01);
            }
        })

        document.body.addEventListener("mouseup", () => {
            if (oscillator) {
                mouseDown = false;
                oscillator.stop(context.currentTime);
                oscillator.disconnect();
            }
        });

    };

})();