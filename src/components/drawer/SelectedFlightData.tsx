import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {flightRadarApi} from "../../utils.ts";
import {selectedFlightState} from "../../atoms.ts";
import {useRecoilValue} from "recoil";
import {Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

export function SelectedFlightData() {
    const selectedFlight = useRecoilValue(selectedFlightState);
    const {data} = useQuery({
        queryKey: ['flight', selectedFlight?.id],
        queryFn: () => flightRadarApi.fetchFlight(selectedFlight?.id || ''),
        enabled: !!selectedFlight,
    })
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
                <ListItemText primary="Selected Flight JSON data"/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open} timeout={0} unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem sx={{pl: 4}}>
                        {<pre>{JSON.stringify(data, null, 2)}</pre>}
                    </ListItem>
                </List>
            </Collapse>
        </>
    )
}