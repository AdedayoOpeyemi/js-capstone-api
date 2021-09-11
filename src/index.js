import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import '@fortawesome/fontawesome-free/js/brands.js';
import './styles.css';
import { popularShows, numberOfShows } from './modules/getShows.js';
import { getLikes } from './modules/interactions.js';
import {
  imageListener, renderShows, commentsListener, reservationListener,
  likesListener, addNumberOfShows,
} from './modules/userInterface.js';

document.addEventListener('DOMContentLoaded', async () => {
  const [allShows, allLikes] = await Promise.all([popularShows(), getLikes()]);

  renderShows(allShows, allLikes)
  imageListener();
  commentsListener();
  reservationListener();
  likesListener();
  const output = numberOfShows(allShows);
  addNumberOfShows(output);
});
