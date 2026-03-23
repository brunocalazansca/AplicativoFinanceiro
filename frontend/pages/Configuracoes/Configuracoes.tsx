import { styles } from './ConfiguracoesStyle';
import { StatusBar, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Switch from '@/components/Switch/Switch'
import Input from "@/components/Input/Input";
import { useCallback } from "react";
import Select from '@/components/Select/Select'
import { useFocusEffect } from "expo-router";
import DateTimePicker from "@/components/DataTimePicker/DataTimePicker";
import Button from "@/components/Button/Button";
import { useHandleCategoria } from "@/handle/categoriaHandle";
import { useHandleBancos } from "@/handle/bancoHandle";
import { useHandleTransacoes } from "@/handle/transacaoHandle";
import { useHandleFormaPagamento } from "@/handle/formaPagamentoHandle";
import FeedbackModal from "@/components/FeedbackModal/FeedbackModal";

export default function Transacoes() {

    return (
        <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
            </ScrollView>
        </SafeAreaView>
    )
}