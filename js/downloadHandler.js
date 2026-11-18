
/**
 * @file downloadHandler.js
 * @description This module handles downloading the final post.
 */

/**
 * @function initializeDownloadHandler
 * @description Initializes the download event listener.
 * @param {fabric.Canvas} canvas - The fabric canvas object.
 * @param {HTMLButtonElement} downloadBtn - The button to download the post.
 * @param {HTMLSelectElement} downloadFormatSelect - The select for the download format.
 */
function initializeDownloadHandler(canvas, downloadBtn, downloadFormatSelect) {

    // Event listener
    downloadBtn.addEventListener('click', () => {
        const format = downloadFormatSelect.value;
        const previousLabel = downloadBtn.textContent;
        downloadBtn.disabled = true;
        downloadBtn.textContent = 'Preparing download...';

        const restoreButton = () => {
            downloadBtn.disabled = false;
            downloadBtn.textContent = previousLabel;
        };

        try {
            // Fabric's canvas exposes toDataURL, not the DOM canvas toBlob API.
            const dataUrl = canvas.toDataURL({ format, quality: 1 });
            if (!dataUrl) {
                alert('Failed to generate image. Please try again.');
                restoreButton();
                return;
            }

            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `festive-post.${format}`;
            link.click();
            restoreButton();
        } catch (error) {
            console.error('Failed to generate image:', error);
            alert('Failed to generate image. Please try again.');
            restoreButton();
        }
    });
}

export { initializeDownloadHandler };
