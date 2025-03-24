import { render } from '@testing-library/react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import MainScreen from '@/app/index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from "@eva-design/eva";
import questions from "@/app/_mocks/questions.json"

jest.mock('@/app/hooks/use-fetch-questions', () => ({
    useFetchQuestions: jest.fn(),
}));

import { useFetchQuestions } from '@/app/hooks/use-fetch-questions';

describe('<MainScreen />', () => {

    const createTestQueryClient = () =>
        new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });

    const testQueryClient = createTestQueryClient();

    const screen =
        <QueryClientProvider client={testQueryClient}>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider
                {...eva}
                theme={eva.light}
            >
                <MainScreen />
            </ApplicationProvider>
        </QueryClientProvider>

    test('it renders', () => {
        (useFetchQuestions as jest.Mock).mockReturnValue({
            questionsData: questions,
            questionsLoading: false,
        });

        const { getByText } = render(screen);

        getByText('Have you ever had an allergic reaction to Genovian Pears or products containing them?');
    });
});
