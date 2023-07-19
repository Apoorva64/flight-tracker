import {useRecoilValue} from "recoil";
import {selectedFlightState} from "../../atoms.ts";
import {Card} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {flightRadarApi} from "../../utils.ts";


export const FlightDetail = () => {
    const selectedFlight = useRecoilValue(selectedFlightState);
    console.log(selectedFlight)
    const {data} = useQuery({
        queryKey: ['flight', selectedFlight?.id],
        queryFn: () => flightRadarApi.fetchFlight(selectedFlight?.id || ''),
        enabled: !!selectedFlight,
    })

    return (
        <div
            style={{
                height: "30vh",
                overflowX: "scroll",
                overflowY: "scroll",
            }}

        ><Card
        >
            {selectedFlight && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </Card></div>
    )

}