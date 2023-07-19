import {List} from "@mui/material";
import {DataSourceFilter} from "./DataSourceFilter.tsx";
import {AdvancedFilters} from "./AdvancedFilters.tsx";
import {Options} from "./Options.tsx";
import {SelectedFlightData} from "./SelectedFlightData.tsx";

export function DrawerItems() {
    return (
        <List>
            <DataSourceFilter/>
            <Options/>
            <AdvancedFilters/>
            <SelectedFlightData/>
        </List>
    )
}