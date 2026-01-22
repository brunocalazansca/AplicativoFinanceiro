import { StyleSheet } from "react-native";
import {shadow} from "@/styles/shadow";

export const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: '55%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        ...shadow
    }
});