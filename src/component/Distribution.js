/*
 * Source: https://github.com/aragon/aragon-apps/blob/master/apps/token-manager/app/src/components/AppHeader.js
 */

import React from 'react';
import { Box, Distribution, Button, IconEdit } from '@aragon/ui';

export default function DistributionBox(agent, distribution, setDistribution) {

  // agent.methods.sumPercentage().call().then(tokenPer => {
  //   console.log(`got ${tokenPer}`)
  //   setDistribution([
  //     { item: 'ETH', percentage: 100-tokenPer },
  //     { item: 'Other', percentage: tokenPer }
  //   ])
  // })

  return (
    <Box>
      <Distribution
        heading="Current Strategy"
        items = { distribution }
      />
      <br/>
      <div style={{ alignSelf: 'center'}}>
      <Button 
        icon={<IconEdit/>} 
        label="Edit Strategy"
      /> 
      </div>

    </Box>
    
  );
}
