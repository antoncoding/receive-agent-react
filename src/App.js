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
  networkId: 4
});

function App() {
  const [web3, setWeb3] = useState(null)
  const [user, setUser] = useState('');
  // const [agentAddress, setAgentAddress] = useState('')
  
  const [factory, setFactory] = useState(null)
  const [agent, setAgent] = useState(null)

  // modals
  const [strategyVisible, openStrategyModal] = useState(false)
  
  const [ distribution, setDistribution ] = useState([
    { item: 'ETH', percentage: 100 }
  ])

  return (
    <>
      <Main>
        { AddRuleModal(strategyVisible, openStrategyModal, agent, user, notify) }
        { NavBar(user, setUser, factory, setFactory, setAgent, setWeb3) }
        { user === '' ? <> </> : <Split
          primary={
            agent === null ? 
            NoAgent(user, factory, setAgent, web3, notify) : History()
          }
          secondary={
            <>
            {DistributionBox(agent, distribution, setDistribution, openStrategyModal)}
            {ENSBox()}
            </>
          }
        /> }
        
      </Main>
    </>
  );
}

export default App;
