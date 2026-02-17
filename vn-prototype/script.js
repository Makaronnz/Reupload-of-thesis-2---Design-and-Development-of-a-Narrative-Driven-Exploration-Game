/**
 * The Unknown - Web-Based Narrative Engine
 * MVC Architecture + Event-Driven Core
 */

// MODEL
class NarrativeModel {
    constructor() {
        this.dialogueData = [
            { id: 1, name: "Unknown", text: "..." },
            { id: 2, name: "Unknown", text: "Where am I? The air feels... heavy." },
            { id: 3, name: "System", text: "Initializing narrative engine sequence..." },
            { id: 4, name: "System", text: "DOM Rendering: Online.\nAudio Subsystem: Offline." },
            { id: 5, name: "Guide", text: "Welcome. This interface is rendered entirely via the DOM." },
            { id: 6, name: "Guide", text: "Clicking during text generation will instantly complete the line." },
            { id: 7, name: "Guide", text: "Clicking again will advance to the next node." },
            { id: 8, name: "Guide", text: "End of prototype stream." }
        ];
        this.currentIndex = 0;
    }

    getCurrentNode() {
        if (this.currentIndex < this.dialogueData.length) {
            return this.dialogueData[this.currentIndex];
        }
        return null;
    }

    advance() {
        if (this.currentIndex < this.dialogueData.length - 1) {
            this.currentIndex++;
            return true;
        }
        return false;
    }

    reset() {
        this.currentIndex = 0;
    }
}

// VIEW
class NarrativeView {
    constructor() {
        this.nameEl = document.getElementById('character-name');
        this.textEl = document.getElementById('dialogue-text');
        this.container = document.getElementById('game-container');
        this.isTyping = false;
        this.typingSpeed = 30; // ms per char
        this.typingInterval = null;
        this.fullText = "";
    }

    renderNode(node) {
        if (!node) return;

        this.nameEl.textContent = node.name;
        this.textEl.textContent = ""; // Clear text for typing
        this.fullText = node.text;
        this.isTyping = true;

        let charIndex = 0;

        // Clear any existing interval
        if (this.typingInterval) clearInterval(this.typingInterval);

        this.typingInterval = setInterval(() => {
            if (charIndex < this.fullText.length) {
                this.textEl.textContent += this.fullText.charAt(charIndex);
                charIndex++;
            } else {
                this.finishTyping();
            }
        }, this.typingSpeed);
    }

    finishTyping() {
        clearInterval(this.typingInterval);
        this.textEl.textContent = this.fullText;
        this.isTyping = false;
        this.typingInterval = null;

        // Dispatch event that typing is complete
        document.dispatchEvent(new CustomEvent('narrative-typing-complete'));
    }

    skipTyping() {
        if (this.isTyping) {
            this.finishTyping();
            return true;
        }
        return false;
    }
}

// CONTROLLER (ENGINE)
class Engine {
    constructor() {
        this.model = new NarrativeModel();
        this.view = new NarrativeView();

        this.state = 'IDLE'; // IDLE, TYPING, WAITING_FOR_INPUT

        this.init();
    }

    init() {
        // Initial Render
        this.processNode();

        // Input Handling (Global Click)
        // Using pointerup for better responsiveness on some devices, or click
        document.getElementById('game-container').addEventListener('click', (e) => {
            // Ignore UI buttons
            if (e.target.tagName === 'BUTTON') return;
            this.handleInput();
        });

        // Listen for internal events if needed
        document.addEventListener('narrative-typing-complete', () => {
            this.state = 'WAITING_FOR_INPUT';
        });
    }

    processNode() {
        const node = this.model.getCurrentNode();
        if (node) {
            this.state = 'TYPING';
            this.view.renderNode(node);
        } else {
            console.log("End of narrative.");
        }
    }

    handleInput() {
        if (this.state === 'TYPING') {
            // Instant skip
            this.view.skipTyping();
            // State updates to WAITING_FOR_INPUT via event listener above
        } else if (this.state === 'WAITING_FOR_INPUT') {
            // Advance narrative
            if (this.model.advance()) {
                this.processNode();
            } else {
                // End of demo options
                if (confirm("End of narrative prototype. Restart?")) {
                    this.model.reset();
                    this.processNode();
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("The Unknown Engine: Initializing...");
    const gameEngine = new Engine();
    // Expose for debugging
    window.gameEngine = gameEngine;
});
