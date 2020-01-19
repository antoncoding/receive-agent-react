import React, { useState } from 'react';
import { Main, Split } from '@aragon/ui';

// import AppHeader from './component/AppHeader';
import NavBar from './component/NavBar';
import DistributionBox from './component/Distribution'
import ENSBox from './component/ENSBox'
import History from './component/HistoryBox'


function App() {
  const [user, setUser] = useState('unkown');

  return (
    <>
      <Main>
        { NavBar(user, setUser) }
        <Split
          primary={
            <>
              {History()}
            </>
          }
          secondary={
            <>
            {DistributionBox()}
            {ENSBox()}
            </>
          }
        />
        {/* <AppHeader></AppHeader> */}
        {/* <div>Your app goes here</div> */}
      </Main>
    </>
  );
}

export default App;
