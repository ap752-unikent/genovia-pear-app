import { useMutation } from "@tanstack/react-query"
import { sendAnswers } from "../utils/api-client"
import { useState } from "react";

type Props = {
    onSuccess: () => void;
}

export const useSendAnswers = ({
    onSuccess
} : Props) => {

    const [isLoading, setIsLoading] = useState(false);

    const mutation = useMutation({
        mutationFn: sendAnswers,
        onMutate: () => {
            setIsLoading(true);
        },
        onSuccess: () => {
            onSuccess();
        },
        onSettled: () => {
            setIsLoading(false);
        }
      });

    return {
        isLoading,
        sendAnswers: mutation.mutate
    }
}