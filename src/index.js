import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import '@fortawesome/fontawesome-free/js/brands.js';
import './styles.css';
import UI from './modules/UserInterface.js';

UI.displayModal(Math.floor(Math.random() * (239)) + 1);