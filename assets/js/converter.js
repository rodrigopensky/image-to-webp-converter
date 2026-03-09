/*
=========================================
Image to WebP Converter
Author: Rodrigo Cardoso Barbosa Miranda
=========================================
*/

const fileSelector = document.getElementById("fileSelector");
const dropTarget = document.getElementById("dropTarget");
const previewContainer = document.getElementById("previewContainer");

/*
Process file
*/
function processFile(file){

    if(!file || !file.type.startsWith("image/")) return;

    const rawImage = new Image();
    rawImage.src = URL.createObjectURL(file);

    rawImage.onload = () => {

        const canvas = document.createElement("canvas");
        canvas.width = rawImage.width;
        canvas.height = rawImage.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(rawImage,0,0);

        canvas.toBlob(blob => {

            const webpURL = URL.createObjectURL(blob);

            const col = document.createElement("div");
            col.className = "preview-col";

            const img = document.createElement("img");
            img.src = webpURL;
            img.className = "preview-image";

            const link = document.createElement("a");

            const baseName = file.name.replace(/\.[^/.]+$/, "");

            link.href = webpURL;
            link.download = baseName + ".webp";

            link.appendChild(img);

            col.appendChild(link);

            previewContainer.appendChild(col);

        },"image/webp");

    };

}

/*
Handle files
*/
function handleFiles(files){
    for(const file of files){
        processFile(file);
    }
}

/*
Input Upload
*/
fileSelector.addEventListener("change",(e)=>{
    handleFiles(e.target.files);
});

/*
Drag Events
*/
dropTarget.addEventListener("dragover",(e)=>{
    e.preventDefault();
});

dropTarget.addEventListener("drop",(e)=>{

    e.preventDefault();

    const files = e.dataTransfer.files;

    handleFiles(files);

});