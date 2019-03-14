import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import { Header, HeaderNavigation, Footer } from 'rivet-react';
import Page1 from './Components/Page1';
import Page2 from './Components/Page2';

import styled from 'styled-components';

import './App.css';

const AppWindow = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  flex: 1;
`;

const App = () => {
  const [tab, setTab] = useState('tab1');

  return (
    <AppWindow>
      <Header title="Deep Sentinel">
        <HeaderNavigation>
          {tab === 'tab1' ? (
            <a aria-current="Page1" onClick={() => setTab('tab1')}>
              Page 1
            </a>
          ) : (
            <a onClick={() => setTab('tab1')}>Page 1</a>
          )}
          {tab === 'tab2' ? (
            <a aria-current="Page2" onClick={() => setTab('tab2')}>
              Page 2
            </a>
          ) : (
            <a onClick={() => setTab('tab2')}>Page 2</a>
          )}
        </HeaderNavigation>
      </Header>
      <Container>
        {tab === 'tab1' ? <Page1 /> : null}
        {tab === 'tab2' ? <Page2 /> : null}
      </Container>
      <Footer />
    </AppWindow>
  );
};

export default (process.env.NODE_ENV === 'development'
  ? hot(module)(App)
  : App);
