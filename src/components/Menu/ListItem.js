import React, { PropTypes } from 'react';
import CatalogPropTypes from 'core/PropTypes';

import Link from 'components/Link/Link';
import NestedList from './NestedList';
import { text } from 'scaffold/typography';

export function style(theme) {
  let pseudo = {
    color: theme.sidebarColorTextActive,
    textDecoration: 'none',
    background: 'rgba(255,255,255,0.1)'
  };
  return {
    link: {
      ...text(theme, { level: 2 }),
      borderBottom: `1px solid ${theme.sidebarColorLine}`,
      color: theme.sidebarColorText,
      cursor: 'pointer',
      display: 'block',
      margin: 0,
      padding: '15px 40px',
      textDecoration: 'none',
      ':hover': pseudo,
      ':active': pseudo
    },
    activeLink: {
      color: theme.sidebarColorTextActive,
      background: theme.sidebarColorActive,
      ':hover': undefined
    },
    nestedLink: {
      borderBottom: 'none',
      padding: '5px 40px 5px 60px'
    },
    nestedChildren: {
      borderBottom: 'none',
      color: theme.sidebarColorText,
      cursor: 'pointer',
      display: 'block',
      margin: 0,
      padding: '15px 40px',
      textDecoration: 'none'
    }
  };
}

class ListItem extends React.Component {
  static propTypes = {
    page: CatalogPropTypes.page.isRequired,
    theme: PropTypes.object.isRequired,
    nested: PropTypes.bool,
    history: PropTypes.object.isRequired
  }
  render() {
    const { page, theme, nested } = this.props;
    const { path, pages, title, menuTitle } = page;
    let currentStyle = style(theme);
    let defaultStyle = {
      ...currentStyle.link
    };
    if (nested) {
      defaultStyle = {
        ...defaultStyle,
        ...currentStyle.nestedLink
      };
    }
    return (
      <li>
      { pages ?
        <NestedList {...this.props} {...page} pages={pages} /> :
        <Link
          style={defaultStyle}
          activeStyle={currentStyle.activeLink}
          to={path}
          onlyActiveOnIndex={path === '/'} // FIXME: somehow this doesn't work; a bug in react-router?
        >
          { menuTitle || title }
        </Link>
      }
      </li>
    );
  }
}

export default ListItem;
