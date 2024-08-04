/* eslint-disable quote-props */
interface Theme {
  key: string
  string: string
  number: string
  boolean: string
  null: string
  mark: string
  link: string
  text: string
  primaryText: string
  faintText: string
  headerBackground: string
  faintOutline: string
  background: string
  iconBackground: string
}

export const devThemes: Record<string, Theme> = {
  light: {
    key: `#d73a49`,
    string: `#6f42c1`,
    number: `#005cc5`,
    boolean: `#005cc5`,
    null: `#005cc5`,
    mark: `#586069`,
    link: `#0366d6`,
    text: `#24292e`,
    primaryText: `#24292e`,
    faintText: `#586069`,
    headerBackground: `#f6f8fa`,
    faintOutline: `#e1e4e8`,
    background: `#ffffff`,
    iconBackground: `#e7e7e7`,
  },
  dark: {
    key: `#d2a8ff`,
    string: `#70c6f0`,
    number: `#ff7b72`,
    boolean: `#68c0ff`,
    null: `#68c0ff`,
    mark: `#c9d1d9`,
    link: `#c9d1d9`,
    text: `#c9d1d9`,
    primaryText: `#c9d1d9`,
    faintText: `#a5a5a5`,
    headerBackground: `#161b22`,
    faintOutline: `#1a1d21`,
    background: `#0d1117`,
    iconBackground: `#30363d`,
  },
}
