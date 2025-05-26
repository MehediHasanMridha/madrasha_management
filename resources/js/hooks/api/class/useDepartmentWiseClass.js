import { fetcher } from "@/utils/fetcher"
import useSWR from "swr"

export const useDepartmentWiseClass = (department_slug) => {
    return useSWR(route('department_wise_class', { department_slug: department_slug }), fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
    })
}
