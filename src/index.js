import ReactDOM from 'react-dom';
import App from './App';
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'animate.css';
import './index.css';

//this package connect react to redux
import { Provider } from 'react-redux';

// import store from './examples/ex_1/store';
import store from './examples/ex_2/front/store';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));






