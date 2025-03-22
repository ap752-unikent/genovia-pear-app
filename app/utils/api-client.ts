import questions from '@/app/_mocks/questions.json';

type MockApiClientProps = {
    data: any;
}

const apiClient = async ({data}: MockApiClientProps) : Promise<any> => {

    const randomTimeout = Math.floor(Math.random() * 1000) + 100

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, randomTimeout)
    })
}

export type FetchQuestionsResponse = {
    id: string;
    question: string;
    options: Option[];
}[]

export const fetchQuestions = async () => {
    return await apiClient({data: questions})
}

export const sendAnswers = async (answers: { [key: string]: string }) => {
    const response = await apiClient({data: answers})
    console.log(response)
    return;
}