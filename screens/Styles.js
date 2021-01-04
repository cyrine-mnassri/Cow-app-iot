import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginTop: 50,
    },
    imageViewerContainer: {
        backgroundColor: "red",
        height: '100%',
        marginTop: 50,
        padding: 5,
    },
    imageContainer: {
        height: '90%',
    },
    image: {
        margin: 5,
        width: '50%',
        height: 150,
    },
    button: {
        width: 180,
        height: 60,
        backgroundColor: "red",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 25,
        color: '#fff',
    },
});