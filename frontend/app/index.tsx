import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { skipLogin } from "@/services/userService";
import { api } from "@/api/axios";

export default function Index() {
    useEffect(() => {
        (async () => {
            const session = await skipLogin();

            if (session?.token) {
                const type = session.tokenType ?? "Bearer";
                api.defaults.headers.common.Authorization = `${type} ${session.token}`;

                router.replace("/home");
            } else {
                router.replace("/login");
            }
        })();
    }, []);

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size="large" />
        </View>
    );
}
