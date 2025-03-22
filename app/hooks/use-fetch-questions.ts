import { useQuery } from "@tanstack/react-query";
import { FetchQuestionsResponse, fetchQuestions } from "../utils/api-client";

export const useFetchQuestions = () => {

    const { data: questionsData, isLoading: questionsLoading } = useQuery<FetchQuestionsResponse>({ queryKey: ['questions'], queryFn: fetchQuestions })

    return { questionsData, questionsLoading }
}