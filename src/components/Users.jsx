import React from 'react';
import Nexus from 'react-nexus';
import pure from 'pure-render-decorator';

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
      <div className='Users-header'>
        {users.count()} users
      </div>
      <ul className='Users-body'>
        {users
          .sort((a, b) => a.nickname.localeCompare(b.nickname))
          .map(({ h, nickname }) => <li key={h}>
            {nickname}
          </li>)
        }
      </ul>
    </div>;
  }
}

export default Users;
