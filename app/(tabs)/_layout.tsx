// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function TabsLayout() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ zIndex: 20, elevation: 20 }}>
                <Header />
            </View>

            <View style={{ flex: 1 }}>
                <Tabs
                    screenOptions={{ headerShown: false }}
                    tabBar={(props) => <Footer {...props} />}
                >
                    <Tabs.Screen name="home" options={{ title: "Início" }} />
                    <Tabs.Screen name="bancos" options={{ title: "Bancos" }} />
                    <Tabs.Screen name="categorias" options={{ title: "Categorias" }} />
                    <Tabs.Screen name="relatorios" options={{ title: "Relatórios" }} />
                    <Tabs.Screen name="transacoes" options={{ title: "Transações" }} />
                </Tabs>
            </View>
        </SafeAreaView>
    );
}
