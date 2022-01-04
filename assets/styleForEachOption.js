//#75f1e0
//#84f8c8
//#a3fbaa
//#cbfc8b
//#f9f871
const barStyle = {
  itemContainer: {
    height: 75,
    backgroundColor: '#7CE8',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  titleText: {
    flex: 1,
    fontSize: 15,
    // padding: 5,
    left: 12,
  },
  gap: {
    height: 1,
    backgroundColor: '#00308F',
  },
};

export const barStyles = {
  false: {
    //if darkMode false
    barStyle: {...barStyle},
  },
  true: {
    //if darkMode true
    barStyle: {
      ...barStyle,
      itemContainer: {
        ...barStyle.itemContainer,
        backgroundColor: '#a13862',
      },
    },
  },
};

//all colors in all files should be here
export const allColors = {
  false: {
    headerColor: '#a3fbaa',
    //format for the colors: filename > obj-name > propertyName
    settings: {
      container: {
        backgroundColor: '#f3fbaa',
      },
    },
    settingBarSwitch: {
      settingBar: {
        backgroundColor: '#75f1e0',
      },
    },
    openPdf: {
      container: {
        backgroundColor: '#7CB9E8',
      },
    },
  },
  true: {
    headerColor: '#af8875',
    settings: {
      container: {
        backgroundColor: '#003f46',
      },
    },
    settingBarSwitch: {
      settingBar: {
        backgroundColor: '#d09374',
      },
    },
    openPdf: {
      container: {
        backgroundColor: '#7CB9E8',
      },
    },
  },
};
