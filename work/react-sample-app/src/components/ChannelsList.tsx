import * as React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';

const channels = ['general', 'random'];

export const channelList = () => {
    return (
        //簡略化のためチャンネル一覧をここで定義
        <Menu inverted vertical fixed={'left'}>
            <Menu.Item as={Link} to={'/'}>
                Home
                <Icon name='home'/>                    
            </Menu.Item>
            <Menu.Item>
            Channels
            <Menu.Menu>
                {channels.map(channel => 
                    <Menu.Item 
                        key={channel}
                        as={NavLink}
                        to={{ pathname: `/channels/${channel}` }}>
                        {channel}
                    </Menu.Item>
                )}
            </Menu.Menu>
            </Menu.Item>
        </Menu>
    );
};