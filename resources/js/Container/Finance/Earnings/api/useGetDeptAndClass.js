import { fetcher } from "@/utils/fetcher"
import useSWR from "swr"

export const useGetDeptAndClass = () => {
    return useSWR(route('get.all.departments'), fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
    })
}
