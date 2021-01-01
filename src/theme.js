export const theme = {
  "name": "Listen 2",
  "rounding": 10,
  "spacing": 24,
  "defaultMode": "light",
  "global": {
    "colors": {
      "brand": {
        "dark": "#49A078",
        "light": "#216869"
      },
      "background": {
        "dark": "#1F2421",
        "light": "#DCE1DE"
      },
      "background-back": {
        "dark": "#1F2421",
        "light": "#DCE1DE"
      },
      "background-front": {
        "dark": "#1F2421",
        "light": "#FFFFFF"
      },
      "background-contrast": {
        "dark": "#1F2421",
        "light": "#bdc7c1"
      },
      "text": {
        "dark": "#F4F6F5",
        "light": "#1F2421"
      },
      "text-strong": {
        "light": "#1C211E",
        "dark": "#F4F6F5"
      },
      "text-weak": {
        "dark": "#F4F6F5",
        "light": "#1F2421"
      },
      "text-xweak": {
        "dark": "#b2bdb6",
        "light": "#1F2421"
      },
      "border": {
        "light": "#4c5750",
        "dark": "#4c5750"
      },
      "control": "brand",
      "active-background": "background-contrast",
      "active-text": "text-strong",
      "selected-background": "brand",
      "selected-text": "text-strong",
      "status-critical": "#337054",
      "status-warning": "#FFAA15",
      "status-ok": "#00C781",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
      "graph-0": "brand",
      "graph-1": "status-warning",
      "focus": "#49A078"
    },
    "font": {
      "family": "\"Cormorant Garamond\"",
      "face": "/* cyrillic-ext */\n@font-face {\n  font-family: 'Cormorant Garamond';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/cormorantgaramond/v9/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYpHtKky2F7i6C.woff2) format('woff2');\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n}\n/* cyrillic */\n@font-face {\n  font-family: 'Cormorant Garamond';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/cormorantgaramond/v9/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYrXtKky2F7i6C.woff2) format('woff2');\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* vietnamese */\n@font-face {\n  font-family: 'Cormorant Garamond';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/cormorantgaramond/v9/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYpntKky2F7i6C.woff2) format('woff2');\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n/* latin-ext */\n@font-face {\n  font-family: 'Cormorant Garamond';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/cormorantgaramond/v9/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYp3tKky2F7i6C.woff2) format('woff2');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'Cormorant Garamond';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/cormorantgaramond/v9/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtKky2F7g.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n"
    },
    "active": {
      "background": "active-background",
      "color": "active-text"
    },
    "hover": {
      "background": "active-background",
      "color": "active-text"
    },
    "selected": {
      "background": "selected-background",
      "color": "selected-text"
    },
    "control": {
      "border": {
        "radius": "10px"
      }
    },
    "drop": {
      "border": {
        "radius": "10px"
      }
    }
  },
  "chart": {},
  "diagram": {
    "line": {}
  },
  "meter": {},
  "layer": {
    "background": {
      "dark": "#111111",
      "light": "#FFFFFF"
    }
  },
  "formField": {
    "border": {
      "color": "border",
      "error": {
        "color": {
          "dark": "white",
          "light": "status-critical"
        }
      },
      "position": "inner",
      "side": "bottom",
      "style": "solid"
    },
    "content": {
      "pad": "small"
    },
    "disabled": {
      "background": {
        "color": "status-disabled",
        "opacity": "medium"
      }
    },
    "error": {
      "color": "status-critical",
      "margin": {
        "vertical": "xsmall",
        "horizontal": "small"
      }
    },
    "help": {
      "color": "dark-3",
      "margin": {
        "start": "small"
      }
    },
    "info": {
      "color": "text-xweak",
      "margin": {
        "vertical": "xsmall",
        "horizontal": "small"
      }
    },
    "label": {
      "margin": {
        "vertical": "xsmall",
        "horizontal": "small"
      }
    },
    "margin": {
      "bottom": "small"
    },
    "round": "10px"
  },
  "button": {
    "border": {
      "radius": "10px"
    }
  },
  "checkBox": {
    "check": {
      "radius": "10px"
    },
    "toggle": {
      "radius": "10px"
    }
  },
  "radioButton": {
    "check": {
      "radius": "10px"
    }
  }
}
  