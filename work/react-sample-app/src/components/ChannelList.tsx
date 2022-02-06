import * as React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';

const channels = ['general', 'random'];

export const ChannelList = () => {
    return (
        <Menu inverted vertical fixed={'left'}>
            <Menu.Item as={Link} to={'/'}>
                Home
                <Icon name='home'/>                    
            </Menu.Item>

            <Menu.Item>
                Channels
                <Icon name='list' />
                    <Menu.Menu>
                    {channels.map(channel =>
                        <Menu.Item
                            key={channel}
                            name={channel}
                            as={NavLink}
                            to={{ pathname: `/channels/${channel}`}}>
                            {channel}
                        </Menu.Item>
                    )}
                    </Menu.Menu>
            </Menu.Item>
        </Menu>
    );
};