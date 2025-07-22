import { fetcher } from "@/utils/fetcher"
import useSWR from "swr"

export const getStaffData = () => {
    return useSWR(route('get.all.staff'), fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
    })
}
