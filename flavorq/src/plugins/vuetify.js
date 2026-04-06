import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const customTheme = {
  dark: false,
  colors: {
    primary: '#111111',
    secondary: '#555555',
    accent: '#4CAF50',
    error: '#D32F2F',
    warning: '#F9A825',
    info: '#1565C0',
    success: '#388E3C',
    background: '#F5F5F5',
    surface: '#FFFFFF',
  },
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
})
