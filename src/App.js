import React, { useState } from 'react';
import { Main, Split } from '@aragon/ui';
import Notify from "bnc-notify"

import NavBar from './component/NavBar';
import DistributionBox from './component/Distribution'
import ENSBox from './component/ENSBox'
import History from './component/HistoryBox'
import NoAgent from './component/NoAgentBox'
import AddRuleModal from './component/modals/AddRuleModal'

const notify = Notify({
  dappId: '7e7c9d55-dd5e-4ee1-bc38-edf27b59ce06',
  networkId: 42
});

function App() {
  const [web3, setWeb3] = useState(null)
  const [user, setUser] = useState('');
  // const [agentAddress, setAgentAddress] = useState('')
  
  const [factory, setFactory] = useState(null)
  const [agent, setAgent] = useState(null)

  // modals
  const [strategyVisible, openStrategyModal] = useState(false)

  return (
    <>
      <Main>
        { AddRuleModal(strategyVisible, openStrategyModal, agent, user, notify) }
        { NavBar(user, setUser, factory, setFactory, setAgent, setWeb3) }
        { user === '' ? <> </> : <Split
          primary={
            agent === null 
              ? NoAgent(user, factory, setAgent, web3, notify) 
              : <DistributionBox
              agent = {agent}
              openStrategyModal ={openStrategyModal}
              web3={web3}
              />
              //(agent, openStrategyModal, strategies, updateStrategies,  web3)
          }
          secondary={
            <>
            {ENSBox()}
            </>
          }
        /> }
        
      </Main>
    </>
  );
}

export default App;
