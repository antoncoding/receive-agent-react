/*
 * Source: https://github.com/aragon/aragon-apps/blob/master/apps/token-manager/app/src/components/AppHeader.js
 */

import React from 'react';
import Web3 from 'web3'
import { IdentityBadge, Bar } from '@aragon/ui';

export default function NavBar(user, setUser) {
  let web3;

  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      window.ethereum.enable().then(accounts => {
        setUser(accounts[0])
      });
    } catch (e) {
      // User has denied account access to DApp...
    }
  }
  // Legacy DApp Browsers
  else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
  }
  // Non-DApp Browsers
  else {
    console.error('You have to install MetaMask !');
  }

  return (
    <Bar
      secondary={
        <IdentityBadge
          // customLabel="Custom Label User"
          entity={user}
          connectedAccount={false}
          networkType='rinkeby'
        />
      }
    />
  );
}
