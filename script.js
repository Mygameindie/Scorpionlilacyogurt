// ===== JSON FILES AND COLOR PALETTE =====
const jsonFiles = [
    'bottomunderwear1.json', 'bottomunderwear2.json', 'bottomunderwear3.json',
    'topunderwear1.json', 'topunderwear2.json', 'topunderwear3.json',
    'onepiece1.json',
    'socks1.json', 'socks2.json', 'socks3.json',
    'boxers1.json', 'boxers2.json', 'boxers3.json',
    'sweatshirt1.json', 'sweatshirt2.json', 'sweatshirt3.json',
    'shoes1.json', 'shoes2.json', 'shoes3.json',
    'pants1.json', 'pants2.json', 'pants3.json',
    'skirt1.json', 'skirt2.json', 'skirt3.json',
    'top1.json', 'top2.json', 'top3.json',
    'dress1.json', 'dress2.json', 'dress3.json',
    'jacket1.json', 'jacket2.json', 'jacket3.json',
    'accessories1.json', 'accessories2.json', 'accessories3.json',
    'hat1.json', 'hat2.json', 'hat3.json',
    'mask1.json', 'mask2.json', 'mask3.json',
    'bow1.json', 'bow2.json', 'bow3.json'
];

const colorPalette = [
    { name: 'Original', value: 'none' },
    { name: 'Red', value: 'hue-rotate(0deg)' },
    { name: 'Blue', value: 'hue-rotate(240deg)' },
    { name: 'Green', value: 'hue-rotate(120deg)' },
    { name: 'Purple', value: 'hue-rotate(270deg)' },
    { name: 'Orange', value: 'hue-rotate(30deg)' },
    { name: 'Pink', value: 'hue-rotate(320deg)' },
    { name: 'Yellow', value: 'hue-rotate(60deg)' },
    { name: 'Cyan', value: 'hue-rotate(180deg)' }
];

let currentlySelectedItem = null;

// ===== HELPERS =====
function getZIndex(categoryName) {
    const zIndexMap = {
        bottomunderwear: 3, topunderwear: 4, onepiece: 5, socks: 5, boxer: 6,
        sweatshirt: 7, shoe: 8, pants: 9, skirt: 10, top: 11, dress: 12,
        jacket: 13, accessories: 14, hat: 15,
        top3: 11, pants3: 9, skirt3: 10, shoes3: 8, jacket3: 13
    };
    return zIndexMap[categoryName] || 0;
}

async function loadItemFile(file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Error loading file: ${file}`);
        return await response.json();
    } catch (error) {
        console.error(`Failed to load ${file}:`, error);
        return [];
    }
}

function hideSpecificCategories(categories) {
    categories.forEach(category => {
        document.querySelectorAll(`.${category}`).forEach(item => {
            item.style.visibility = 'hidden';
        });
    });
}

// ===== TOGGLE VISIBILITY =====
function toggleVisibility(itemId, categoryName) {
    document.querySelectorAll(`.${categoryName}`).forEach(item => {
        if (item.id !== itemId) item.style.visibility = 'hidden';
    });

    const selectedItem = document.getElementById(itemId);
    selectedItem.style.visibility = selectedItem.style.visibility === 'visible' ? 'hidden' : 'visible';

    if (selectedItem.style.visibility === 'visible') {
        if (categoryName === 'onepiece1') {
            hideSpecificCategories(['topunderwear1', 'bottomunderwear1']);
        } else if (categoryName === 'dress1') {
            hideSpecificCategories(['top1', 'pants1', 'skirt1', 'sweatshirt1']);
        } else if (categoryName === 'dress2') {
            hideSpecificCategories(['top2', 'pants2', 'skirt2', 'sweatshirt2']);
        } else if (categoryName === 'dress3') {
            hideSpecificCategories(['top3', 'pants3', 'skirt3', 'sweatshirt3']);
        } else if (
            categoryName.startsWith('top1') || categoryName.startsWith('pants1') ||
            categoryName.startsWith('skirt1') || categoryName.startsWith('sweatshirt1')
        ) {
            hideSpecificCategories(['dress1']);
        } else if (
            categoryName.startsWith('top2') || categoryName.startsWith('pants2') ||
            categoryName.startsWith('skirt2') || categoryName.startsWith('sweatshirt2')
        ) {
            hideSpecificCategories(['dress2']);
        } else if (
            categoryName.startsWith('top3') || categoryName.startsWith('pants3') ||
            categoryName.startsWith('skirt3') || categoryName.startsWith('sweatshirt3')
        ) {
            hideSpecificCategories(['dress3']);
        } else if (categoryName === 'topunderwear1' || categoryName === 'bottomunderwear1') {
            hideSpecificCategories(['onepiece1']);
        }
    }
}

// ===== COLOR PICKER =====
function createColorPicker() {
    const container = document.createElement('div');
    container.classList.add('color-picker-container');
    container.style.display = 'none';

    const title = document.createElement('h4');
    title.textContent = 'Choose Color:';
    container.appendChild(title);

    const grid = document.createElement('div');
    grid.classList.add('color-grid');
    colorPalette.forEach(color => {
        const btn = document.createElement('button');
        btn.classList.add('color-button');
        btn.textContent = color.name;
        btn.onclick = () => applyColorToItem(color.value);
        grid.appendChild(btn);
    });
    container.appendChild(grid);

    const close = document.createElement('button');
    close.textContent = 'Close';
    close.classList.add('close-color-picker');
    close.onclick = hideColorPicker;
    container.appendChild(close);

    document.querySelector('.controls').appendChild(container);
}

function showColorPicker(itemId) {
    currentlySelectedItem = itemId;
    document.querySelector('.color-picker-container').style.display = 'block';
}

function hideColorPicker() {
    document.querySelector('.color-picker-container').style.display = 'none';
    currentlySelectedItem = null;
}

function applyColorToItem(filterValue) {
    if (!currentlySelectedItem) return;
    const item = document.getElementById(currentlySelectedItem);
    item.style.filter = (filterValue === 'none') ? '' : filterValue;
    hideColorPicker();
}

// ===== LOAD ITEMS =====
// Load items in batches to reduce load time and improve responsiveness
async function loadItemsInBatches(batchSize = 3) {
    const baseContainer = document.querySelector('.base-container');
    const controlsContainer = document.querySelector('.controls');
    
    // Create color picker first
    createColorPicker();
    
    for (let i = 0; i < jsonFiles.length; i += batchSize) {
        const batch = jsonFiles.slice(i, i + batchSize);

        await Promise.all(batch.map(async file => {
            const data = await loadItemFile(file);
            const categoryName = file.replace('.json', '');
            const categoryContainer = document.createElement('div');
            categoryContainer.classList.add('category');

            const categoryHeading = document.createElement('h3');
            categoryHeading.textContent = categoryName;
            categoryContainer.appendChild(categoryHeading);

            data.forEach(item => {
                const itemId = item.id.endsWith('.png') ? item.id : `${item.id}.png`;

                const img = document.createElement('img');
                img.id = itemId;
                img.src = item.src;
                img.alt = item.alt;
                img.classList.add(categoryName);
                img.setAttribute('data-file', file);
                img.style.visibility = item.visibility === "visible" ? "visible" : "hidden";
                img.style.position = 'absolute';
                img.style.zIndex = getZIndex(categoryName);
                baseContainer.appendChild(img);

                // Create container for buttons
const buttonContainer = document.createElement('div');
buttonContainer.classList.add('button-container');

// Create a wrapper to stack buttons vertically
const buttonWrap = document.createElement('div');
buttonWrap.classList.add('button-wrap');

// Main item button
const button = document.createElement('img');
const buttonFile = item.src.replace('.png', 'b.png');
button.src = buttonFile;
button.alt = item.alt + ' Button';
button.classList.add('item-button');
button.onclick = () => toggleVisibility(itemId, categoryName);
buttonWrap.appendChild(button);

// Color change button
const colorButton = document.createElement('button');
colorButton.textContent = '🎨';
colorButton.classList.add('color-change-button');
colorButton.onclick = (e) => {
    e.stopPropagation();
    const targetItem = document.getElementById(itemId);
    if (targetItem.style.visibility === 'hidden') {
        toggleVisibility(itemId, categoryName);
    }
    showColorPicker(itemId);
};
buttonWrap.appendChild(colorButton);

// Add stacked buttonWrap to container
buttonContainer.appendChild(buttonWrap);
categoryContainer.appendChild(buttonContainer);
            });

            //controlsContainer.appendChild(categoryContainer);
        }));

        await new Promise(resolve => setTimeout(resolve, 50));
    }
}

// ===== LAYOUT AND GAME =====
function adjustCanvasLayout() {
    const base = document.querySelector('.base-container');
    const controls = document.querySelector('.controls');
    const isMobile = window.innerWidth <= 600;
    base.classList.toggle('mobile-layout', isMobile);
    base.classList.toggle('desktop-layout', !isMobile);
    controls.classList.toggle('mobile-controls', isMobile);
    controls.classList.toggle('desktop-controls', !isMobile);
}

function enterGame() {
    document.querySelector('.main-menu').style.display = 'none';
    document.querySelector('.game-container').style.display = 'block';
}

function blurButton(event) {
    event.preventDefault();
    event.target.blur();
}

function handleButtonPressRelease(buttonClass, imageId) {
    const button = document.querySelector(buttonClass);
    if (button) {
        const press = e => { blurButton(e); document.getElementById(imageId).style.display = 'block'; };
        const release = e => { blurButton(e); document.getElementById(imageId).style.display = 'none'; };
        button.addEventListener('mousedown', press);
        button.addEventListener('mouseup', release);
        button.addEventListener('touchstart', press, { passive: false });
        button.addEventListener('touchend', release, { passive: false });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    handleButtonPressRelease('.button-1', 'base2-image');
    handleButtonPressRelease('.button-2', 'base3-image');
    handleButtonPressRelease('.button-3', 'base4-image');
});

window.onload = () => {
    loadItemsInBatches();
    adjustCanvasLayout();

    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
};

window.addEventListener('resize', adjustCanvasLayout);