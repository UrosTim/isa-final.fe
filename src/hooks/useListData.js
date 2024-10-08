import {useCallback, useState} from "react";
import useAuth from "@/hooks/useAuth";

export const useListData = (url) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const AxiosAuth = useAuth();

    const getData = useCallback(async (url) => {
        setLoading(true);

        let result = await AxiosAuth.get(url)
        setData(result.data);

        console.log(result.data);

        setLoading(false);
    }, [url]);

    return {getData, loading, data};
};