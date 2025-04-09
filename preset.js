function applyPreset1() {
    // Hide all clothing items first (except underwear, boxers, and sweatshirt)
    hideSpecificCategories([
    "accessories1", "accessories2", "accessories3", "backitems3",
    "bottomunderwear1", "bottomunderwear2", "bottomunderwear3",
    "bow2", "boxers1", "boxers2", "boxers3",
    "dress1", "dress2", "dress3",
    "expression1", "expression2", "expression3",
    "hat1", "hat2", "hat3",
    "jacket1", "jacket2", "jacket3",
    "mask2", "onepiece1", "onepiece3",
    "pants1", "pants2", "pants3",
    "shoes1", "shoes2", "shoes3",
    "skirt1", "skirt2", "skirt3",
    "socks1", "socks2", "socks3",
    "sweatshirt1", "sweatshirt2", "sweatshirt3",
    "top1", "top2", "top3",
    "topunderwear1", "topunderwear2", "topunderwear3"
]);

    // Ensure that the required items are explicitly set to visible
      // Ensure that the required items are explicitly set to visible
    showItem("bottomunderwear1_1.png", "bottomunderwear1");
    showItem("bottomunderwear2_1.png", "bottomunderwear2");
    showItem("bottomunderwear3_1.png", "bottomunderwear3");
    showItem("bow2_1.png", "bow2");
    showItem("boxers2_1.png", "boxers2");
    showItem("boxers3_1.png", "boxers3");
    showItem("hat1_1.png", "hat1");
    showItem("hat3_1.png", "hat3");
    showItem("jacket3_1.png", "jacket3");
    showItem("mask2_1.png", "mask2");
    showItem("pants1_1.png", "pants1");
    showItem("pants2_1.png", "pants2");
    showItem("pants3_1.png", "pants3");
    showItem("top1_1.png", "top1");
}

function showItem(itemId, categoryName) {
    const selectedItem = document.getElementById(itemId);
    if (selectedItem) {
        selectedItem.style.visibility = "visible"; // Force visibility
        selectedItem.style.display = "block"; // Ensure it's not hidden
        selectedItem.style.position = "absolute"; // Keep absolute positioning
        selectedItem.style.left = "0"; // Ensure alignment
        selectedItem.style.top = "0"; // Reset any displacement
        // Apply correct layering
    } else {
        console.warn(`Item not found: ${itemId} in category ${categoryName}`);
    }
}



function applyUnderwearOnlyPreset() {
    hideSpecificCategories([
        "accessories1", "accessories2", "accessories3", "backitems3",
        "bottomunderwear1", "bottomunderwear2", "bottomunderwear3",
        "bow2", "boxers1", "boxers2", "boxers3",
        "dress1", "dress2", "dress3",
        "expression1", "expression2", "expression3",
        "hat1", "hat2", "hat3",
        "jacket1", "jacket2", "jacket3",
        "mask2", "onepiece1", "onepiece3",
        "pants1", "pants2", "pants3",
        "shoes1", "shoes2", "shoes3",
        "skirt1", "skirt2", "skirt3",
        "socks1", "socks2", "socks3",
        "sweatshirt1", "sweatshirt2", "sweatshirt3",
        "top1", "top2", "top3",
        "topunderwear1", "topunderwear2", "topunderwear3"
    ]);

    // Show actual existing underwear and boxer items
    showItem("topunderwear1_1.png", "topunderwear1");
    showItem("bottomunderwear1_1.png", "bottomunderwear1");
    showItem("bottomunderwear2_1.png", "bottomunderwear2");
    showItem("bottomunderwear3_1.png", "bottomunderwear3");
    showItem("boxers2_1.png", "boxers2");
    showItem("boxers3_1.png", "boxers3");
}
function showItem(itemId, categoryName) {
    const selectedItem = document.getElementById(itemId);
    if (selectedItem) {
        selectedItem.style.visibility = "visible"; // Force visibility
        selectedItem.style.display = "block"; // Ensure it's not hidden
        selectedItem.style.position = "absolute"; // Keep absolute positioning
        selectedItem.style.left = "0"; // Ensure alignment
        selectedItem.style.top = "0"; // Reset any displacement
        // Apply correct layering
    } else {
        console.warn(`Item not found: ${itemId} in category ${categoryName}`);
    }
}

function applyCustomPreset() {
    // Hide all clothing items first
    hideSpecificCategories([
    "accessories1", "accessories2", "accessories3", "backitems3",
    "bottomunderwear1", "bottomunderwear2", "bottomunderwear3",
    "bow2", "boxers1", "boxers2", "boxers3",
    "dress1", "dress2", "dress3",
    "expression1", "expression2", "expression3",
    "hat1", "hat2", "hat3",
    "jacket1", "jacket2", "jacket3",
    "mask2", "onepiece1", "onepiece3",
    "pants1", "pants2", "pants3",
    "shoes1", "shoes2", "shoes3",
    "skirt1", "skirt2", "skirt3",
    "socks1", "socks2", "socks3",
    "sweatshirt1", "sweatshirt2", "sweatshirt3",
    "top1", "top2", "top3",
    "topunderwear1", "topunderwear2", "topunderwear3" ,
]);

    // Show only the uploaded files
    showItem("pants2_2.png", "pants2");
    showItem("hat1_1.png", "hat1");
    showItem("dress1_1.png", "dress1");
    showItem("shoes1_2.png", "shoes1");
    showItem("jacket2_1.png", "jacket2");
    showItem("top2_2.png", "top2");
    showItem("shoes2_2.png", "shoes2");
}

function showItem(itemId, categoryName) {
    const selectedItem = document.getElementById(itemId);
    if (selectedItem) {
        selectedItem.style.visibility = "visible"; // Force visibility
        selectedItem.style.display = "block"; // Ensure it's not hidden
        selectedItem.style.position = "absolute"; // Keep absolute positioning
        selectedItem.style.left = "0"; // Ensure alignment
        selectedItem.style.top = "0"; // Reset any displacement
        // Apply correct layering
    } else {
        console.warn(`Item not found: ${itemId} in category ${categoryName}`);
    }
}

function applyLilacPreset() {
    // Hide all clothing items first
    hideSpecificCategories([
        "accessories1", "accessories2", "accessories3", "backitems3",
        "bottomunderwear1", "bottomunderwear2", "bottomunderwear3",
        "bow2", "bow1", "bow3",
        "boxers1", "boxers2", "boxers3",
        "dress1", "dress2", "dress3",
        "expression1", "expression2", "expression3",
        "hat1", "hat2", "hat3",
        "jacket1", "jacket2", "jacket3",
        "mask1", "mask2", "mask3",
        "onepiece1", "onepiece3",
        "pants1", "pants2", "pants3",
        "shoes1", "shoes2", "shoes3",
        "skirt1", "skirt2", "skirt3",
        "socks1", "socks2", "socks3",
        "sweatshirt1", "sweatshirt2", "sweatshirt3",
        "top1", "top2", "top3",
        "topunderwear1", "topunderwear2", "topunderwear3"
    ]);
	
showItem("mask2_1.png", "mask2");
showItem("bow2_1.png", "bow2");
 showItem("pants2_1.png", "pants2");   
    // Newly added items from ZIP
    showItem("topunderwear1_2.png", "topunderwear1");
    showItem("pants1_2.png", "pants1");
    showItem("pants3_2.png", "pants3");
    showItem("mask3_1.png", "mask3");
    showItem("mask1_1.png", "mask1");
    showItem("bow3_1.png", "bow3");
    showItem("bow1_1.png", "bow1");
    showItem("bottomunderwear3_1.png", "bottomunderwear3");
    showItem("boxers2_1.png", "boxers2");
    showItem("boxers3_1.png", "boxers3");
    showItem("bottomunderwear2_1.png", "bottomunderwear2");
    showItem("bottomunderwear1_1.png", "bottomunderwear1");
}

function showItem(itemId, categoryName) {
    const selectedItem = document.getElementById(itemId);
    if (selectedItem) {
        selectedItem.style.visibility = "visible"; // Force visibility
        selectedItem.style.display = "block"; // Ensure it's not hidden
        selectedItem.style.position = "absolute"; // Keep absolute positioning
        selectedItem.style.left = "0"; // Ensure alignment
        selectedItem.style.top = "0"; // Reset any displacement
        // Apply correct layering
    } else {
        console.warn(`Item not found: ${itemId} in category ${categoryName}`);
    }
}

function applyYogurtPreset() {
    // Hide all clothing items first
    hideSpecificCategories([
        "accessories1", "accessories2", "accessories3", "backitems3",
        "bottomunderwear1", "bottomunderwear2", "bottomunderwear3",
        "bow2", "bow1", "bow3",
        "boxers1", "boxers2", "boxers3",
        "dress1", "dress2", "dress3",
        "expression1", "expression2", "expression3",
        "hat1", "hat2", "hat3",
        "jacket1", "jacket2", "jacket3",
        "mask1", "mask2", "mask3",
        "onepiece1", "onepiece3",
        "pants1", "pants2", "pants3",
        "shoes1", "shoes2", "shoes3",
        "skirt1", "skirt2", "skirt3",
        "socks1", "socks2", "socks3",
        "sweatshirt1", "sweatshirt2", "sweatshirt3",
        "top1", "top2", "top3",
        "topunderwear1", "topunderwear2", "topunderwear3"
    ]);
	
	showItem("pants1_3.png", "pants1");
showItem("pants3_3.png", "pants3");
showItem("jacket1_1.png", "jacket1");
showItem("jacket2_1.png", "jacket2"); // already in previous preset but still valid
showItem("jacket3_1.png", "jacket3");
showItem("hat1_2.png", "hat1");
showItem("hat2_1.png", "hat2");
showItem("hat3_1.png", "hat3");
showItem("pants3_1.png", "pants3");
showItem("topunderwear1_1.png", "topunderwear1");
showItem("bottomunderwear1_1.png", "bottomunderwear1");
showItem("bottomunderwear2_1.png", "bottomunderwear2");
showItem("bottomunderwear3_1.png", "bottomunderwear3");
showItem("boxers2_1.png", "boxers2");
showItem("boxers3_1.png", "boxers3");
}
function showItem(itemId, categoryName) {
    const selectedItem = document.getElementById(itemId);
    if (selectedItem) {
        selectedItem.style.visibility = "visible"; // Force visibility
        selectedItem.style.display = "block"; // Ensure it's not hidden
        selectedItem.style.position = "absolute"; // Keep absolute positioning
        selectedItem.style.left = "0"; // Ensure alignment
        selectedItem.style.top = "0"; // Reset any displacement
        // Apply correct layering
    } else {
        console.warn(`Item not found: ${itemId} in category ${categoryName}`);
    }
}

function applyScorpionPreset() {
    // Hide all clothing items first
    hideSpecificCategories([
        "accessories1", "accessories2", "accessories3", "backitems3",
        "bottomunderwear1", "bottomunderwear2", "bottomunderwear3",
        "bow1", "bow2", "bow3",
        "boxers1", "boxers2", "boxers3",
        "dress1", "dress2", "dress3",
        "expression1", "expression2", "expression3",
        "hat1", "hat2", "hat3",
        "jacket1", "jacket2", "jacket3",
        "mask1", "mask2", "mask3",
        "onepiece1", "onepiece3",
        "pants1", "pants2", "pants3",
        "shoes1", "shoes2", "shoes3",
        "skirt1", "skirt2", "skirt3",
        "socks1", "socks2", "socks3",
        "sweatshirt1", "sweatshirt2", "sweatshirt3",
        "top1", "top2", "top3",
        "topunderwear1", "topunderwear2", "topunderwear3"
    ]);

    // Show the specific items from Scorpion preset
    showItem("pants3_4.png", "pants3");
    showItem("pants2_3.png", "pants2");
    showItem("hat2_2.png", "hat2");
    showItem("hat3_2.png", "hat3");
    showItem("hat1_1.png", "hat1");
    showItem("top1_1.png", "top1");
    showItem("pants1_1.png", "pants1");
    showItem("bottomunderwear3_1.png", "bottomunderwear3");
    showItem("boxers2_1.png", "boxers2");
    showItem("boxers3_1.png", "boxers3");
    showItem("bottomunderwear2_1.png", "bottomunderwear2");
    showItem("bottomunderwear1_1.png", "bottomunderwear1");
}

function showItem(itemId, categoryName) {
    const selectedItem = document.getElementById(itemId);
    if (selectedItem) {
        selectedItem.style.visibility = "visible"; // Force visibility
        selectedItem.style.display = "block"; // Ensure it's not hidden
        selectedItem.style.position = "absolute"; // Keep absolute positioning
        selectedItem.style.left = "0"; // Ensure alignment
        selectedItem.style.top = "0"; // Reset any displacement
    } else {
        console.warn(`Item not found: ${itemId} in category ${categoryName}`);
    }
}