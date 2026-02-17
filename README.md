# The Unknown: Web-Based Narrative Engine

This project is a lightweight, event-driven narrative engine designed to address the computational overhead and iteration latency associated with native game engines (e.g., Unity, Unreal) in 2D interactive storytelling.

## Project Overview

"The Unknown" serves as a high-fidelity prototype demonstrating the efficiency of using the Document Object Model (DOM) as a rendering engine. By utilizing standard web technologies, the system eliminates the resource-heavy "game loop" found in traditional engines, offering a battery-efficient and hardware-agnostic solution for visual novels and interactive fiction.

## Technical Architecture

The engine is built on a decoupled Model-View-Controller (MVC) pattern:

* JSON-based narrative data structures handling dialogue nodes and state flags.
* Semantic HTML5 and CSS3 with hardware-accelerated compositing (Glassmorphism UI).
* A JavaScript (ES6+) Finite State Machine (FSM) managing game logic and user input.

## Key Features

* Changes to code or assets are reflected instantly via hot-reloading, reducing development latency by approximately 17x compared to native compilation.
* The system remains in an idle low-power state until user interaction occurs, significantly reducing CPU/GPU usage.
* Implements non-blocking resource acquisition to prevent UI freezing during scene transitions.
* UI elements are positioned based on Fitts's Law to minimize interaction cost and cognitive load.
* Custom asynchronous text delivery system with instant-skip functionality.

## Technologies Used

* HTML5, CSS3, JavaScript (ES6+)
* DOM & CSS Object Model (No Canvas/WebGL required for UI)
* Vanilla JavaScript Custom Events

## Setup and Usage

1.  Clone the repository.
2.  Ensure all assets are in the `/assets` directory.
3.  Open `index.html` in any modern web browser (Chrome, Firefox, Safari).
4.  No build tools or installation required.
