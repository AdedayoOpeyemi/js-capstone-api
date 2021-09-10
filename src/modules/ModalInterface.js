export default class Modal {
  static #privateCloseModal() {
    const elementToRemove = document.querySelector('.modal-background');
    if (elementToRemove) {
      document.querySelector('.close-icon').addEventListener('click', () => {
        elementToRemove.remove();
        document.querySelector('html').style.overflowY = 'scroll';
      });
    }
  }

  static #privateTest(imgUrl, title, genres, episodes, status, summary) {
    const mainElement = document.getElementById('main-content');
    const modalBackground = document.createElement('div');
    modalBackground.className = 'modal-background d-flex flex-column align-items-center';

    modalBackground.innerHTML = `<div class="modal-container position-relative">
   <div class="modal-info d-flex flex-column align-items-center p-4 mx-auto my-2 position-relative">
   <div class="close-icon"><i class="fas fa-2x fa-times"></i></div>
   <img id="thumbnail-image" class="thumbnail-image mb-3" src="${imgUrl}" alt=""/>
   <h2 id="show-title" class="modal-title mb-3">${title}</h2>
   <div class="show-info d-flex flex-column w-50 mb-4">
     <p id="genre" class="modal-info-item mb-2">TV Series - <b>${genres}</b></p>
     <p id="episodes" class="modal-info-item mb-2">Episodes: <b>${episodes}</b></p>
     <p id="status" class="modal-info-item mb-2">Status: <b>${status}</b></p>
     <p id="summary" class="modal-info-item mb-2">${summary}</p>
   </div>
    <h3 class="modal-auxiliar-titles mb-3">Comments</h3>
   <div id="comments-container" class="d-flex flex-column mb-3">
   </div>
   <h3 class="modal-auxiliar-titles mb-3">Add a comment</h3>
   <form action="submit" class="d-flex flex-column">
     <input type="text" class="modal-input mb-2" placeholder="Your Name"/>
     <textarea class="modal-textarea mb-2" placeholder="Your comment" cols="30" rows="10"></textarea>
     <button type="submit" class="default-button mb-2">Comment</button>
   </form>
   </div>
  </div>`;
    modalBackground.innerHTML += '<span class="spacer p-2">a</span>';
    mainElement.appendChild(modalBackground);
  }

  static async displayModal(showIndex) {
    const showResponse = await fetch(`https://api.tvmaze.com/shows/${showIndex}`);
    const showJson = await showResponse.json();
    const epResponse = await fetch(`https://api.tvmaze.com/shows/${showIndex}/episodes`);
    const epJson = await epResponse.json();
    const episodes = epJson.length;
    const genresArray = showJson.genres;
    const genres = genresArray.join(', ');
    const imgUrl = showJson.image.original;
    const title = showJson.name;
    const { status } = showJson;
    const { summary } = await showJson;
    document.querySelector('html').style.overflowY = 'hidden';
    Modal.#privateTest(imgUrl, title, genres, episodes, status, summary);
    Modal.#privateCloseModal();
  }
}