import {Divider, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {DataSourceFilter} from "./DataSourceFilter.tsx";
import {AdvancedFilters} from "./AdvancedFilters.tsx";
import {Options} from "./Options.tsx";

export function DrawerItems() {
    return (
        <>
            <List>
                <DataSourceFilter/>
                <Options/>
                <AdvancedFilters/>
            </List>
            <Divider/>
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                        </ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
        </>
    )
}