const gridContainer = document.querySelector("#container");
const penColorButton = document.querySelector("#penColor");
const toggleColorModeButton = document.querySelector("#toggleColorMode");
const gridSizeButton = document.querySelector("#gridSize");
const eraserButton = document.querySelector("#eraser");
const darkenModeButton = document.querySelector("#darkenMode");

let penColor = 'black'; 
let isRandomColorMode = false; 
let isDrawingEnabled = false; 
let isEraserEnabled = false;
let isDarkenModeEnabled = false; 
let isMouseDown = false;

function createGrid(size) {
    gridContainer.innerHTML = ""; // Clear any existing grid
    for (let i = 0; i < size * size; i++) {
        const gridCell = document.createElement("div");
        gridCell.style.width = `calc(100% / ${size})`;
        gridCell.style.height = `calc(100% / ${size})`;

        const overlay = document.createElement("div"); // Create overlay for darkening effect
        overlay.style.backgroundColor = "#000";
        overlay.style.opacity = 0;
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.pointerEvents = "none"; // Make overlay non-interactive
        gridCell.appendChild(overlay);

        /*
        gridCell.addEventListener("mouseover", (event) => {
            if (isDrawingEnabled && isMouseDown) {
                const overlay = event.target.firstChild;
                if (isEraserEnabled) {
                    overlay.style.opacity = 0; // Clear darkening effect
                    event.target.style.backgroundColor = "#fdf5e6"; // Reset background color
                } else if (isDarkenModeEnabled) {
                    let currentOpacity = parseFloat(overlay.style.opacity);
                    if (currentOpacity < 1) {
                        overlay.style.opacity = currentOpacity + 0.1; // Increment darkening effect
                    }
                } else {
                    gridCell.style.backgroundColor = isRandomColorMode ? getRandomColor() : penColor;
                }
            }
        });
        */
        gridCell.addEventListener("mousedown", (event) => {
            event.preventDefault();
            isMouseDown = true;
            draw(event);
        });

        gridCell.addEventListener("mousemove", (event) => {
            if (isMouseDown) {
                draw(event);
            }
        });

        gridCell.addEventListener("mouseup", () => {
            isMouseDown = false;
        });

        

        gridContainer.appendChild(gridCell);
    }
}

function draw(event) {
    const gridCell = event.target;
    const overlay = gridCell.firstChild;
    if (isMouseDown) {
        if (isEraserEnabled) {
            overlay.style.opacity = 0; // Clear darkening effect
            gridCell.style.backgroundColor = "#fdf5e6"; // Reset background color
        } else if (isDarkenModeEnabled) {
            let currentOpacity = parseFloat(overlay.style.opacity);
            if (currentOpacity < 1) {
                overlay.style.opacity = currentOpacity + 0.1; // Increment darkening effect
            }
        } else {
            gridCell.style.backgroundColor = isRandomColorMode ? getRandomColor() : penColor;
        }
    }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Change pen color when penColorButton is clicked
penColorButton.addEventListener("click", () => {
    penColor = getRandomColor();
});

// Toggle between random and single color modes
toggleColorModeButton.addEventListener("click", () => {
    isRandomColorMode = !isRandomColorMode;
    toggleColorModeButton.textContent = isRandomColorMode ? "Switch to Single Color Mode" : "Switch to Random Color Mode";
});

// Adjust grid size based on user input
gridSizeButton.addEventListener("click", () => {
    let newSize;
    do {
        const userInput = prompt("Enter new grid size (e.g., 50 for 50x50):");
        if (userInput === null) return; 
        newSize = parseInt(userInput, 10);
    } while (isNaN(newSize) || newSize < 1 || newSize > 100);

    if (newSize) {
        createGrid(newSize);
    }
});


gridContainer.addEventListener("mousedown", () => {
    isMouseDown = true;
});
gridContainer.addEventListener("mouseup", () => {
    isMouseDown = false;
});

// Toggle eraser mode
eraserButton.addEventListener("click", () => {
    isEraserEnabled = !isEraserEnabled;
    eraserButton.textContent = isEraserEnabled ? "Switch to Drawing Mode" : "Switch to Eraser Mode";
});

// Toggle darkening mode
darkenModeButton.addEventListener("click", () => {
    isDarkenModeEnabled = !isDarkenModeEnabled;
    darkenModeButton.textContent = isDarkenModeEnabled ? "Disable Darkening Mode" : "Enable Darkening Mode";
});

// Initialize grid with a default size of 16x16
createGrid(16);
