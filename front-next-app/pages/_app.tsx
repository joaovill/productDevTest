import { AppProps } from 'next/app'
import { Global, css } from '@emotion/react'

export default function App ({ Component, pageProps}: AppProps){

    return (
        <>   
            <Global styles={css` 
            /* styles */
            body {
                padding: 0;
                margin: 0;
            }
            
            `
            }/>
            <Component {...pageProps} />
        </>
    )
}