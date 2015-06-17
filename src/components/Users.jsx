import React from 'react';
import Nexus from 'react-nexus';
import pure from 'pure-render-decorator';
import Identicon from 'react-identicon';
import { styles } from 'react-statics-styles';
import moment from 'moment';

@styles({
  '.Users': {
    height: '600px',
    overflowY: 'scroll',
  },
})
@pure
class Users extends React.Component {
  static displayName = 'Users';

  static propTypes = {
    clientID: React.PropTypes.string.isRequired,
    messages: Nexus.PropTypes.Immutable.Map,
    status: Nexus.PropTypes.Immutable.Map,
    users: Nexus.PropTypes.Immutable.Map,
  };

  render() {
    const { users } = this.props;
    return <div className='Users'>
      <div className='ui list'>
        {users
          .sort((a, b) => a.nickname.localeCompare(b.nickname))
          .map(({ h, nickname, joined }) =>
            <div key={h} className='item' title={`Connected since ${moment(joined).format('dddd, MMMM Do, HH:mm:ss')}`}>
              <Identicon id={h} type='retro' className='ui avatar image' />
              <div className='content'>
                {nickname}
              </div>
            </div>
          )
          .toArray()
        }
      </div>
    </div>;
  }
}

export default Users;
