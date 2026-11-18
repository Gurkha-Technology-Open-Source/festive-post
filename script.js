
/**
 * @file script.js
 * @description This is the main script file for the Festive Post Generator.
 * It initializes the canvas and all the modules.
 */

import { loadTemplates, displayCategories, displayTemplates } from './js/templateHandler.js';
import { initializeTextControls } from './js/textControls.js';
import { initializeImageControls } from './js/imageControls.js';
import { initializeSaveLoadHandler } from './js/saveLoadHandler.js';
import { initializeDownloadHandler } from './js/downloadHandler.js';

function setupRangeValueIndicators() {
    const indicators = document.querySelectorAll('.range-value[data-for]');

    indicators.forEach((indicator) => {
        const inputId = indicator.getAttribute('data-for');
        const input = document.getElementById(inputId);

        if (!input) {
            return;
        }

        const unit = indicator.getAttribute('data-unit') || '';
        const render = () => {
            indicator.textContent = `${input.value}${unit}`;
        };

        input.addEventListener('input', render);
        render();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Get all the necessary DOM elements
    const canvas = new fabric.Canvas('canvas');
    const companyNameInput = document.getElementById('company-name');
    const logoUpload = document.getElementById('logo-upload');
    const dropZone = document.getElementById('drop-zone');
    const logoOpacityInput = document.getElementById('logo-opacity');
    const brandColorInput = document.getElementById('brand-color');
    const colorPalette = document.getElementById('color-palette');
    const downloadBtn = document.getElementById('download-btn');
    const downloadFormatSelect = document.getElementById('download-format');
    const templateGallery = document.getElementById('template-gallery');
    const categoryFilters = document.getElementById('category-filters');
    const searchInput = document.getElementById('search-template');
    const fontFamilySelect = document.getElementById('font-family');
    const textAlignButtons = document.getElementById('text-align-buttons');
    const fontSizeInput = document.getElementById('font-size');
    const textRotationInput = document.getElementById('text-rotation');
    const textOutlineWidthInput = document.getElementById('text-outline-width');
    const textOutlineColorInput = document.getElementById('text-outline-color');
    const textShadowColorInput = document.getElementById('text-shadow-color');
    const textShadowBlurInput = document.getElementById('text-shadow-blur');
    const textShadowOffsetXInput = document.getElementById('text-shadow-offset-x');
    const textShadowOffsetYInput = document.getElementById('text-shadow-offset-y');
    const imageFilters = document.getElementById('image-filters');
    const saveDesignBtn = document.getElementById('save-design-btn');
    const loadDesignBtn = document.getElementById('load-design-btn');
    const loadDesignInput = document.getElementById('load-design-input');
    const addTextBtn = document.getElementById('add-text-btn');

    // Initialize variables
    let activeTextObject, logoImg, templates = [];

    setupRangeValueIndicators();

    // Load templates and initialize the template gallery
    loadTemplates((loadedTemplates) => {
        templates = loadedTemplates;
        displayCategories(templates, categoryFilters, (category) => displayTemplates(templates, category, searchInput.value, templateGallery, selectTemplate));
        displayTemplates(templates, 'all', '', templateGallery, selectTemplate);
    });

    // Function to select a template
    function selectTemplate(path) {
        fabric.Image.fromURL(path, (img) => {
            if (!img || !img.width || !img.height) {
                alert('Could not load that template image.');
                return;
            }

            const currentFilters = canvas.backgroundImage && canvas.backgroundImage.width
                ? canvas.backgroundImage.filters
                : [];
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                scaleX: canvas.width / img.width,
                scaleY: canvas.height / img.height,
                filters: currentFilters || []
            });
        });
    }

    // Initialize all the modules
    const textControlsApi = initializeTextControls(canvas, activeTextObject, companyNameInput, brandColorInput, colorPalette, fontFamilySelect, textAlignButtons, fontSizeInput, textRotationInput, textOutlineWidthInput, textOutlineColorInput, textShadowColorInput, textShadowBlurInput, textShadowOffsetXInput, textShadowOffsetYInput, addTextBtn);
    initializeImageControls(canvas, logoUpload, dropZone, logoOpacityInput, logoImg, imageFilters);
    initializeSaveLoadHandler(canvas, saveDesignBtn, loadDesignBtn, loadDesignInput, activeTextObject, textControlsApi.updateControls, textControlsApi.resetControls);
    initializeDownloadHandler(canvas, downloadBtn, downloadFormatSelect);

    // Event listener for the search input
    searchInput.addEventListener('input', () => {
        const activeCategoryButton = document.querySelector('.category-btn.active');
        const activeCategory = activeCategoryButton ? activeCategoryButton.dataset.category : 'all';
        displayTemplates(templates, activeCategory, searchInput.value, templateGallery, selectTemplate);
    });
});
