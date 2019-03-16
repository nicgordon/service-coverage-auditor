import _ from 'lodash';
import { FlatList, Text, View } from 'react-native';
import React, { PureComponent } from 'react';

import database from '../../database';

class AuditHistoryScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      audits: null,
    };
  }

  async componentWillMount() {
    const audits = await database.fetchAllAudits();
    this.setState({
      audits: _.map(audits, audit => ({
        ...audit,
        key: `${audit.id}`,
      })),
    });
  }

  render() {
    const { audits } = this.state;

    if (_.isNull(audits)) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View>
        <FlatList data={audits} renderItem={audit => <Text>{audit.startedAt}</Text>} />
      </View>
    );
  }
}

AuditHistoryScreen.navigationOptions = {
  title: 'Audit history',
};

export default AuditHistoryScreen;
