
/**
 * @file imageControls.js
 * @description This module handles logo uploading, drag and drop, and opacity.
 */

/**
 * @function initializeImageControls
 * @description Initializes all the image-related event listeners.
 * @param {fabric.Canvas} canvas - The fabric canvas object.
 * @param {HTMLInputElement} logoUpload - The input for the logo upload.
 * @param {HTMLElement} dropZone - The drop zone for the logo.
 * @param {HTMLInputElement} logoOpacityInput - The input for the logo opacity.
 * @param {fabric.Image} logoImg - The logo image object.
 */
function initializeImageControls(canvas, logoUpload, dropZone, logoOpacityInput, logoImg, imageFilters) {

    function applyBackgroundFilter(filterType, activeButton) {
        if (!imageFilters) {
            return;
        }

        imageFilters.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        if (activeButton) {
            activeButton.classList.add('active');
        }

        if (!canvas.backgroundImage || !canvas.backgroundImage.width || typeof canvas.backgroundImage.applyFilters !== 'function') {
            return;
        }

        canvas.backgroundImage.filters = [];
        if (filterType === 'grayscale') {
            canvas.backgroundImage.filters.push(new fabric.Image.filters.Grayscale());
        } else if (filterType === 'sepia') {
            canvas.backgroundImage.filters.push(new fabric.Image.filters.Sepia());
        } else if (filterType === 'invert') {
            canvas.backgroundImage.filters.push(new fabric.Image.filters.Invert());
        }

        canvas.backgroundImage.applyFilters();
        canvas.renderAll();
    }

    // Event listeners
    logoUpload.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        handleLogoFile(file);
    });

    dropZone.addEventListener('click', () => {
        logoUpload.click();
    });

    dropZone.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            logoUpload.click();
        }
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('highlight');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('highlight');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('highlight');
        const file = e.dataTransfer.files[0];
        handleLogoFile(file);
    });

    /**
     * @function handleLogoFile
     * @description Handles the logo file upload and adds the logo to the canvas.
     * @param {File} file - The logo file.
     */
    function handleLogoFile(file) {
        if (!file) {
            return;
        }

        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file.');
            logoUpload.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = (f) => {
            const img = new Image();
            img.onload = () => {
                const tempCanvas = document.createElement('canvas');
                const MAX_WIDTH = 400;
                const MAX_HEIGHT = 400;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }

                tempCanvas.width = width;
                tempCanvas.height = height;
                const ctx = tempCanvas.getContext('2d');

                if (!ctx) {
                    logoUpload.value = '';
                    return;
                }

                ctx.drawImage(img, 0, 0, width, height);
                const dataURL = tempCanvas.toDataURL('image/png', 0.8);

                fabric.Image.fromURL(dataURL, (fabricImg) => {
                    if (logoImg) {
                        canvas.remove(logoImg);
                    }
                    logoImg = fabricImg;
                    logoImg.set({
                        left: canvas.width / 2,
                        top: 100,
                        originX: 'center',
                        opacity: parseFloat(logoOpacityInput.value)
                    });
                    canvas.add(logoImg);
                    canvas.setActiveObject(logoImg);
                    canvas.renderAll();
                });
            };
            img.src = f.target.result;
        };
        reader.readAsDataURL(file);
    }

    logoOpacityInput.addEventListener('input', () => {
        if (logoImg) {
            logoImg.set('opacity', parseFloat(logoOpacityInput.value));
            canvas.renderAll();
        }
    });

    if (imageFilters) {
        imageFilters.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                applyBackgroundFilter(e.target.dataset.filter, e.target);
            }
        });

        imageFilters.addEventListener('keydown', (e) => {
            if (e.target.classList.contains('filter-btn') && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                applyBackgroundFilter(e.target.dataset.filter, e.target);
            }
        });
    }

}

export { initializeImageControls };
