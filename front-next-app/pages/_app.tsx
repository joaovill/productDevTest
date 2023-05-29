import { AppProps } from 'next/app'
import { Global, css } from '@emotion/react'
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function App ({ Component, pageProps}: AppProps){

    const theme = createTheme({
        palette: {
          primary: {
            main: '#08090A',
          },
          secondary: {
            main: '#575A5E',
          },
        },
      });
    return (
        <>   
            <Global styles={css` 
            /* styles */
            body {
                background-color: #cfcfcf;
                font-family: "Roboto","Helvetica","Arial",sans-serif;
                margin: 0;
                padding: 0;
                width: 100vw;
                height: 100vh;
                overflow: hidden;
            }
            #__next{
                height: 100%;
            }
            main{
                height: 100%;
            }
            :root {
                --black: #08090A;
                --secondaryBlack: #222823;
                --quartz: #A7A2A9;
                --white: #F4F7F5;
                --gray: #575A5E;
            }
            :disabled{
                border: 1px dotted #000!important;
                background: gray !important;
                color: #c0c0c0 !important;
            }
            `
            }/>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    )
}