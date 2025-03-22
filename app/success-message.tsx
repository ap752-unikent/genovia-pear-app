import { Icon } from "@ui-kitten/components";
import { View, Text, StyleSheet} from "react-native";

const SuccessMessage = () => {
    return (
        <View
            style={styles.ctr}
        >
            <Icon 
                name="checkmark-circle-2-outline"
                fill="green"
                style={styles.icon}
            />
            <Text
                style={styles.title}
            >
                Thank you for completing the survey!
            </Text>
            <Text
                style={styles.message}
            >
                A doctor will now review your answers and get back to you shortly.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    ctr: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        gap: 16
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    message: {
        fontSize: 12,
        textAlign: 'center'
    },
    icon: {
        width: 64,
        height: 64
    }
});

export default SuccessMessage;