import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "auth_token";
let memoryToken: string | null = null;

export async function setToken(token: string | null) {
    memoryToken = token;

    if (token) {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    } else {
        await AsyncStorage.removeItem(TOKEN_KEY);
    }
}

export async function getToken() {
    if (memoryToken) return memoryToken;

    const t = await AsyncStorage.getItem(TOKEN_KEY);
    memoryToken = t;
    return t;
}

export async function clearToken() {
    memoryToken = null;
    await AsyncStorage.removeItem(TOKEN_KEY);
}
