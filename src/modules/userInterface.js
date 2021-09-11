import Modal from './ModalInterface.js';
import { postLikes } from './interactions.js';

const createShowCard = (show, likes) => `<div class="col">
  <div class="show-card mt-3 mx-auto" data-show-id=${show.id} data-show-name=${show.name}>
    <div class="show-image-holder">
      <img src=${show.image.medium} class="show-image" data-show-id=${show.id} data-show-name=${show.name}>
    </div>
    <div class="d-flex flex-column p-2">
      <div class="mb-3 d-flex justify-content-between">
        <h3 class="show-title" data-show-id=${show.id} data-show-name=${show.name}>${show.name}</h3>
        <div class="d-flex flex-column likes-section">
          <span class="likes-btn" data-show-id=${show.id}><i class="fas fa-heart" data-show-id=${show.id}></i></span>
          <span>${likes} Likes</span>
        </div>
        
      </div>
      <div class="mb-3 mx-auto">
        <button class="comments-btn mx-auto p-2 button" data-show-id=${show.id} data-show-name=${show.name}>Comments</button>
      </div>
      <div class="mb-3 mx-auto">
        <button class="reservation-btn mx-auto p-2 button" data-show-id=${show.id} data-show-name=${show.name}>Reservation</button>
      </div>
    </div>
  </div>
</div>`;

function finder(likesData) {
  return likesData.item_id === this.toString();
}

const printLike = (data, id) => data.find(finder, id);

const addShowToPage = (show, likes) => {
  const showCardHolder = document.querySelector('#show-card-holder');
  showCardHolder.innerHTML += createShowCard(show, likes);
};

export const renderShows = async (shows, allLikes) => {
  shows.forEach((show) => {
    const noOfLikes = printLike(allLikes, show.id);
    const showLikes = noOfLikes === undefined ? 0 : noOfLikes.likes;
    addShowToPage(show, showLikes);
  });
};

export const imageListener = () => {
  const images = document.querySelectorAll('.show-image');
  if (images) {
    images.forEach((image) => {
      image.addEventListener('click', () => {
        Modal.displayModal(image.dataset.showId);
      });
    });
  }
};

export const commentsListener = () => {
  const comments = document.querySelectorAll('.comments-btn');
  if (comments) {
    comments.forEach((button) => {
      button.addEventListener('click', () => {
        Modal.displayModal(button.dataset.showId);
      });
    });
  }
};

export const reservationListener = () => {
  const reservations = document.querySelectorAll('.reservation-btn');
  if (reservations) {
    reservations.forEach((button) => {
      button.addEventListener('click', () => {
        Modal.displayModal(button.dataset.showId);
      });
    });
  }
};

export const likesListener = () => {
  const likesButton = document.querySelectorAll('.likes-btn');
  if (likesButton) {
    likesButton.forEach((button) => {
      button.addEventListener('click', () => {
        postLikes(button.dataset.showId);
        const olddata = button.nextElementSibling.innerHTML.split(' ')[0];
        const newdata = parseInt(olddata, 10) + 1;
        button.nextElementSibling.innerHTML = `${newdata} Likes`;
      });
    });
  }
};

export const addNumberOfShows = (numberOfAllShows) => {
  const countHolder = document.querySelector('#total_count');
  countHolder.innerHTML = numberOfAllShows;
};
