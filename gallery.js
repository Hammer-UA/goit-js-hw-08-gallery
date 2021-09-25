import data from "./app.js";

const refs = {
    gallery: document.querySelector('.js-gallery'),
    modal: document.querySelector('.js-lightbox'),
    modalImage: document.querySelector('.lightbox__image')
}
const {gallery, modal, modalImage} = refs

const item = `
<li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li>
`
function createItems(array) {
    // console.log(array);
    return array.map((elem) => {
        const {original, preview, description} = elem
        // console.log(original, preview, description);
        return `
<li class="gallery__item">
  <a class="gallery__link"
    href="${preview}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
`    
    }).join('')
    // console.log(result.join(''));
}
const markup = createItems(data)
// console.log(markup);

refs.gallery.insertAdjacentHTML("afterbegin", markup)

refs.gallery.addEventListener('click', onClickGalleryitem)

refs.modal.addEventListener('click', e => {
  if (e.target.dataset.action === 'prev-image') onPrevImage();
  if (e.target.dataset.action === 'next-image') onNextImage();
  if (e.target.classList.contains('lightbox__overlay') ||
    e.target.dataset.action === 'close-lightbox')
    onCloseModal();
}
)

function onClickGalleryitem(e) {
  if (!e.target.classList.contains('gallery__image')) return;
  e.preventDefault();
  refs.modal.classList.add('is-open');
  setModalImageSrcAndAlt(e.target.dataset.source, e.target.alt); 
}
 
function setModalImageSrcAndAlt(src, alt) {
  refs.modalImage.src = src;
  refs.modalImage.alt = alt;
}

function onCloseModal() {
  refs.modal.classList.remove('is-open');
  setModalImageSrcAndAlt('','')
}

window.addEventListener('keydown', (e) => {
  const condition = e.code === 'Escape'
  // console.log(condition);
  refs.modal.classList.remove('is-open')
})