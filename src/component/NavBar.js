import React from 'react';
import Web3 from 'web3';
import { IdentityBadge, Bar, ButtonBase, Box } from '@aragon/ui';

const { FACTORY: factoryAddress } = require('../config/contracts');
const factoryAbi = require('../config/abi/AgentFactory.json');
const agentAbi = require('../config/abi/ReceiveAgent.json');

export default function NavBar(user, setUser, factory, setFactory, setAgent, setWeb3) {

  // const [visible, setVisible] = useState(true)

  let web3 = new Web3();

  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    window.ethereum.autoRefreshOnNetworkChange = false;
  }
  // Legacy DApp Browsers
  else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
  }
  // Non-DApp Browsers
  else {
    console.error('You have to install MetaMask !');
  }

  const handleClick = async () => {
    try {
      const accounts = await window.ethereum.enable();
      setWeb3(web3)
      setUser(accounts[0]);

      let _factory = new web3.eth.Contract(factoryAbi, factoryAddress);
      setFactory(_factory);

      // Find Agent Address if already created
      const events = (await _factory.getPastEvents('AgentCreated', {
        // filter: { owner: accounts[0] },
        fromBlock: 5819000,
      })) // need filter cause the web3 filter is not effective no this syntax ?
      .filter(event => {
        return event.returnValues.owner.toLowerCase() === accounts[0].toLowerCase()
      })
      console.log(events)
      
      if(events.length > 0) {
        const agentAddress = events[0].returnValues.newAgentAddress;
        const _agent = new web3.eth.Contract(agentAbi, agentAddress);
        setAgent(_agent)
      } 

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
    <Bar
      secondary={
        user === '' ? (
          <ButtonBase onClick={handleClick}>
            <Box padding={10}>Connect to MetaMask</Box>
          </ButtonBase>
        ) : (
          <IdentityBadge
            // customLabel="Custom Label User"
            entity={user}
            connectedAccount={false}
            networkType='rinkeby'
          />
        )
      }
    />
    </>
  );
}
