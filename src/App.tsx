import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles'
import theme from './util/theme';
import Products from './view/Products';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Products />
    </ThemeProvider>
  );
}

export default App
