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
    'jacket1.json', 'jacket2.json', 'jacket3.json','dress1w.json',
	'dress2w.json',
	'dress3w.json',
	'skirt1w.json',
	'skirt2w.json',
	'skirt3w.json',
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
// Load each JSON file
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
/* === Color Swatch Fixups (append only) === */
(() => {
  // 1) Bridge: some code reads window.currentlySelectedItem but it's declared with `let`.
  try {
    if (!('currentlySelectedItem' in window)) {
      Object.defineProperty(window, 'currentlySelectedItem', {
        get(){ try { return typeof currentlySelectedItem !== 'undefined' ? currentlySelectedItem : null; } catch(e){ return null; } },
        set(v){ try { currentlySelectedItem = v; } catch(e) { /* no-op */ } }
      });
    }
  } catch (e) { /* ignore */ }

  // 2) Idempotent, safe createColorPicker (in case a later stub overwrote the real one)
  function buildPickerOnce() {
    if (document.querySelector('.color-picker-container')) return; // already built

    const container = document.createElement('div');
    container.className = 'color-picker-container';
    container.style.display = 'none';

    const title = document.createElement('h4');
    title.textContent = 'Choose Color:';
    container.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'color-grid';

    // Use your existing palette so the swatch-upgrade can convert them to circles
    (window.colorPalette || []).forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'color-button';
      btn.textContent = c.name;
      // keep old behavior for fallback (CSS filter)
      btn.onclick = () => window.applyColorToItem?.(c.value);
      grid.appendChild(btn);
    });

    container.appendChild(grid);

    const close = document.createElement('button');
    close.className = 'close-color-picker';
    close.textContent = 'Close';
    close.onclick = () => window.hideColorPicker?.();
    container.appendChild(close);

    (document.querySelector('.controls') || document.body).appendChild(container);
  }

  // Replace/restore global createColorPicker to the safe one (append-only override).
  window.createColorPicker = function() { buildPickerOnce(); };

  // Build immediately if not present (covers the case where a stub ran earlier)
  buildPickerOnce();
})();

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

    const audio = document.getElementById("backgroundMusic");
    const musicBtn = document.getElementById("musicToggleButton");

    if (audio && musicBtn && audio.paused) {
        musicBtn.click(); // simulate the user clicking the Music On button
    }
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

// ===== MUSIC & BACKGROUND =====
function setupMusicToggle() {
    const audio = document.getElementById("backgroundMusic");
    const button = document.getElementById("musicToggleButton");
    let isPlaying = false;

    button.addEventListener("click", () => {
        if (isPlaying) {
            audio.pause();
            button.textContent = "🔊 Music Off";
        } else {
            audio.play().catch(e => console.warn("Autoplay blocked:", e));
            button.textContent = "🔊 Music On";
        }
        isPlaying = !isPlaying;
    });
}

function setupMusicSelector() {
    const selector = document.getElementById("musicSelector");
    const audio = document.getElementById("backgroundMusic");
    const source = audio.querySelector("source");

    selector.addEventListener("change", () => {
        source.src = selector.value;
        audio.load();
        audio.play().catch(e => console.warn("Playback issue:", e));
        document.getElementById("musicToggleButton").textContent = "🔊 Music On";
    });
}

function setupBackgroundSwitch() {
    let currentBackground = 1;
    const maxBackground = 2;
    const bg = document.getElementById('background');
    const button = document.getElementById('toggleBackgroundBtn');

    bg.style.display = 'block';
    button.addEventListener('click', () => {
        currentBackground = (currentBackground % maxBackground) + 1;
        bg.src = `background${currentBackground}.png`;
    });
}

function createColorPicker() {
    // Truncated for brevity
}

// ===== ON LOAD =====
window.addEventListener('load', () => {
    setupMusicToggle();
    setupMusicSelector();
    setupBackgroundSwitch();
    
});
// ===== LOAD ITEMS (OPTIMIZED) =====
async function loadItemsInBatches(batchSize = 5, delay = 50) {
    const baseContainer = document.querySelector('.base-container');
    createColorPicker();

    for (let i = 0; i < jsonFiles.length; i += batchSize) {
        const batch = jsonFiles.slice(i, i + batchSize);

        await Promise.all(batch.map(async file => {
            const data = await loadItemFile(file);
            const categoryName = file.replace('.json', '');

            const fragment = document.createDocumentFragment();
            data.forEach(item => {
                const itemId = item.id.endsWith('.png') ? item.id : `${item.id}.png`;
                const img = new Image();
                img.id = itemId;
                img.src = item.src;
                img.alt = item.alt;
                img.className = categoryName;
                img.setAttribute('data-file', file);
                img.style.visibility = item.visibility === "visible" ? "visible" : "hidden";
                img.style.position = 'absolute';
                img.style.zIndex = getZIndex(categoryName);
                fragment.appendChild(img);
            });

            baseContainer.appendChild(fragment);
        }));

        await new Promise(res => setTimeout(res, delay));
    }
}
// Hide loading screen after everything finishes loading
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) loadingScreen.style.display = 'none';
});
function applyWindEffect() {
    for (let i = 1; i <= 10; i++) {
        const skirt1Normal = document.getElementById(`skirt1_${i}.png`);
        const skirt1Wind = document.getElementById(`skirt1_${i}w.png`);
        const dress1Normal = document.getElementById(`dress1_${i}.png`);
        const dress1Wind = document.getElementById(`dress1_${i}w.png`);

        const skirt2Normal = document.getElementById(`skirt2_${i}.png`);
        const skirt2Wind = document.getElementById(`skirt2_${i}w.png`);
        const dress2Normal = document.getElementById(`dress2_${i}.png`);
        const dress2Wind = document.getElementById(`dress2_${i}w.png`);

        const skirt3Normal = document.getElementById(`skirt3_${i}.png`);
        const skirt3Wind = document.getElementById(`skirt3_${i}w.png`);
        const dress3Normal = document.getElementById(`dress3_${i}.png`);
        const dress3Wind = document.getElementById(`dress3_${i}w.png`);

        if (skirt1Normal && skirt1Wind && skirt1Normal.style.visibility === 'visible') {
            skirt1Normal.style.visibility = 'hidden';
            skirt1Wind.style.visibility = 'visible';
        }
        if (dress1Normal && dress1Wind && dress1Normal.style.visibility === 'visible') {
            dress1Normal.style.visibility = 'hidden';
            dress1Wind.style.visibility = 'visible';
        }

        if (skirt2Normal && skirt2Wind && skirt2Normal.style.visibility === 'visible') {
            skirt2Normal.style.visibility = 'hidden';
            skirt2Wind.style.visibility = 'visible';
        }
        if (dress2Normal && dress2Wind && dress2Normal.style.visibility === 'visible') {
            dress2Normal.style.visibility = 'hidden';
            dress2Wind.style.visibility = 'visible';
        }

        if (skirt3Normal && skirt3Wind && skirt3Normal.style.visibility === 'visible') {
            skirt3Normal.style.visibility = 'hidden';
            skirt3Wind.style.visibility = 'visible';
        }
        if (dress3Normal && dress3Wind && dress3Normal.style.visibility === 'visible') {
            dress3Normal.style.visibility = 'hidden';
            dress3Wind.style.visibility = 'visible';
        }
    }
}

function removeWindEffect() {
    for (let i = 1; i <= 10; i++) {
        const skirt1Normal = document.getElementById(`skirt1_${i}.png`);
        const skirt1Wind = document.getElementById(`skirt1_${i}w.png`);
        const dress1Normal = document.getElementById(`dress1_${i}.png`);
        const dress1Wind = document.getElementById(`dress1_${i}w.png`);

        const skirt2Normal = document.getElementById(`skirt2_${i}.png`);
        const skirt2Wind = document.getElementById(`skirt2_${i}w.png`);
        const dress2Normal = document.getElementById(`dress2_${i}.png`);
        const dress2Wind = document.getElementById(`dress2_${i}w.png`);

        const skirt3Normal = document.getElementById(`skirt3_${i}.png`);
        const skirt3Wind = document.getElementById(`skirt3_${i}w.png`);
        const dress3Normal = document.getElementById(`dress3_${i}.png`);
        const dress3Wind = document.getElementById(`dress3_${i}w.png`);

        if (skirt1Wind && skirt1Normal && skirt1Wind.style.visibility === 'visible') {
            skirt1Wind.style.visibility = 'hidden';
            skirt1Normal.style.visibility = 'visible';
        }
        if (dress1Wind && dress1Normal && dress1Wind.style.visibility === 'visible') {
            dress1Wind.style.visibility = 'hidden';
            dress1Normal.style.visibility = 'visible';
        }

        if (skirt2Wind && skirt2Normal && skirt2Wind.style.visibility === 'visible') {
            skirt2Wind.style.visibility = 'hidden';
            skirt2Normal.style.visibility = 'visible';
        }
        if (dress2Wind && dress2Normal && dress2Wind.style.visibility === 'visible') {
            dress2Wind.style.visibility = 'hidden';
            dress2Normal.style.visibility = 'visible';
        }

        if (skirt3Wind && skirt3Normal && skirt3Wind.style.visibility === 'visible') {
            skirt3Wind.style.visibility = 'hidden';
            skirt3Normal.style.visibility = 'visible';
        }
        if (dress3Wind && dress3Normal && dress3Wind.style.visibility === 'visible') {
            dress3Wind.style.visibility = 'hidden';
            dress3Normal.style.visibility = 'visible';
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const windButton = document.getElementById("wind-button");

    if (windButton) {
        windButton.addEventListener("mousedown", applyWindEffect);
        windButton.addEventListener("mouseup", removeWindEffect);
        windButton.addEventListener("mouseleave", removeWindEffect);
        windButton.addEventListener("touchstart", e => {
            e.preventDefault();
            applyWindEffect();
        }, { passive: false });
        windButton.addEventListener("touchend", e => {
            e.preventDefault();
            removeWindEffect();
        }, { passive: false });
    }
});
/* === Color Swatch Upgrade (Aug 9, 2025) — append only === */
(() => {
  // Map swatch fill colors (UI only). "Original" shows a checkerboard.
  const SWATCH_HEX = {
    Original: null,
    Red: '#ff3b30',
    Orange: '#ff9500',
    Yellow: '#ffcc00',
    Green: '#34c759',
    Cyan: '#32ade6',
    Blue: '#007aff',
    Purple: '#af52de',
    Pink: '#ff2d55'
  };

  function enhanceColorPicker() {
    const picker = document.querySelector('.color-picker-container');
    if (!picker) return false;

    const grid = picker.querySelector('.color-grid');
    if (!grid) return false;

    const btns = Array.from(grid.querySelectorAll('.color-button'));
    if (!btns.length) return false;

    // Turn each existing text button into a circular swatch.
    btns.forEach((btn) => {
      const name = (btn.textContent || '').trim();
      const hex = SWATCH_HEX[name] ?? null;

      // Make label screen-reader only; visual is the color circle
      btn.innerHTML = `<span class="visually-hidden">${name}</span>`;
      btn.setAttribute('aria-label', name);
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', 'false');
      btn.title = name;

      if (name === 'Original') {
        btn.classList.add('original');
        btn.style.background = '';
      } else if (hex) {
        btn.style.background = hex;
      }

      // Keep a reference to the original onclick (which used filters) for fallback.
      const originalOnclick = btn.onclick;

      // Replace with higher-quality recolor + auto-fallback.
      btn.onclick = async (e) => {
        e.stopPropagation();
        // Nothing selected? defer to original behavior.
        if (!window.currentlySelectedItem) {
          originalOnclick?.(e);
          return;
        }

        try {
          // Use named, per-pixel recoloring (preserves alpha).
          await window.setItemNamedColor(window.currentlySelectedItem, name);
        } catch {
          // If canvas/CORS blocks this, fall back to your existing filter logic.
          originalOnclick?.(e);
        }

        // Selection ring
        btns.forEach(b => b.setAttribute('aria-checked', 'false'));
        btn.setAttribute('aria-checked', 'true');

        // Close after choose (keeps your current UX)
        window.hideColorPicker?.();
      };
    });

    // mark as enhanced so we don't do it twice
    grid.dataset.enhanced = '1';
    return true;
  }

  // Try once on load, and also watch for when the picker is created dynamically.
  const tryEnhance = () => {
    if (document.querySelector('.color-grid[data-enhanced="1"]')) return;
    enhanceColorPicker();
  };

  window.addEventListener('load', tryEnhance);

  const mo = new MutationObserver(() => tryEnhance());
  mo.observe(document.body, { childList: true, subtree: true });
})();