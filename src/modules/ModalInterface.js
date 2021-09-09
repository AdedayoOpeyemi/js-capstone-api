export default class Modal {
  static async #privateGetComments(showIndex) {
    const baseUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/9j4T0EvloyUNWKzzonxh/comments?item_id=${showIndex}`;
    const commentsResponse = await fetch(baseUrl, {
      headers: {
        'Content-type': 'application/json',
      },
    }).then((response) => {
      if (response.status >= 400 && response.status < 600) {
        const result = [{
          username: 'No Comments Yet',
          creation_date: '',
          comment: '',
        }];
        return result;
      }
      return response.json();
    });

    const commentsArray = await commentsResponse;
    return commentsArray;
  }

  static #privateCloseModal() {
    const elementToRemove = document.querySelector('.modal-background');
    if (elementToRemove) {
      document.querySelector('.close-icon').addEventListener('click', () => {
        elementToRemove.remove();
        document.querySelector('html').style.overflowY = 'scroll';
      });
    }
  }

  static #privateCreateModal(showIndex, imgUrl, title, genres, episodes, status, summary) {
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
   <form action="submit" class="comments-form-container d-flex flex-column"  data-show-id=${showIndex}>
     <input type="text" class="modal-input mb-2" placeholder="Your Name"/>
     <textarea class="modal-textarea mb-2" placeholder="Your comment" cols="30" rows="10"></textarea>
     <button type="submit" class="submit-button default-button mb-2">Comment</button>
   </form>
   </div>
  </div>`;
    modalBackground.innerHTML += '<span class="spacer p-2">a</span>';
    mainElement.appendChild(modalBackground);
  }

  static async #privateDisplayComments(arrayOfComments, showIndex) {
    if (!arrayOfComments) {
      arrayOfComments = await Modal.#privateGetComments(showIndex);
    }
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = '';
    if (arrayOfComments) {
      arrayOfComments.forEach((comment) => {
        commentsContainer.innerHTML += `<div class="comment-item d-flex">
          <p class="me-1">${comment.creation_date}</p> 
          <p class="me-1">${comment.username}:</p> 
          <p class="me-1">${comment.comment}</p>
        </div>`;
      });
    }
  }

  static async #privatePostComment(id, name, newComment) {
    const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/9j4T0EvloyUNWKzzonxh/comments', {
      method: 'POST',
      body: JSON.stringify({
        item_id: id,
        username: name,
        comment: newComment,
      }),
      headers: {
        'Content-type': 'application/json',

      },
    });

    return response;
  }

  static async #privateAddNewComment(showIndex) {
    const addNewCommentForm = document.querySelector('.comments-form-container');
    if (addNewCommentForm) {
      addNewCommentForm.addEventListener('submit', (e) => {
        const nameInput = addNewCommentForm.children[0].value;
        const commentTextArea = addNewCommentForm.children[1].value;
        Modal.#privatePostComment(showIndex,
          nameInput, commentTextArea)
          .then(() => {
            Modal.#privateDisplayComments(null, showIndex);
          });
        e.preventDefault();
      });
    }
  }

  static async displayModal(showIndex) {
    const commentsArray = await Modal.#privateGetComments(showIndex);
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
    Modal.#privateCreateModal(showIndex, imgUrl, title, genres, episodes, status, summary);
    Modal.#privateCloseModal();
    Modal.#privateDisplayComments(commentsArray);
    Modal.#privateAddNewComment(showIndex);
  }
}