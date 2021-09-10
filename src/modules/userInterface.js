import Modal from './ModalInterface.js';

const createShowCard = (show, likes) => `<div class="col">
  <div class="show-card mt-3 mx-auto" data-show-id=${show.id} data-show-name=${show.name}>
    <div class="show-image-holder">
      <img src=${show.image.medium} class="show-image" data-show-id=${show.id} data-show-name=${show.name}>
    </div>
    <div class="d-flex flex-column p-2">
      <div class="mb-3 d-flex justify-content-between">
        <h3 class="show-title" data-show-id=${show.id} data-show-name=${show.name}>${show.name}</h3>
        <div class="d-flex flex-column likes-section">
          <span><i class="fas fa-heart"></i></span>
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

const addShowToPage = (show, likes) => {
  const showCardHolder = document.querySelector('#show-card-holder');
  showCardHolder.innerHTML += createShowCard(show, likes);
};

export const renderShows = async (shows, allLikes) => {
  shows.forEach((show) => {
    const noOfLikes = printLike(allLikes, show.id)
    let showLikes = noOfLikes === undefined ? 0 : noOfLikes.likes;
    addShowToPage(show, showLikes );
  });
};

const printLike = (data, id) => {
  return data.find(finder, id )
}

const getLikes = async () => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/9j4T0EvloyUNWKzzonxh/likes/');
  const data = response.json()
  console.log(data)
  return data;
};


function finder(likesData) {
  return likesData.item_id == this;
}

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

// export const likesListener = () => {
//   const likesButton = document.querySelectorAll('.likes-btn');
//   if (likesButton) {
//     likesButton.forEach((button) => {
//       button.addEventListener('click', () => {
//         Modal.displayModal(button.dataset.showId);
//       });
//     });
//   }
// };