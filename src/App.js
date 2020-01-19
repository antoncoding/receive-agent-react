import React, { useState } from 'react';
import { Main, Split } from '@aragon/ui';

import NavBar from './component/NavBar';
import DistributionBox from './component/Distribution'
import ENSBox from './component/ENSBox'
import History from './component/HistoryBox'
import NoAgent from './component/NoAgentBox'
// import Web3 from 'web3';

// const web3 = new Web3()

function App() {
  const [web3, setWeb3] = useState(null)
  const [user, setUser] = useState('');
  // const [agentAddress, setAgentAddress] = useState('')
  
  const [factory, setFactory] = useState(null)
  const [agent, setAgent] = useState(null)
  
  const [ distribution, setDistribution ] = useState([
    { item: 'ETH', percentage: 100 }
  ])

  return (
    <>
      <Main>
        { NavBar(user, setUser, factory, setFactory, setAgent, setWeb3) }
        { user === '' ? <> </> : <Split
          primary={
            agent === null ? 
            NoAgent(user, factory, setAgent, web3) : History()
          }
          secondary={
            <>
            {DistributionBox(agent, distribution, setDistribution)}
            {ENSBox()}
            </>
          }
        /> }
        
      </Main>
    </>
  );
}

export default App;
