declare module '@emotion/react' {
  export interface Theme {
    color: {
      mainPink: string
      mainYellow: string
      mainOrange: string
      mainRed: string
      fontBlack: string
      fontDark: string
      fontNormal: string
      borderNormal: string
      borderLight: string
      backgroundLight: string
      backgroundNormal: string
      mainWhite: string
    }
    layout: {
      headerHeight: string
      navHeight: string
      pagePadding: string
    }
    taste: any
  }
}

const theme = {
  color: {
    mainPink: '#E7404A',
    mainYellow: '#F5CB39',
    mainOrange: '#FF824C',
    mainRed: '#FC3B41',
    fontBlack: '#3C3C3C',
    fontDark: '#828282',
    fontNormal: '#A3A3A3',
    borderNormal: '#CCCCCC',
    borderLight: '#F1F1F1',
    backgroundLight: '#F8F8F8',
    backgroundNormal: '#F1F1F1',
    mainWhite: '#FFFFFF'
  },
  layout: {
    headerHeight: '7.5rem',
    navHeight: '7.5rem',
    pagePadding: '2rem'
  },
  taste: {
    차가운: '#00B5E3',
    뜨거운: '#FF3333',
    달콤한: '#CC0099',
    매콤한: '#df2020',
    새콤한: '#FFDD33',
    쌉싸름한: '#339966',
    짭짜름한: '#FF5533'
  }
}

export default theme
