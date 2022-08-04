import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { Button, ListItem, makeStyles, Tooltip } from '@material-ui/core';
import styled from 'styled-components';
import { CustomFormattedMessage } from '../../common/CustomFormattedMessage';
import { withTheme } from 'styled-components';
import Icon from './Icon';

const useStyles = makeStyles(() => ({
    tooltip: {
        fontSize: 14,
        fontWeight: 500,
        marginLeft: 49,
        height: 34,
        borderRadius: 10,
        lineHeight: '24px',
        minWidth: 141,
        textAlign: 'center',
    },
    arrow: {
        color: '#000',
        marginTop: '9px !important',
    },
}));

const NavItem = ({ id, item }) => {
    const classes = useStyles();
    const redirectUrl = () => {
        if (item.type === 'form') return `/form/${item.url}/${item.label}`;
        if (item.url !== '/') return `/${item.url}`;
        return item.url;
    };
    const link = () => {
        return (
            <div style={{ width: '100%' }} id={item.id}>
                <MenuButton activeClassName="active" component={RouterLink} exact to={redirectUrl()}>
                    <Tooltip
                        title={item.label}
                        classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
                        arrow
                        placement="right-start">
                        <IconWrapper>
                            <Icon url={item.url} />
                        </IconWrapper>
                    </Tooltip>
                </MenuButton>
            </div>
        );
    };

    return (
        <NavListItem button className={clsx()} disableGutters key={id}>
            {link()}
        </NavListItem>
    );
};

export default withTheme(NavItem);

const NavListItem = styled(ListItem)`
    display: flex !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
`;

const IconWrapper = styled.span`
    svg {
        path {
            fill: #404268;
        }
        :hoverpath {
            fill: ${({ theme }) => theme?.content?.colors.textColor};
        }
    }
`;
export const Separator = styled.div`
    width: 42px;
    height: 1px;
    background: #404268;
    margin: auto;
`;
const MenuButton = styled(Button)`
    justify-content: center !important;
    letter-spacing: 0 !important;
    padding: 15px 8px !important;
    text-transform: none !important;
    width: 100%;
    min-width: 10px;

    &.active svg path {
        fill: ${({ theme }) => theme?.content?.colors.textColor};
    }
    &.active {
        border-left-width: 4px;
        border-left-style: solid;
        border-left-color: ${({ theme }) => theme?.content?.colors.textColor};
    }
`;
