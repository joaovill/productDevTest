import { AppProps } from 'next/app'
import { Global, css } from '@emotion/react'

export default function App ({ Component, pageProps}: AppProps){

    return (
        <>   
            <Global styles={css` 
            /* styles */
            body {
                font-family: "Roboto","Helvetica","Arial",sans-serif;
                margin: 0;
                padding: 0;
            }
            
            :root {
                --black: #08090A;
                --secondaryBlack: #222823;
                --quartz: #A7A2A9;
                --white: #F4F7F5;
                --gray: #575A5E;
            }
            `
            }/>
            <Component {...pageProps} />
        </>
    )
}