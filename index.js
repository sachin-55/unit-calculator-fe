/** @jsx jsx */
import "@babel/polyfill";
import {hot} from 'react-hot-loader/root';
import React from 'react';
import { jsx } from 'theme-ui';
import ReactDOM from 'react-dom';
import Root from './src/Root';

import {Provider} from 'react-redux';
import store from './src/store';

const Index =hot(() => {
    return (
        <Provider store={store}>
            <Root />
        </Provider>
    );
});


ReactDOM.render(<Index />, document.getElementById('root'))

