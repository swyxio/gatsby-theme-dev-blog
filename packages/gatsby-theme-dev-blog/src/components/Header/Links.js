import React from 'react'
import { Link } from 'gatsby'
import { useTheme } from '../Theming'
import ThemeToggler from './ThemeToggler'

export default () => {
  const theme = useTheme()
  return (
    <React.Fragment>
      <Link
        to="/writing"
        activeClassName="active"
        aria-label="View writing page"
      >
        Writing
      </Link>
      <Link
        to="/talks"
        activeClassName="active"
        aria-label="View speaking page"
      >
        Speaking
      </Link>
      <Link to="/about" activeClassName="active" aria-label="View blog page">
        About
      </Link>

      <ThemeToggler
        css={{}}
        toggleTheme={theme.toggleTheme}
        themeName={theme.themeName}
      />
    </React.Fragment>
  )
}
