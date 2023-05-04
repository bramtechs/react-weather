import { QueryFunction, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { WeatherQuery } from "../../api/WeatherTypes";

export const InfoFetcher = (props: { queryKey: string, fetchCall: QueryFunction<unknown, string[]>, onLoadStart: (on: boolean) => void, onError: (e: unknown) => void, onData: (data: unknown) => void }) => {
    const { isLoading, error, data } = useQuery({ queryKey: [props.queryKey], queryFn: props.fetchCall });

    useEffect(() => {
        props.onLoadStart(true);
    }, [isLoading]);

    useEffect(() => {
        props.onError(error);
    }, [error]);

    useEffect(() => {
        props.onData(data);
    }, [data]);

    return (<template></template>)
}

export function generateKeyFromQuery(prefix: string, query: WeatherQuery) {
    if (query.cityName) {
        return `${prefix}-${query.cityName}`;
    }
    else if (query.coords) {
        return `${prefix}-${query.coords.lat}-${query.coords.lon}`;
    } else {
        return `${prefix}-???`;
    }
}
