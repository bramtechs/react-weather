import { QueryFunction, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import React from "react";

export type FetchResult = {
    isLoading?: boolean,
    error?: unknown,
    data?: unknown,
}

export const InfoFetcher = (props: { queryKey: string, fetchCall: QueryFunction<unknown, string[]>, onStatusChanged:(status: FetchResult) => void}) => {
    const { isLoading, error, data } = useQuery({ queryKey: [props.queryKey], queryFn: props.fetchCall });

    useEffect(() => {
        props.onStatusChanged({
            isLoading: true
        });
    }, [isLoading]);

    useEffect(() => {
        props.onStatusChanged({
            error: error
        });
    }, [error]);

    useEffect(() => {
        props.onStatusChanged({
            data: data
        });
    }, [data]);

    return (<></>)
}
