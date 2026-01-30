import { Platform } from 'react-native';

export const shadow = Platform.select({
    ios: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    android: {
        elevation: 3,
    },
});
