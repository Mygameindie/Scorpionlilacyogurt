const jsonFiles = [
    'bottomunderwear1.json', 'bottomunderwear2.json', 'bottomunderwear3.json',
    'topunderwear1.json', 'topunderwear2.json', 'topunderwear3.json',
    'onepiece1.json', // No 'onepiece3.json' added as per request
    'socks1.json', 'socks2.json', 'socks3.json',
    'expression1.json', 'expression2.json', 'expression3.json',
    'boxers1.json', 'boxers2.json', 'boxers3.json', 'mask2.json','mask1.json','mask3.json','bow2.json', 'bow1.json','bow3.json',
    'sweatshirt1.json', 'sweatshirt2.json', 'sweatshirt3.json',
    'shoes1.json', 'shoes2.json', 'shoes3.json',
    'pants1.json', 'pants2.json', 'pants3.json',
    'skirt1.json', 'skirt2.json', 'skirt3.json',
    'top1.json', 'top2.json', 'top3.json',
    'dress1.json', 'dress2.json', 'dress3.json',
    'jacket1.json', 'jacket2.json', 'jacket3.json',
    'accessories1.json', 'accessories2.json', 'accessories3.json',
    'hat1.json', 'hat2.json', 'hat3.json'
];

function getZIndex(categoryName) {
    const zIndexMap = {
      // Lowest layer
        base: 1,
        expression: 2, bottomunderwear: 3, topunderwear: 4,
        onepiece: 5, socks: 6, boxers: 7, sweatshirt: 8,
        shoes: 9, pants: 10, skirt: 11, top: 12, dress: 13,
        jacket: 14, accessories: 15, hat: 16
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

async function loadItemsInBatches(batchSize = 5) {
    const baseContainer = document.querySelector('.base-container');
    const controlsContainer = document.querySelector('.controls');

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

                const button = document.createElement('img');
                button.src = item.src.replace('.png', 'b.png');
                button.alt = `${item.alt} Button`;
                button.classList.add('item-button');
                button.onclick = () => toggleVisibility(itemId, categoryName);
                categoryContainer.appendChild(button);
            });

            controlsContainer.appendChild(categoryContainer);
        }));

        await new Promise(resolve => setTimeout(resolve, 50));
    }
}

// Toggle visibility of item images, ensuring mutual exclusivity
function toggleVisibility(itemId, categoryName) {
    const categoryItems = document.querySelectorAll(`.${categoryName}`);
    categoryItems.forEach(item => {
        if (item.id !== itemId) {
            item.style.visibility = 'hidden';
        }
    });

    const selectedItem = document.getElementById(itemId);
    selectedItem.style.visibility = selectedItem.style.visibility === 'visible' ? 'hidden' : 'visible';

    if (selectedItem.style.visibility === 'visible') {
        if (categoryName === 'onepiece1') {
            hideSpecificCategories(['topunderwear1', 'bottomunderwear1']);
        }else if (categoryName === 'dress1') {
    hideSpecificCategories(['top1', 'pants1', 'skirt1', 'sweatshirt1']);
} else if (categoryName === 'dress2') {
    hideSpecificCategories(['top2', 'pants2', 'skirt2', 'sweatshirt2']);
} else if (categoryName === 'dress3') {
    hideSpecificCategories(['top3', 'pants3', 'skirt3', 'sweatshirt3']);
} else if (categoryName.startsWith('top1') || categoryName.startsWith('pants1') || categoryName.startsWith('skirt1') || categoryName.startsWith('sweatshirt1')) {
    hideSpecificCategories(['dress1']);
} else if (categoryName.startsWith('top2') || categoryName.startsWith('pants2') || categoryName.startsWith('skirt2') || categoryName.startsWith('sweatshirt2')) {
    hideSpecificCategories(['dress2']);
} else if (categoryName.startsWith('top3') || categoryName.startsWith('pants3') || categoryName.startsWith('skirt3') || categoryName.startsWith('sweatshirt3')) {
    hideSpecificCategories(['dress3']);
}
		}else if (categoryName === 'topunderwear1', 'bottomunderwear1' ) {
            hideSpecificCategories(['onepiece1']);
        }
    }


// Helper function to hide items for specific categories
function hideSpecificCategories(categories) {
    categories.forEach(category => {
        const items = document.querySelectorAll(`.${category}`);
        items.forEach(item => {
            item.style.visibility = 'hidden';
        });
    });
}

function adjustCanvasLayout() {
    const baseContainer = document.querySelector('.base-container');
    const controlsContainer = document.querySelector('.controls');
    const screenWidth = window.innerWidth;

    requestAnimationFrame(() => {
        if (screenWidth <= 600) {
            baseContainer.classList.add('mobile-layout');
            controlsContainer.classList.add('mobile-controls');
        } else {
            baseContainer.classList.add('desktop-layout');
            controlsContainer.classList.add('desktop-controls');
        }
    });
}

function enterGame() {
    document.querySelector('.main-menu').style.display = 'none';
    document.querySelector('.game-container').style.display = 'block';
}

function blurButton(event) {
    event.preventDefault();
    event.target.blur();
}

function pressButton(event, imageId) {
    blurButton(event);
    document.getElementById(imageId).style.display = "block";
}

function releaseButton(event, imageId) {
    blurButton(event);
    document.getElementById(imageId).style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    [['.button-1', 'base2-image'], ['.button-2', 'base3-image'], ['.button-3', 'base4-image']].forEach(([buttonClass, imageId]) => {
        const button = document.querySelector(buttonClass);
        if (button) {
            button.addEventListener("mousedown", (e) => pressButton(e, imageId));
            button.addEventListener("mouseup", (e) => releaseButton(e, imageId));
            button.addEventListener("touchstart", (e) => pressButton(e, imageId), { passive: false });
            button.addEventListener("touchend", (e) => releaseButton(e, imageId), { passive: false });
        }
    });
});

function addLayer(src, alt, className, zIndex) {
    const baseContainer = document.querySelector('.base-container');
    if (!document.querySelector(`.${className}`)) {
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        img.classList.add(className);
        img.style.position = 'absolute';
        img.style.zIndex = zIndex;
        baseContainer.appendChild(img);
    }
}

window.onload = () => {

    loadItemsInBatches();
    adjustCanvasLayout();
};
// Function for Button 1: Show Base2 on press, hide on release
function pressButton1(event) {
    blurButton(event);
    document.getElementById("base2-image").style.display = "block";
}

function releaseButton1(event) {
    blurButton(event);
    document.getElementById("base2-image").style.display = "none";
}

// Function for Button 2: Show Base3 on press, hide on release
function pressButton2(event) {
    blurButton(event);
    document.getElementById("base3-image").style.display = "block";
}

function releaseButton2(event) {
    blurButton(event);
    document.getElementById("base3-image").style.display = "none";
}

// Add event listeners to buttons (Support Desktop & Mobile)
document.addEventListener("DOMContentLoaded", () => {
    const button1 = document.querySelector(".button-1");
    const button2 = document.querySelector(".button-2");

    // Button 1 (Base2)
    button1.addEventListener("mousedown", pressButton1);
    button1.addEventListener("mouseup", releaseButton1);
    button1.addEventListener("touchstart", pressButton1, { passive: false });
    button1.addEventListener("touchend", releaseButton1, { passive: false });

    // Button 2 (Base3)
    button2.addEventListener("mousedown", pressButton2);
    button2.addEventListener("mouseup", releaseButton2);
    button2.addEventListener("touchstart", pressButton2, { passive: false });
    button2.addEventListener("touchend", releaseButton2, { passive: false });
});
