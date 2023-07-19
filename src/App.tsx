import {Divider, Drawer, Grid, IconButton,} from "@mui/material";
import {useState} from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {useTheme} from '@mui/material/styles';
import {Canvas} from "@react-three/fiber";
import Scene from "./components/3d/Scene.tsx";
import {DrawerItems} from "./components/drawer/DrawerItems.tsx";
import {Menu} from "@mui/icons-material";

const drawerWidth = "max(20vw, 200px)"


export function App() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Grid>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                anchor="left"
                open={open}
                variant={"persistent"}
            >
                <IconButton
                    style={{
                        borderRadius: 0,
                    }}

                    onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                </IconButton>
                <Divider/>
                <DrawerItems/>
            </Drawer>

            <IconButton
                color="primary"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                size={
                    "large"
                }

                sx={{
                    ...(open && {display: 'none'}),
                    position: "absolute",
                    zIndex: 1000,
                    top: 0,
                    left: 0,
                    margin: theme.spacing(1),

                }}


            >
                <Menu
                    fontSize={"large"}

                />
            </IconButton>
            <Canvas
                style={{
                    height: "100vh",
                }}
            >
                <Scene/>
            </Canvas>


        </Grid>


    );
}