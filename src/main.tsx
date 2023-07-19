import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {RecoilRoot} from "recoil";
import {App} from "./App.tsx";
import {createTheme, ThemeProvider} from "@mui/material";

const queryClient = new QueryClient()
const theme = createTheme({
    palette: {
        mode: "dark"
    }
})


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <ThemeProvider theme={theme}>
                    <App/>
                </ThemeProvider>
            </RecoilRoot>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>

    </React.StrictMode>,
)
