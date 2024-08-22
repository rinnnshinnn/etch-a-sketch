const container = document.querySelector("#container");
const changeColorButton = document.querySelector("#penColor");
const toggleColorModeButton = document.querySelector("#toggleColorMode");
const gridSizeButton = document.querySelector("#gridSize");
const eraserButton = document.querySelector("#eraser");

let currentColor = 'red'; // Default color
let isRandomColorMode = true; // Start in random color mode
let isDrawing = false; // Track if drawing is enabled
let isErasing = false;

// Function to create grid
function createGrid(size) {
    container.innerHTML = "<div></div>".repeat(size * size);
    const squares = document.querySelectorAll("#container div");
    squares.forEach(square => {
        square.addEventListener("mouseover", (event) => {
            if (isDrawing) {
                if (isErasing) {
                    event.target.style.backgroundColor = "#fdf5e6";
                } else {
                    event.target.style.backgroundColor = isRandomColorMode ? getRandomColor() : currentColor;
                }
            }
        });
        square.style.width = `calc(100% / ${size})`;
        square.style.height = `calc(100% / ${size})`;
        square.classList.add("border-wrapper");
    });
}

// Function to generate a random RGB color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Change the pen color to a new random color
changeColorButton.addEventListener("click", () => {
    currentColor = getRandomColor();
});

// Toggle between random color mode and single color mode
toggleColorModeButton.addEventListener("click", () => {
    isRandomColorMode = !isRandomColorMode;
    toggleColorModeButton.textContent = isRandomColorMode ? "Switch to Single Color Mode" : "Switch to Random Color Mode";
});

// Change the grid size
gridSizeButton.addEventListener("click", () => {
    let newSize;
    do {
        const userInput = prompt("Enter new grid size (e.g., 50 for 50x50):");
        if (userInput === null) {
            return; // Exit if the user cancels the prompt
        }
        newSize = parseInt(userInput, 10);
    } while (isNaN(newSize) || newSize < 1 || newSize > 100);

    if (newSize) {
        createGrid(newSize);
    }
});

// Toggle drawing on and off with a click
container.addEventListener("click", () => {
    isDrawing = !isDrawing;
});

eraserButton.addEventListener("click", () => {
    isErasing = !isErasing;
    eraserButton.textContent = isErasing ? "Switch to Drawing Mode" : "Switch to Eraser Mode";
});

// Initial grid creation
createGrid(16);


