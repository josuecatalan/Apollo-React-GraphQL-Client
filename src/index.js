import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import ApolloProvider from './ApolloProvider';

import 'semantic-ui-css/semantic.min.css';
import 'animate.css/animate.min.css';
import './App.css';

ReactDOM.render(ApolloProvider, document.getElementById('root'));

serviceWorker.unregister();
