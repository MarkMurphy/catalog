import PropTypes from 'prop-types';
import React from 'react';
import {pagesShape} from '../../CatalogPropTypes';
import {heading, text, getFontSize} from '../../styles/typography';
import Link from '../Link/Link';
import Search from './Search';
import ListItem from './ListItem';

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

export function style(theme) {
  const logoBottomMargin = getFontSize(theme, 5);

  return {
    bar: {
      background: theme.sidebarColor,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    },
    h1: {
      boxSizing: 'border-box',
      margin: 0,
      padding: '21px 38px',
      height: theme.pageHeadingHeight,
      display: 'flex',
      justifyContent: 'flex-end',
      flexDirection: 'column'
    },
    title: {
      ...heading(theme, 1),
      color: theme.sidebarColorHeading,
      fontWeight: 700,
      marginBottom: logoBottomMargin,
      marginTop: 0
    },
    logo: {
      width: '100%',
      marginBottom: logoBottomMargin,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '0 100%',
      flexGrow: 1
    },
    // Make it accessible to screen readers, hide visually, see http://webaim.org/techniques/css/invisiblecontent/#absolutepositioning
    logoTitle: {
      position: 'absolute',
      left: '-10000px',
      top: 'auto',
      width: '1px',
      height: '1px',
      overflow: 'hidden'
    },
    list: {
      borderBottom: `1px solid ${theme.sidebarColorLine}`,
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    listNested: {
      borderTop: 'none',
      borderBottom: 'none',
      padding: '0 0 15px 40px'
    },
    info: {
      ...text(theme, -1),
      padding: 20,
      color: theme.lightColor
    },
    link: {
      color: theme.lightColor
    }
  };
}

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: ''
    }

    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch({target}) {
    this.setState({
      searchText: target.value.trim()
    });
  }

  getFilteredListItems() {
    const { pageTree } = this.props
    const { searchText } = this.state

    const pattern = new RegExp(`${escapeRegExp(searchText)}`, 'i')

    const reduce = (result, page) => {
      if (page.hideFromMenu) return result; 

      let node = { ...page, filtered: !!searchText.length }
      let pages = page.pages

      if (Array.isArray(pages)) {
        node.pages = pages = pages.reduce(reduce, [])
      }

      if ((pages && pages.length) || pattern.test(node.title)) {
        result.push(node)
      }

      return result
    }

    return pageTree.reduce(reduce, [])
  }

  render() {
    const {theme, pageTree, logoSrc, title, basePath} = this.props;

    const currentStyle = style(theme);

    const titleString = title ? title : '';
    const filteredPageTree = this.getFilteredListItems() 

    return (
      <div style={currentStyle.bar} >
        <div style={{flexGrow: 1}}>
          <Link to={basePath} style={{textDecoration: 'none'}}>
            <h1 style={currentStyle.h1}>
              {logoSrc
                ? <div style={{...currentStyle.logo, backgroundImage: `url("${logoSrc}")`}}><span style={currentStyle.logoTitle}>{titleString}</span></div>
                : <div style={currentStyle.title}>{titleString}</div> }
            </h1>
          </Link>

          <Search onChange={this.handleSearch} placeholder="Search" theme={theme} />

          <ul style={currentStyle.list}>
            { filteredPageTree.map((page) => <ListItem key={page.id} page={page} theme={theme} />) }
          </ul>
        </div>
        <div style={currentStyle.info}>
          Powered by <a style={currentStyle.link} href='https://www.catalog.style/' target='_blank'>Catalog</a>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  pageTree: pagesShape.isRequired,
  theme: PropTypes.object.isRequired,
  logoSrc: PropTypes.string,
  basePath: PropTypes.string,
  title: PropTypes.string
};

Menu.defaultProps = {
  styles: [],
  scripts: []
};

export default Menu;
