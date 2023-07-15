import React from 'react'
import ReactDOM from 'react-dom/client'
import Scene from './Scene.tsx'
import './index.css'
import {Canvas} from "@react-three/fiber";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {RecoilRoot} from "recoil";
import {FlightDetail} from "./FlightDetail.tsx";

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <Canvas
                camera={
                    {
                    }
                }
                >
                    <Scene/>
                </Canvas>
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }
                    }

                ><FlightDetail/></div>
            </RecoilRoot>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>

    </React.StrictMode>,
)
