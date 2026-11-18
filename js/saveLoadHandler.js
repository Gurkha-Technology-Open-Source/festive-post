
/**
 * @file saveLoadHandler.js
 * @description This module handles saving and loading designs.
 */

/**
 * @function initializeSaveLoadHandler
 * @description Initializes the save and load event listeners.
 * @param {fabric.Canvas} canvas - The fabric canvas object.
 * @param {HTMLButtonElement} saveDesignBtn - The button to save the design.
 * @param {HTMLButtonElement} loadDesignBtn - The button to load the design.
 * @param {HTMLInputElement} loadDesignInput - The hidden input for loading the design.
 * @param {fabric.Textbox} activeTextObject - The active text object.
 * @param {function} updateControls - The function to update the controls.
 * @param {function} resetControls - The function to reset the controls.
 */
function initializeSaveLoadHandler(canvas, saveDesignBtn, loadDesignBtn, loadDesignInput, activeTextObject, updateControls, resetControls) {

    // Event listeners
    saveDesignBtn.addEventListener('click', () => {
        const json = JSON.stringify(canvas.toJSON());
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'festive-post-design.json';
        link.click();
        URL.revokeObjectURL(url);
    });

    loadDesignBtn.addEventListener('click', () => {
        loadDesignInput.click(); // Trigger the hidden file input
    });

    loadDesignInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            if (file.type && file.type !== 'application/json' && !file.name.toLowerCase().endsWith('.json')) {
                alert('Please choose a valid JSON design file.');
                loadDesignInput.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = (f) => {
                try {
                    const parsedDesign = JSON.parse(f.target.result);
                    canvas.loadFromJSON(parsedDesign, () => {
                        canvas.renderAll();

                        const objects = canvas.getObjects();
                        const textObjects = objects.filter(obj => obj.type === 'textbox');
                        if (textObjects.length > 0) {
                            activeTextObject = textObjects[0];
                            canvas.setActiveObject(activeTextObject);
                            updateControls(activeTextObject);
                        } else {
                            activeTextObject = null;
                            resetControls();
                        }
                    });
                } catch (error) {
                    console.error('Failed to load design file:', error);
                    alert('Could not load this design file. Please check that it is valid JSON.');
                } finally {
                    loadDesignInput.value = '';
                }
            };
            reader.readAsText(file);
        }
    });
}

export { initializeSaveLoadHandler };
