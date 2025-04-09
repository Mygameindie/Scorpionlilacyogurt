document.addEventListener("DOMContentLoaded", () => {
    const buttonContainer = document.querySelector(".scrollable-buttons");
    
    function generateButtons() {
        buttonContainer.innerHTML = ""; // Clear previous buttons

        // Preset Buttons
        const presetTitle = document.createElement("h3");
        presetTitle.textContent = "Presets";
        presetTitle.style.margin = "10px 0";
        buttonContainer.appendChild(presetTitle);

        const presets = [
            
            { name: "Default", action: applyPreset1 },
			{ name: "lilac", action: applyLilacPreset },
			{ name: "Yogurt", action: applyYogurtPreset },
			{ name: "scorpion", action: applyScorpionPreset },
            { name: "Remove", action: applyUnderwearOnlyPreset }
        ];

        presets.forEach(preset => {
            const presetButton = document.createElement("button");
            presetButton.textContent = preset.name;
            presetButton.classList.add("preset-button");
            presetButton.onclick = preset.action;
            buttonContainer.appendChild(presetButton);
        });

        
        

        
    }

    function toggleItem(itemId) {
        const selectedItem = document.getElementById(itemId);

        if (selectedItem) {
            selectedItem.style.visibility = 
                selectedItem.style.visibility === "visible" ? "hidden" : "visible";
        } else {
            console.warn(`Item not found: ${itemId}`);
        }
    }

    generateButtons(); // Load buttons when the page loads
  const scrollContainer = document.querySelector(".scrollable-buttons");

    // Horizontal scroll using mouse wheel on PC
    scrollContainer.addEventListener("wheel", (evt) => {
        if (evt.deltaY !== 0) {
            evt.preventDefault();
            scrollContainer.scrollLeft += evt.deltaY;
        }
    }, { passive: false });

    // Touch scroll for mobile
    let isDown = false;
    let startX;
    let scrollLeft;

    scrollContainer.addEventListener("touchstart", (e) => {
        isDown = true;
        startX = e.touches[0].pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
    });

    scrollContainer.addEventListener("touchmove", (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 1.5; // scroll speed multiplier
        scrollContainer.scrollLeft = scrollLeft - walk;
    });

    scrollContainer.addEventListener("touchend", () => {
        isDown = false;
    });
});