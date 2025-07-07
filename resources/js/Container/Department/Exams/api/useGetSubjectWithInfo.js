import { fetcher } from "@/utils/fetcher"
import useSWR from "swr"

export const useGetSubjectWithInfo = (exam_id) => {
    return useSWR(route('department.get_exams_subjects', { exam_id: exam_id }), fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
    })
}
