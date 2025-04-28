document.addEventListener('DOMContentLoaded', () => {
    populateThemeDropdown();
    loadPresets();
});
document.getElementById('generateButton').addEventListener('click', generateIdeas);
document.getElementById('copyButton').addEventListener('click', copyResults);
document.getElementById('randomizeButton').addEventListener('click', randomizeThemes);
document.getElementById('savePresetButton').addEventListener('click', saveCurrentPreset);
document.getElementById('presetSelect').addEventListener('change', loadPresetSelection);
document.getElementById('regenerateColorsButton').addEventListener('click', regeneratePalette);

function populateThemeDropdown() {
    const themeSelect = document.getElementById('themeSelect');
    for (const theme in emojiThemes) {
        const option = document.createElement('option');
        option.value = theme;
        option.textContent = capitalize(theme);
        themeSelect.appendChild(option);
    }
}

function generateIdeas() {
    const selectedOptions = Array.from(document.getElementById('themeSelect').selectedOptions).map(opt => opt.value);
    const customKeyword = document.getElementById('keywordInput').value.trim().toLowerCase();
    const resultsContainer = document.getElementById('resultsContainer');
    const paletteGenerator = document.getElementById('paletteGenerator');
    
    let combinedEmojis = [];
    let combinedRoles = [];
    let searchKeyword = '';

    if (selectedOptions.length > 0) {
        selectedOptions.forEach(theme => {
            combinedEmojis = combinedEmojis.concat(emojiThemes[theme] || []);
            combinedRoles = combinedRoles.concat(roleNames[theme] || []);
        });
        searchKeyword = selectedOptions.join(' ');
    } else if (customKeyword) {
        combinedEmojis = ['✨', '🎨', '🌟'];
        combinedRoles = ['Explorer', 'Creator', 'Guardian'];
        searchKeyword = customKeyword;
    } else {
        alert('Please select at least one theme or enter a keyword!');
        return;
    }

    const colors = generateColorPalette();

    document.getElementById('emojiSuggestions').innerHTML = `<h3>Suggested Emojis:</h3> ${combinedEmojis.join(' ')}`;
    document.getElementById('roleNameIdeas').innerHTML = `<h3>Role Name Ideas:</h3><ul>${combinedRoles.map(r => `<li>${r}</li>`).join('')}</ul>`;
    document.getElementById('colorPalette').innerHTML = `
    <h3>Color Palette:</h3>
    <div class="palette-row">
        ${colors.map(c => `
            <div class="color-chip">
                <div class="color-box" style="background:${c}"></div>
                <div class="color-hex">${c}</div>
            </div>
        `).join('')}
    </div>
`;

    document.getElementById('pinterestLink').innerHTML = `<h3>Pinterest Inspiration:</h3><a href="https://www.pinterest.com/search/pins/?q=${encodeURIComponent(searchKeyword)} aesthetic" target="_blank">Search "${searchKeyword}" on Pinterest</a>`;

    resultsContainer.classList.remove('hidden');
    paletteGenerator.classList.remove('hidden');

    displayAdvancedPalette(colors);
}

function randomizeThemes() {
    const themeSelect = document.getElementById('themeSelect');
    const allThemes = Array.from(themeSelect.options).map(opt => opt.value);
    const randomCount = Math.floor(Math.random() * 3) + 1; // 1-3 themes
    const randomThemes = [];

    while (randomThemes.length < randomCount) {
        const pick = allThemes[Math.floor(Math.random() * allThemes.length)];
        if (!randomThemes.includes(pick)) {
            randomThemes.push(pick);
        }
    }

    for (const option of themeSelect.options) {
        option.selected = randomThemes.includes(option.value);
    }

    generateIdeas();
}

function saveCurrentPreset() {
    const selectedOptions = Array.from(document.getElementById('themeSelect').selectedOptions).map(opt => opt.value);
    if (selectedOptions.length === 0) {
        alert('Please select at least one theme to save.');
        return;
    }
    const presetName = prompt('Name this preset:');
    if (!presetName) return;

    let presets = JSON.parse(localStorage.getItem('themePresets')) || {};
    presets[presetName] = selectedOptions;
    localStorage.setItem('themePresets', JSON.stringify(presets));
    loadPresets();
}

function loadPresets() {
    const presetSelect = document.getElementById('presetSelect');
    presetSelect.innerHTML = `<option value="">-- No preset selected --</option>`;
    const presets = JSON.parse(localStorage.getItem('themePresets')) || {};
    for (const name in presets) {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        presetSelect.appendChild(option);
    }
}

function loadPresetSelection() {
    const selectedPreset = document.getElementById('presetSelect').value;
    if (!selectedPreset) return;
    const presets = JSON.parse(localStorage.getItem('themePresets')) || {};
    const themes = presets[selectedPreset] || [];

    const themeSelect = document.getElementById('themeSelect');
    for (const option of themeSelect.options) {
        option.selected = themes.includes(option.value);
    }
}

function generateColorPalette() {
    const colors = [];
    for (let i = 0; i < 5; i++) {
        const hue = Math.floor(Math.random() * 360);
        colors.push(`hsl(${hue}, 70%, 80%)`);
    }
    return colors;
}

function regeneratePalette() {
    const newColors = generateColorPalette();
    displayAdvancedPalette(newColors);
}

function displayAdvancedPalette(colors) {
    const paletteDiv = document.getElementById('colorPaletteAdvanced');
    paletteDiv.innerHTML = colors.map(color => `
        <div class="color-block">
            <div class="color-box" style="background:${color}"></div>
            <div class="color-hex">${color}</div>
        </div>
    `).join('');
}

function copyResults() {
    const text = document.getElementById('resultsContainer').innerText;
    navigator.clipboard.writeText(text)
        .then(() => alert('Results copied to clipboard!'))
        .catch(err => console.error('Failed to copy:', err));
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
