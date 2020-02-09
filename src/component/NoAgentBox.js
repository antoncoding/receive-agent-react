import React from 'react';
import { Box, Button, EmptyStateCard } from '@aragon/ui';

const agentAbi = require('../config/abi/ReceiveAgent.json');

export default function NoAgentBox(user, factory, setAgent, web3, notify) {

  const handleCreate = async () => {
    
    factory.methods.createAgent().send({ from: user }).on('transactionHash', (hash)=>{
      notify.hash(hash)
    })
    
    factory.once('AgentCreated', {
        fromBlock: 'latest'
    }, function(_, event){
      if(event) {
        const agentAddress = event.returnValues.newAgentAddress;
        const _agent = new web3.eth.Contract(agentAbi, agentAddress);
        setAgent(_agent)
      }
    })
  
  }

  return (
    <Box>
      <EmptyStateCard text='There is no Agent found...' action={
        <Button onClick={handleCreate}> Create 
        </Button>}
      />
    </Box>
  );
}
