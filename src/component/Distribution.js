/*
 * Source: https://github.com/aragon/aragon-apps/blob/master/apps/token-manager/app/src/components/AppHeader.js
 */

import React, { useState, componentDidMount } from 'react';
import { Box, Distribution } from '@aragon/ui';

export default function DistributionBox(user, setUser) {

  return (
    <Box>
      <Distribution
        heading="Current Strategy"
        items = {[
          { item: 'ETH', percentage: 40 },
          { item: 'ANT', percentage: 35 },
          { item: 'DAI', percentage: 15 },
          { item: 'ZRX', percentage: 10 },
        ]}
      />
    </Box>
    
  );
}
