import { StyleSheet, Image} from 'react-native';

const MedexpressLogo = () => {
    return (
        <Image 
            source={require('../../../assets/images/medexpress-logo.png')}
            style={styles.image}
        />
    )
}

export default MedexpressLogo;

const styles = StyleSheet.create({
    image: {
        resizeMode: 'contain',
        height: 40,
        width: 120
    },
  });