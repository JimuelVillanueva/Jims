document.addEventListener("DOMContentLoaded", function () {
    // MUSIC
    const audio = new Audio("hbd.mp3");
    audio.loop = true;
    let audioPlayed = false;

    const startScreen = document.getElementById("startScreen");
    const startBtn = document.getElementById("startBtn");

    startBtn.addEventListener("click", async function () {
        // 1. PLAY MUSIC
        try {
            await audio.play();
            audioPlayed = true; // Indicate that music has started playing
            console.log("Music playing ✔️");
        } catch (e) {
            console.log("Music blocked ❌", e);
        }

        // 2. HIDE START SCREEN
        startScreen.style.display = "none";

        // 3. START MICROPHONE + CANDLE FEATURES
        initCake();
    });

    function initCake() {
        const cake = document.querySelector(".cake");
        const candleCountDisplay = document.getElementById("candleCount");

        const MAX_CANDLES =5;  // limit to 3
        let candles = [];
        let audioContext;
        let analyser;
        let microphone;

        // Create "Proceed" button but hide it initially
        const proceedBtn = document.createElement("button");
        proceedBtn.textContent = "Proceed";
        proceedBtn.style.cssText = `
            display:none;
            padding: 15px 30px;
            font-size: 20px;
            border: none;
            border-radius: 10px;
            background: #ff8fab;
            color: white;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            position: fixed;
            top: 80%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
        `;
        document.body.appendChild(proceedBtn);

        proceedBtn.addEventListener("click", () => {
            // Save audio state before redirect
            if (audioPlayed) {
                localStorage.setItem("audioPlaying", "true");
            }

            window.location.href = "carousel.html";
        });

        function updateCandleCount() {
            const activeCandles = candles.filter(
                (candle) => !candle.classList.contains("out")
            ).length;
            candleCountDisplay.textContent = activeCandles;
        }

        function addCandle(left, top) {
            if (candles.length >= MAX_CANDLES) return; // silently ignore

            const candle = document.createElement("div");
            candle.className = "candle";
            candle.style.left = left + "px";
            candle.style.top = top + "px";

            const flame = document.createElement("div");
            flame.className = "flame";
            candle.appendChild(flame);

            cake.appendChild(candle);
            candles.push(candle);
            updateCandleCount();

            // Show "Proceed" button once 3 candles are placed
            if (candles.length === MAX_CANDLES) {
                proceedBtn.style.display = "block";
            }
        }

        // Place candles
        cake.addEventListener("click", function (event) {
            const rect = cake.getBoundingClientRect();
            const left = event.clientX - rect.left;
            const top = event.clientY - rect.top;
            addCandle(left, top);
        });

        function isBlowing() {
            const bufferLength = analyser.fftSize;
            const dataArray = new Uint8Array(bufferLength);
            analyser.getByteTimeDomainData(dataArray);

            let sumSquares = 0;
            for (let i = 0; i < bufferLength; i++) {
                const normalized = (dataArray[i] - 128) / 128;
                sumSquares += normalized * normalized;
            }

            const volume = Math.sqrt(sumSquares / bufferLength);
            return volume > 0.08; // adjust sensitivity
        }

        function blowOutCandles() {
            let blownOut = 0;

            if (candles.length > 0 &&
                candles.some(c => !c.classList.contains("out"))) {

                if (isBlowing()) {
                    candles.forEach((candle) => {
                        if (!candle.classList.contains("out") && Math.random() > 0.5) {
                            candle.classList.add("out");
                            blownOut++;
                        }
                    });
                }

                if (blownOut > 0) updateCandleCount();

                if (candles.every(c => c.classList.contains("out"))) {
                    triggerConfetti();
                    endlessConfetti();
                }
            }
        }

        // MICROPHONE ACCESS
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                analyser = audioContext.createAnalyser();
                microphone = audioContext.createMediaStreamSource(stream);

                microphone.connect(analyser);
                analyser.fftSize = 256;

                setInterval(blowOutCandles, 200);
            })
            .catch(function (err) {
                console.log("Mic error: " + err);
            });
    }
});

// CONFETTI
function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function endlessConfetti() {
    let count = 0;
    let confettiInterval = setInterval(function () {
        confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0 }
        });
        count++;
        if (count >= 10) clearInterval(confettiInterval);
    }, 1000);
}
