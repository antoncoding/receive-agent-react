import React, { Component } from 'react';
import { Box, Distribution, Button, IconEdit } from '@aragon/ui';

const tokenAbi = require('../config/abi/ERC20.json');

export default class DistributionBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strategies: [{ item: 'ETH', percentage: 100, id: '', beneficiary: '', exchange: '' }],
    };
  }

  async syncStrategies() {
    let agent = this.props.agent;
    const numKeys = await agent.methods.countKeys().call();
    let tmpStrategies = [];
    let defaultStrategy = this.state.strategies[0];

    for (let i = 0; i < numKeys; i++) {
      tmpStrategies[i] = { item: '', percentage: 0, id: '', beneficiary: '', exchange: '' };
      const id = await agent.methods.ruleKeys(i).call();
      const [tokenAddr, percentage, recipient, exchange] = await Promise.all([
        agent.methods.assets(id).call(),
        agent.methods.percentages(id).call(),
        agent.methods.recipients(id).call(),
        agent.methods.exchanges(id).call(),
      ]);

      let tokenName 
      try {
        let token = new this.props.web3.eth.Contract(tokenAbi, tokenAddr);
        tokenName = await token.methods.name().call();
      } catch (error) {
        tokenName = tokenAddr.slice(0, 8) + '...'
      }
      
      tmpStrategies[i].item = tokenName;
      defaultStrategy.percentage -= parseInt(percentage);
      tmpStrategies[i].percentage = parseInt(percentage);
      tmpStrategies[i].beneficiary = recipient;
      tmpStrategies[i].exchange = exchange;

    }
    tmpStrategies.push(defaultStrategy)
      this.setState({ strategies: tmpStrategies });
  }

  async componentDidMount() {
    await this.syncStrategies();
  }

  render() {
    return (
      <Box>
        <Distribution heading='Current Strategy' items={this.state.strategies} />
        <br />
        <div style={{ alignSelf: 'center' }}>
          <Button
            icon={<IconEdit />}
            label='Edit Strategy'
            onClick={()=>this.props.openStrategyModal(true)}
          />
        </div>
      </Box>
    );
  }
}
