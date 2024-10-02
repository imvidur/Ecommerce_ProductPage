//For the mobile view we have to do following changes
const menuIcon = document.querySelector(".menu-icon");
const backDrop = document.querySelector(".backdrop");
const navLinks = document.querySelector(".nav-links");
const closeIcon = document.querySelector(".close-icon");

//adds the active class to the backdrop element on being clicked
menuIcon.addEventListener("click", () => {
  backDrop.classList.add("active"); 
  navLinks.classList.add("active");
});

// if user clicks closeIcon then the backdrop and navLinks elements will disappear from the view
closeIcon.addEventListener("click", () => {
  backDrop.classList.remove("active");
  navLinks.classList.remove("active");
});

// same happens if the user clicks anywhere on the backdrop
backDrop.addEventListener("click", () => {
  backDrop.classList.remove("active");
  navLinks.classList.remove("active");
});

const mainImages = document.querySelectorAll(".default .central-img img");
const thumbnails = document.querySelectorAll(".default .thumbnail-list div");
const lightboxMainImages = document.querySelectorAll(".lightbox .central-img img");
const lightboxThumbnails = document.querySelectorAll(".lightbox .thumbnail-list div");
const lightbox = document.querySelector(".lightbox");
const iconClose = document.querySelector(".icon-close");
const iconPrev = document.querySelector(".icon-prev");
const iconNext = document.querySelector(".icon-next");
//to keep track of selected image initially set to 0
let currentImageIndex = 0;


//function will be called when thumbnail is clicked
//removing the active class for others and setting for just the clicked one.
const changeImage = (index, mainImages, thumbnails) => {
  mainImages.forEach((img) => {
    img.classList.remove("active");
  });
  thumbnails.forEach((thumb) => {
    thumb.classList.remove("active");
  });

  mainImages[index].classList.add("active");
  thumbnails[index].classList.add("active");
  currentImageIndex = index;  //to keep track of selected image
};

//to change images on the regular page.
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    changeImage(index, mainImages, thumbnails);
  });
});

// to change images inside a lightbox.
lightboxThumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    changeImage(index, lightboxMainImages, lightboxThumbnails);
  });
});

// When any mainImage is clicked: to make lightbox overlay becomes visible 
// by calling the changeImage function to update the active image and thumbnail in the lightbox.
mainImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    changeImage(index, lightboxMainImages, lightboxThumbnails);
  });
});

//To update the main image and thumbnail display according to the icon clicked
//while making ensure that the image carousel loops back to the first image after the last one and vice versa.
iconPrev.addEventListener("click", () => {
    if (currentImageIndex <= 0) {
        changeImage(mainImages.length - 1, lightboxMainImages, lightboxThumbnails);
  } else {
    changeImage(currentImageIndex - 1, lightboxMainImages, lightboxThumbnails);
  }
});

iconNext.addEventListener("click", () => {
  if (currentImageIndex >= mainImages.length - 1) {
    changeImage(0, lightboxMainImages, lightboxThumbnails);
  } else {
    changeImage(currentImageIndex + 1, lightboxMainImages, lightboxThumbnails);
  }
});

//To hide the lightbox when iconClose is clicked
iconClose.addEventListener("click", () => {
  lightbox.classList.remove("active");
});
