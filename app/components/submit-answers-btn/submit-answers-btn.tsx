import { Button, useTheme } from "@ui-kitten/components";
import { Text } from "react-native";

type Props = {
    handleSubmit: () => void;
}

export const SubmitAnswersBtn = ({
    handleSubmit,
}: Props) => {

    const theme = useTheme();

    return (
        <Button
            onPress={handleSubmit}
            /* A TS issue is preventing me from using StyleService.create() so had to use inline styles */
            style={{
                width: "40%",
                backgroundColor: theme['color-basic-1000'],
                borderColor: theme['color-basic-1000'],
            }}
        >
            <Text>
                Submit
            </Text>
        </Button>)
}