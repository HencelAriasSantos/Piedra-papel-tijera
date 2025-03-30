// Select DOM elements once
const resultadoElement = document.querySelector("#resultado");
const rachaElement = document.querySelector("#Racha"); // Use the correct ID selector

// Initialize scores
let puntajeJugador = 0;
let puntajeComputadora = 0;

function jugar(opcionJugador) {
	// Renamed parameter for clarity
	const opcionesPosibles = ["piedra", "papel", "tijera"];
	// Correct random selection logic: use opcionesPosibles array
	const eleccionComputadora =
		opcionesPosibles[Math.floor(Math.random() * opcionesPosibles.length)];

	// Determine the winner and update scores
	if (opcionJugador === eleccionComputadora) {
		resultadoElement.textContent = `Empate! Ambos eligieron ${opcionJugador}.`;
	} else if (
		(opcionJugador === "piedra" && eleccionComputadora === "tijera") ||
		(opcionJugador === "papel" && eleccionComputadora === "piedra") ||
		(opcionJugador === "tijera" && eleccionComputadora === "papel")
	) {
		resultadoElement.textContent = `¡Ganaste! ${opcionJugador} vence a ${eleccionComputadora}.`;
		puntajeJugador++; // Increment player score
	} else {
		resultadoElement.textContent = `Perdiste. ${eleccionComputadora} vence a ${opcionJugador}.`;
		puntajeComputadora++; // Increment computer score
	}

	// Update and display the score after each round
	actualizarRacha();
}

function actualizarRacha() {
	// Use the globally selected element and updated scores
	rachaElement.textContent = `Jugador: ${puntajeJugador} ~ Computadora: ${puntajeComputadora}`;
}

// --- Theme Toggle Logic ---

// Select the theme control elements
const themeLightButton = document.getElementById('theme-light');
const themeDarkButton = document.getElementById('theme-dark');
const themeBlueButton = document.getElementById('theme-blue');
const themeGreenButton = document.getElementById('theme-green');

const rootElement = document.documentElement; // The <html> element
const validThemes = ['light', 'dark', 'blue', 'green']; // Define valid themes

// Function to apply the theme by setting the data-theme attribute
function applyTheme(theme) {
	// Ensure the theme is valid, default to 'light' if not
	const themeToApply = validThemes.includes(theme) ? theme : 'light';
	rootElement.setAttribute('data-theme', themeToApply);

	// Optionally, update button states or provide visual feedback here
	// (e.g., highlight the active theme button)
}

// Function to handle theme selection and save preference
function selectTheme(theme) {
	applyTheme(theme);
	// Save preference to localStorage
	try {
		localStorage.setItem('themePreference', theme);
	} catch (e) {
		console.error("Could not save theme preference to localStorage.", e);
	}
}

// Function to initialize the theme on page load
function initializeTheme() {
	let preferredTheme = 'light'; // Default to light
	try {
		const savedTheme = localStorage.getItem('themePreference');
		if (validThemes.includes(savedTheme)) { // Check if saved theme is valid
			preferredTheme = savedTheme;
		} else {
			// Optional: Check OS preference as a fallback if no valid theme saved
			// const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
			// if (prefersDarkScheme.matches) {
			//     preferredTheme = 'dark';
			// }
		}
	} catch (e) {
		console.warn("Could not access localStorage.", e);
	}
	applyTheme(preferredTheme); // Apply the determined theme
}

// Add Event Listeners to the theme buttons
if (themeLightButton) {
	themeLightButton.addEventListener('click', () => selectTheme('light'));
}
if (themeDarkButton) {
	themeDarkButton.addEventListener('click', () => selectTheme('dark'));
}
if (themeBlueButton) {
	themeBlueButton.addEventListener('click', () => selectTheme('blue'));
}
if (themeGreenButton) {
	themeGreenButton.addEventListener('click', () => selectTheme('green'));
}

// Remove or comment out the old theme toggle button logic
// const themeToggleButton = document.getElementById('theme-toggle-button');
// ... old toggleTheme, old event listener, etc. ...

// --- Run theme initialization logic ---
initializeTheme();


