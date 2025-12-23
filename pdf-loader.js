// Load PDF.js as a regular script (not ES6 module)
const pdfScript = document.createElement('script');
pdfScript.src = chrome.runtime.getURL('pdf.min.js');
pdfScript.onload = () => {
    if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL('pdf.worker.min.js');
        console.log("Gemox: PDF.js module loaded and configured");
        console.log("Gemox: PDF.js worker configured:", window.pdfjsLib.GlobalWorkerOptions.workerSrc);
        window.dispatchEvent(new Event('pdfjs-ready'));
    } else {
        console.error("Gemox: pdfjsLib not found after loading pdf.min.js");
        window.dispatchEvent(new Event('pdfjs-error'));
    }
};
pdfScript.onerror = (error) => {
    console.error("Gemox: Failed to load pdf.min.js:", error);
    window.dispatchEvent(new Event('pdfjs-error'));
};
document.head.appendChild(pdfScript);