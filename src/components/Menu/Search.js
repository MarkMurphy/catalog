import React, { Component } from 'react'
import {text} from '../../styles/typography';

export function style(theme) {
  return {
    search: {
     
    },
    searchInput: {
      ...text(theme),
      color: theme.sidebarColorText,
      width: '100%',
      border: '0',
      borderTop: `1px solid ${theme.sidebarColorLine}`,
      margin: '0',
      padding: '16px 40px',
      display: 'block',
      background: 'rgb(249, 249, 249)',
      outline: 'none',
      whiteSpace: 'normal',
      verticalAlign: 'middle',
    }
  }
}

class SearchInput extends Component {
  render() {
    const { theme, ...inputProps } = this.props
    const currentStyle = style(theme);

    return (
      <div style={currentStyle.search}>
        <input 
          type="search" 
          {...inputProps} 
          style={currentStyle.searchInput} />
      </div>
    )
  }
}

export default SearchInput