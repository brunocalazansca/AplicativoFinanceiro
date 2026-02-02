import * as SecureStore from "expo-secure-store";

const AUTH_KEY = "auth_session";

export type AuthSession = {
    token: string;
    tokenType?: string;
    user?: {
        id: number;
        nome: string;
        email: string;
        iniciais?: string;
    };
};

export async function saveSession(session: AuthSession) {
    await SecureStore.setItemAsync(AUTH_KEY, JSON.stringify(session), {
        keychainAccessible: SecureStore.WHEN_UNLOCKED,
    });
}

export async function getSession(): Promise<AuthSession | null> {
    const raw = await SecureStore.getItemAsync(AUTH_KEY);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
}

export async function clearSession() {
    await SecureStore.deleteItemAsync(AUTH_KEY);
}
