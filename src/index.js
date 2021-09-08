import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import popularShows from './modules/getShows.js';
import renderShows from './modules/userInterface.js';

document.addEventListener('DOMContentLoaded', async () => {
  popularShows().then((result) => {
    renderShows(result);
  });
});
