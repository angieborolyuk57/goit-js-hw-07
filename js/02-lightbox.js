import { galleryItems } from './gallery-items.js';

console.log(galleryItems);

const galleryCards = document.querySelector(".gallery");

function createGalleryMarkup(items) {
  return items
    .map(
      (item) =>
        `<li class="gallery__item">
          <a class="gallery__link" href="${item.original}">
            <img class="gallery__image" src="${item.preview}" alt="${item.description}" data-caption="${item.description}"/>
          </a>
        </li>`
    )
    .join("");
}

const addGalleryMarkup = createGalleryMarkup(galleryItems);

galleryCards.innerHTML = addGalleryMarkup;

galleryCards.addEventListener("click", onImageClick);

function onImageClick(event) {
  blockStandardAction(event);

  const lightbox = new SimpleLightbox('.gallery__link', {
    captions: true,
    captionDelay: 250,
    captionSelector: 'alt',
    captionType: 'data',
    captionPosition: 'bottom',
    captionClass: 'sl-caption',
  });

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const action = lightbox.open(event.target);

  action.element().addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      action.close();
    }
  });
}

function blockStandardAction(event) {
  event.preventDefault();
}
