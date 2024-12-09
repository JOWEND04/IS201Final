function calculateResult() {
    const form = document.getElementById('quiz-form');
    const answers = { E: 0, I: 0, T: 0, F: 0, J: 0, P: 0 };

    // Collect answers
    Array.from(form.elements).forEach((element) => {
        if (element.checked) {
            answers[element.value]++;
        }
    });

    // Determine personality type
    const personality = `${answers.E > answers.I ? 'E' : 'I'}${answers.T > answers.F ? 'T' : 'F'}${answers.J > answers.P ? 'J' : 'P'}`;

    // Descriptions
    const descriptions = {
        ETJ: "You're a natural-born leader who values structure and efficiency.",
        EFJ: "You're a social butterfly who loves helping others and fostering harmony.",
        ITJ: "You're a quiet visionary who thrives on organization and independence.",
        IFJ: "You're a caring and introspective individual who cherishes deep connections.",
        ETP: "You're adventurous, innovative, and ready to explore new opportunities.",
        EFP: "You're a free spirit with a flair for creativity and emotional connection.",
        ITP: "You're a curious thinker who values flexibility and intellectual exploration.",
        IFP: "You're a deeply empathetic and imaginative person who treasures authenticity."
    };

    // Display result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h3>Your Personality Type: <strong>${personality}</strong></h3>
        <p>${descriptions[personality] || "You're a unique blend of qualities! Keep being you."}</p>
    `;

    // Generate share buttons with pre-defined styles
    const shareDiv = document.getElementById('share-buttons');
    const shareText = `I just discovered my personality type: ${personality}! Find out yours by taking this fun quiz!`;
    const shareURL = encodeURIComponent(location.href);
    shareDiv.innerHTML = `
        <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareURL}" target="_blank">
            <button class="btn twitter-btn">Share on Twitter</button>
        </a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${shareURL}" target="_blank">
            <button class="btn facebook-btn">Share on Facebook</button>
        </a>
    `;
}

function shareResult(platform) {
    const result = document.getElementById("result").innerText;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`I just discovered my personality type: ${result}! Take the quiz here:`);

    let shareURL = '';
    if (platform === 'facebook') {
        shareURL = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === 'twitter') {
        shareURL = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    }

    if (shareURL) {
        window.open(shareURL, '_blank');
    } else {
        alert("Sharing not supported for this platform.");
    }
}

function validateForm() {
    const form = document.getElementById("quiz-form");
    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].tagName === 'SELECT' && !form.elements[i].value) {
            alert("Please answer all questions.");
            return false;
        }
    }
    return true;
}
