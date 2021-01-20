import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  Mousewheel,
  A11y,
  EffectCoverflow,
} from 'swiper';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import AboutPage from './pages/AboutPage';
import ErrorPage from './pages/ErrorPage';
import ReviewPage from './pages/ReviewPage';
import SignUpPage from './pages/SignUpPage';

import 'swiper/swiper-bundle.css';
import './App.css';

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  Mousewheel,
  EffectCoverflow,
  A11y,
]);

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/about" component={AboutPage}></Route>
        <Route path="/review/:id" component={ReviewPage}></Route>
        <Route path="/error" component={ErrorPage}></Route>
        <Route path="/" component={SignUpPage}></Route>
      </Switch>
    </Router>
  );
}
