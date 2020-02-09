import React, { useState } from 'react';
import { Modal, Button, Field, TextInput, IdentityBadge, Split } from '@aragon/ui';

import { UNISWAP_PROXY as uniswapProxy } from '../../config/contracts';

export default function AddRuleModal(visible, setVisible, agent, user, notify) {
  const [ercAddress, setERCAddr] = useState('0x98d9a611ad1b5761bdc1daac42c48e4d54cf5882');
  const [percentage, setPercentage] = useState(20);

  const handleAddRule = async () => {
    agent.methods.addRule(ercAddress, user, uniswapProxy, percentage).send({ from: user })
    .on('transactionHash', (hash)=>{
      notify.hash(hash)
    });
  };

  return (
    <Modal width={1000} padding={30} visible={visible} onClose={() => setVisible(false)}>
      <h1>Update Strategy</h1>
      <br></br>
      <Split
        primary={
          <>
            <Field label='Asset'>
              <TextInput
                wide={true}
                value={ercAddress}
                onChange={(event) => setERCAddr(event.target.value)}
              />
            </Field>
            <Field label='Exchange Proxy'>
              <IdentityBadge entity={uniswapProxy} shorten={false} networkType='rinkeby' />
            </Field>
            <Field label='Beneficiary'>
              <IdentityBadge entity={user} shorten={false} networkType='rinkeby' />
            </Field>
          </>
        }
        secondary={
          <>
            <Field label='Percentage'>
              <TextInput
                type='number'
                value={percentage}
                onChange={(event) => setPercentage(event.target.value)}
              />
            </Field>
          </>
        }
      />

      <Button label='Add rules' onClick={handleAddRule} />
    </Modal>
  );
}
