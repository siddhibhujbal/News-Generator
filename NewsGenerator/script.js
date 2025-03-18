// Get elements
const input = document.getElementById("input");
const errorMessage = document.getElementById("error-message");
const loadingMessage = document.getElementById("loading-message");
const charCount = document.getElementById("charCount");
const darkModeToggle = document.getElementById("darkModeToggle");
const generateNewsButton = document.getElementById("generateNews");
const clearNewsButton = document.getElementById("clearNews");
const resultDiv = document.getElementById("result");

// Live Character Count Update
input.addEventListener("input", () => {
    charCount.textContent = input.value.length + " / 100";
});

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Generate News Function
async function getNews() {
    if (input.value.trim() === "") {
        errorMessage.textContent = "Please enter a topic before generating news.";
        return;
    } else {
        errorMessage.textContent = "";
    }

    loadingMessage.textContent = "Loading...";
    resultDiv.innerHTML = ""; // Clear previous results

    const API_KEY = "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";
    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + API_KEY,
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "user",
                        content: "Generate news on topic " + input.value + " in div tag with css no html and body tag",
                    },
                ],
            }),
        });

        const body = await response.json();
        console.log(body);

        loadingMessage.textContent = ""; // Remove loading message

        if (body.choices && body.choices.length > 0) {
            const newDiv = document.createElement("div");
            newDiv.innerHTML = body.choices[0].message.content;
            newDiv.classList.add("fade-in"); // Add animation class
            resultDiv.appendChild(newDiv);
        } else {
            errorMessage.textContent = "Failed to generate news. Please try again.";
        }
    } catch (error) {
        errorMessage.textContent = "An error occurred. Please check your internet connection.";
        loadingMessage.textContent = "";
    }
}

// Attach Event Listener to Generate News Button
generateNewsButton.addEventListener("click", getNews);

// Clear News Functionality
clearNewsButton.addEventListener("click", () => {
    resultDiv.innerHTML = ""; // Clear news results
    errorMessage.textContent = ""; // Clear error message
    loadingMessage.textContent = ""; // Clear loading message
});
