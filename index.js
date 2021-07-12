import galleryItems from "./app.js";
const refs = {
  galleryListEl: document.querySelector(".js-gallery"),
  modalEl: document.querySelector(".js-lightbox"),
  modalCloseBtn: document.querySelector("[data-action = close-lightbox]"),
  imageOriginalEl: document.querySelector(".lightbox__image"),
  overlayEl: document.querySelector(".lightbox__overlay"),
  lightboxContentEl: document.querySelector(".lightbox__content"),
};

const rendersGalleryMarkup = () => {
  const arrOfStr = galleryItems.map(({ preview, original, description }) => {
    return `<li class = gallery__item><a class = gallery__link><img class = gallery__image src = '${preview}' data-source = '${original}' alt = '${description}'></a>    </li>`;
  });

  const str = arrOfStr.join("");

  refs.galleryListEl.insertAdjacentHTML("afterbegin", str);
};

const onImageClick = function (e) {
  refs.modalEl.classList.add("is-open");
  refs.imageOriginalEl.src = e.target.dataset.source;
  refs.imageOriginalEl.alt = e.target.alt;

  window.addEventListener("keydown", onArrowPress);
};

const onArrowPress = function (e) {
  switch (e.key) {
    case "ArrowLeft":
      console.log("LEFT");
      flipLeft();
      break;
    case "ArrowRight":
      console.log("RIGHT");
      flipRight();
      break;
  }
};

const flipLeft = () => {
  const currentImgSrc = refs.imageOriginalEl.src;
  const galleryImgArr = [...document.querySelectorAll(".gallery__image")];

  let previousImgSrc = currentImgSrc;

  for (let i = 0; i < galleryImgArr.length; i += 1) {
    if (
      currentImgSrc === galleryImgArr[i].dataset.source &&
      galleryImgArr[i - 1] !== undefined
    ) {
      previousImgSrc = galleryImgArr[i - 1].dataset.source;
    }
  }

  refs.imageOriginalEl.src = previousImgSrc;
};

const flipRight = () => {
  const currentImgSrc = refs.imageOriginalEl.src;
  const galleryImgArr = [...document.querySelectorAll(".gallery__image")];

  let nextImgSrc = currentImgSrc;

  for (let i = 0; i < galleryImgArr.length; i += 1) {
    if (
      currentImgSrc === galleryImgArr[i].dataset.source &&
      galleryImgArr[i + 1] !== undefined
    ) {
      nextImgSrc = galleryImgArr[i + 1].dataset.source;
    }
  }

  refs.imageOriginalEl.src = nextImgSrc;
};

const onModalBtnClick = function () {
  refs.modalEl.classList.remove("is-open");

  refs.imageOriginalEl.src = "";

  window.removeEventListener("keydown", onArrowPress);
};

const onEscPress = (e) => {
  if (e.key === "Escape") {
    onModalBtnClick();
  }
};

rendersGalleryMarkup();

refs.galleryListEl.addEventListener("click", onImageClick);
refs.modalCloseBtn.addEventListener("click", onModalBtnClick);
refs.overlayEl.addEventListener("click", onModalBtnClick);
window.addEventListener("keydown", onEscPress);
