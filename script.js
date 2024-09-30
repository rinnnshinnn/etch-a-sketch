const gridContainer = document.querySelector("#container");
const penColorButton = document.querySelector("#penColor");
const toggleColorModeCheckbox = document.querySelector("#toggleColorMode");
const gridSizeButton = document.querySelector("#gridSize");
const eraserCheckbox = document.querySelector("#eraser");
const darkenModeCheckbox = document.querySelector("#darkenMode");

let penColor = 'black'; 
let isRandomColorMode = false; 
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

        gridCell.addEventListener("mousedown", (event) => {
            event.preventDefault();
            isMouseDown = true;
            draw(event);
        });

        gridCell.addEventListener("mouseenter", (event) => {
            if (isMouseDown) {
                if (isDarkenModeEnabled && !isEraserEnabled) {
                    darken(event);
                } else {
                    draw(event);
                }
            }
        });

        gridCell.addEventListener("mouseup", () => {
            isMouseDown = false;
        });

        // Add touch event listeners
        gridCell.addEventListener("touchstart", (event) => {
            event.preventDefault();
            draw(event.touches[0]);
        });

        gridCell.addEventListener("touchmove", (event) => {
            event.preventDefault();
            const touch = event.touches[0];
            const touchedCell = document.elementFromPoint(touch.clientX, touch.clientY);
            if (touchedCell && touchedCell.parentNode === gridContainer) {
                if (isDarkenModeEnabled) {
                    darken({ target: touchedCell });
                } else {
                    draw({ target: touchedCell });
                }
            }
        });

        gridCell.addEventListener("touchend", () => {
            isMouseDown = false;
        });

        // Disable right-click on grid cells
        gridCell.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        });

        gridContainer.appendChild(gridCell);
    }
}

function draw(event) {
    const gridCell = event.target;
    const overlay = gridCell.firstChild;

    if (isDarkenModeEnabled) {
        return; // Exit the function if darken mode is enabled
    }

    if (isEraserEnabled) {
        overlay.style.opacity = 0; // Clear darkening effect
        gridCell.style.backgroundColor = "#fdf5e6"; // Reset background color
        return
    } 
    
    overlay.style.opacity = 0; // Reset darkening effect
    
    gridCell.style.backgroundColor = isRandomColorMode ? getRandomColor() : penColor;
}

function darken(event) {
    const gridCell = event.target;
    const overlay = gridCell.firstChild;
    let currentOpacity = parseFloat(overlay.style.opacity);
    if (currentOpacity < 1) {
        overlay.style.opacity = currentOpacity + 0.1; // Increment darkening effect
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
toggleColorModeCheckbox.addEventListener("change", () => {
    isRandomColorMode = toggleColorModeCheckbox.checked;
    isDarkenModeEnabled = darkenModeCheckbox.checked = false; // Disable darken mode
});

// Adjust grid size based on user input
gridSizeButton.addEventListener("click", () => {
    const newSize = parseInt(prompt("Enter new grid size (e.g., 50 for 50x50):"), 10);
    if (!isNaN(newSize) && newSize > 0 && newSize <= 100) {
        createGrid(newSize);
    }
});

// Toggle eraser mode
eraserCheckbox.addEventListener("change", () => {
    isEraserEnabled = eraserCheckbox.checked;
});

// Toggle darkening mode
darkenModeCheckbox.addEventListener("change", () => {
    isDarkenModeEnabled = darkenModeCheckbox.checked;
    isRandomColorMode = toggleColorModeCheckbox.checked = false; // Disable random color mode
    
});

// Initialize grid with a default size of 16x16
createGrid(16);
