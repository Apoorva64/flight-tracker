import {useRecoilState} from "recoil";
import {liveFlightsOptionsState,} from "../../atoms.ts";
import {useState} from "react";
import {Avatar, Checkbox, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import FAA from "../../assets/FAA_LOGO.png"
import ADSB from "../../assets/ADSB.png"

export function DataSourceFilter() {
    const [liveFlightsOptions, setLiveFlightsOptions] = useRecoilState(liveFlightsOptionsState);
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon/>
                </ListItemIcon>
                <ListItemText primary="Data Sources"/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem sx={{pl: 4}}>
                        <ListItemIcon>
                            <Avatar src={FAA} sx={{width: 24, height: 24}}/>
                        </ListItemIcon>
                        <ListItemText primary="FAA"/>
                        <Checkbox
                            checked={liveFlightsOptions.FAA}
                            onChange={(e) => setLiveFlightsOptions({
                                    ...liveFlightsOptions,
                                    FAA: e?.target?.checked
                                }
                            )}
                            inputProps={{'aria-label': 'controlled'}}
                        />
                    </ListItem>
                    <ListItem sx={{pl: 4}}>
                        <ListItemIcon>
                            <Avatar src={ADSB} sx={{width: 24, height: 24}}/>
                        </ListItemIcon>
                        <ListItemText primary="ADS-B"/>
                        <Checkbox
                            checked={liveFlightsOptions.ADSB}
                            onChange={(e) => setLiveFlightsOptions({
                                    ...liveFlightsOptions,
                                    ADSB: e?.target?.checked
                                }
                            )}
                            inputProps={{'aria-label': 'controlled'}}
                        />
                    </ListItem>
                    <ListItem sx={{pl: 4}}>
                        <ListItemIcon>
                            <Avatar sx={{width: 24, height: 24}}/>
                        </ListItemIcon>
                        <ListItemText primary="FLARM"/>
                        <Checkbox
                            checked={liveFlightsOptions.FLARM}
                            onChange={(e) => setLiveFlightsOptions({
                                    ...liveFlightsOptions,
                                    FLARM: e?.target?.checked
                                }
                            )}
                            inputProps={{'aria-label': 'controlled'}}
                        />
                    </ListItem>
                    <ListItem sx={{pl: 4}}>
                        <ListItemIcon>
                            <Avatar sx={{width: 24, height: 24}}/>
                        </ListItemIcon>
                        <ListItemText primary="MLAT"/>
                        <Checkbox
                            checked={liveFlightsOptions.MLAT}
                            onChange={(e) => setLiveFlightsOptions({
                                    ...liveFlightsOptions,
                                    MLAT: e?.target?.checked
                                }
                            )}
                            inputProps={{'aria-label': 'controlled'}}
                        />
                    </ListItem>
                    <ListItem sx={{pl: 4}}>
                        <ListItemIcon>
                            <Avatar sx={{width: 24, height: 24}}/>
                        </ListItemIcon>
                        <ListItemText primary="satellite"/>
                        <Checkbox
                            checked={liveFlightsOptions.satellite}
                            onChange={(e) => setLiveFlightsOptions({
                                    ...liveFlightsOptions,
                                    satellite: e?.target?.checked
                                }
                            )}
                            inputProps={{'aria-label': 'controlled'}}
                        />

                    </ListItem>

                </List>
            </Collapse>
        </>
    )
}