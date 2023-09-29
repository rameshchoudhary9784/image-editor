const fileInput  = document.querySelector(".file-input");
const filterOptions  = document.querySelectorAll(".filter button");
const filterName  = document.querySelector(".filter-info .name");
const filterValue  = document.querySelector(".filter-info .value");
const filterSlider  = document.querySelector(".slider input");
const rotateOptions  = document.querySelectorAll(".rotate button");
const previewImg  = document.querySelector(".preview-img img");
const chooseImgBtn  = document.querySelector(".choose-img");
const resetFilterBtn  = document.querySelector(".reset-filter");
const saveImgBtn  = document.querySelector(".save-img");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilters = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

const loadImage = () => {     
    let file  = fileInput.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable");
    });
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        } else if(option.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        } else if(option.id === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        } else{
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
});


const updateFilter = () => {
    filterValue.innerText =  `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");

    if(selectedFilter.id == "brightness") {
        brightness = filterSlider.value;
    } else if(selectedFilter.id == "saturation") {
        saturation = filterSlider.value;
    } else if(selectedFilter.id == "inversion") {
        inversion = filterSlider.value;
    } else {
        grayscale = filterSlider.value;
    }
    applyFilters();
}

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id == "left") {
            rotate -= 90; //for left rotation,
        } else if(option.id == "right") {
            rotate += 90; //for right rotation,
        } else if(option.id == "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1; //for horizontal flip,
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1; //for vertical flip,
        }
        applyFilters();
    });
});


const resetFilter = () => {
    brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
    rotate = 0, flipHorizon                                                                                                                                                                            tal = 1, flipVertical = 1;
    filterOptions[0].click();
    applyFilters();
}

const saveImage = () => {
    const canvas = document.createElement("canvas"); // creating canvas element
    const ctx = canvas.getContext("2d"); // canvas.getContext return a drawing context on the canvas
    canvas.width = previewImg.naturalWidth; // setting canvas width to actual image width
    canvas.height = previewImg.naturalHeight; // setting canvas width to actual image width
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);// translate caanvas from center
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);// flip canvas horizontally or vertically
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = "image.jpg"; // passing <a> tag to download value to "image.jpg"
    link.href = canvas.toDataURL();// passing <a> tag href value to canvas data url
    link.click(); // clicking <a> tag to download image
} 

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());

