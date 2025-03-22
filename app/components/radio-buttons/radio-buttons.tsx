import { Button } from "@ui-kitten/components";
import { forwardRef, LegacyRef } from "react";
import { StyleSheet, View, Text } from "react-native";

type Props = {
    id: string;
    label: string;
    options: Option[];
    selected: string | undefined;
    onChange: (value: string) => void;
}

const RadioButtons = forwardRef(({ label, options, selected, onChange, id}: Props, ref: LegacyRef<View>) => {
    return (
        <View ref={ref} style={styles.ctr}>
            <Text>{label}</Text>
            <View style={styles.buttonCtr}>
                {options.map((option) => (
                    <RadioButton
                        key={`question-${id}-${option.value}`}
                        label={option.label}
                        selected={selected === option.value}
                        onPress={() => onChange(option.value)}
                    />
                ))}
            </View>
        </View>
    );
});

type ButtonProps = {
    label: string;
    selected: boolean;
    onPress: () => void;
}

const RadioButton = ({
    label,
    selected,
    onPress
}: ButtonProps) => {
    return (
        <Button
            appearance={selected ? 'filled' : 'outline'}
            onPress={onPress}
            size="large"
            style={styles.button}
        >
            <Text>
                {label}
            </Text>
        </Button>
    )
}

const styles = StyleSheet.create({
    ctr: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
    },
    buttonCtr: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        width: '40%'
    }
});

export default RadioButtons;