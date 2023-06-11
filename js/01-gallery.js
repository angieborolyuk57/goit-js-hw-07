import { galleryItems } from './gallery-items.js';


console.log(galleryItems);

const mainGallery = document.querySelector(".gallery");

function createGalleryMarkup(items) {
  return items
    .map(
      (item) =>
        `<div class="gallery__item">
          <a class="gallery__link" href="${item.original}">
            <img 
              class="gallery__image" 
              src="${item.preview}" 
              data-source="${item.original}" 
              alt="${item.description}"
            />
          </a>
        </div>`
    )
    .join("");
}

const addGalleryMarkup = createGalleryMarkup(galleryItems);

mainGallery.innerHTML = addGalleryMarkup;

mainGallery.addEventListener("click", onImageClick);

function onImageClick(event) {
  blockStandardAction(event);

  if (event.target.nodeName !== "IMG") {
    return;
  }
  const instance = basicLightbox.create(` <img src="${event.target.dataset.source}" width="1400" height="1200">`);

  instance.show();

  mainGallery.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      instance.close();
    }
  });
}

function blockStandardAction(event) {
    event.preventDefault();
}
