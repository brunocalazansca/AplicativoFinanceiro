import React, { useEffect, useState } from "react";
import {View, Text, TouchableOpacity, Platform, StyleProp, ViewStyle, TextInput,} from "react-native";
import DateTimePicker, {DateTimePickerEvent,} from "@react-native-community/datetimepicker";
import { Feather } from "@expo/vector-icons";
import { formatDate, parseDateFromString } from "@/_utils/formatUtils";
import { styles } from './DataTimePickerStyle'

type Mode = "date" | "time";

interface DateTimePickerInputProps {
    label?: string;
    mode?: Mode;
    value: Date | null;
    onChange: (date: Date | null) => void;
    placeholder?: string;
    minimumDate?: Date;
    maximumDate?: Date;
    style?: StyleProp<ViewStyle>;
}

export default function DateTimePickerInput({
    label,
    mode = "date",
    value,
    onChange,
    placeholder,
    minimumDate,
    maximumDate,
    style,
}: DateTimePickerInputProps) {
    const [show, setShow] = useState(false);
    const [textValue, setTextValue] = useState("");

    useEffect(() => {
        if (value) {
            setTextValue(formatDate(value));
        } else {
            setTextValue("");
        }
    }, [value]);

    const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (event.type === "dismissed") {
            setShow(false);
            return;
        }

        setShow(Platform.OS === "ios");

        if (selectedDate) {
            onChange(selectedDate);
            setTextValue(formatDate(selectedDate));
        }
    };

    const handleTextChange = (text: string) => {
        let digits = text.replace(/\D/g, "");

        if (digits.length > 8) {
            digits = digits.slice(0, 8);
        }

        let formatted = digits;

        if (digits.length > 2 && digits.length <= 4) {
            formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
        } else if (digits.length > 4) {
            formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(
                4
            )}`;
        }

        setTextValue(formatted);
    };

    const handleBlur = () => {
        if (!textValue) {
            onChange(null);
            return;
        }

        const parsed = parseDateFromString(textValue);
        if (parsed) {
            onChange(parsed);
            setTextValue(formatDate(parsed));
        } else {
            if (value) {
                setTextValue(formatDate(value));
            } else {
                setTextValue("");
            }
        }
    };

    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={styles.input}>
                <TextInput
                    style={[
                        styles.inputText,
                        !value && !textValue && styles.placeholder,
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor="#9CA3AF"
                    value={textValue}
                    onChangeText={handleTextChange}
                    keyboardType="number-pad"
                    maxLength={10} // dd/mm/aaaa
                    onBlur={handleBlur}
                />

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setShow(true)}
                    style={styles.iconButton}
                >
                    <Feather name="calendar" size={18} color="#6B7280" />
                </TouchableOpacity>
            </View>

            {show && (
                <DateTimePicker
                    value={value ?? new Date()}
                    mode={mode}
                    display={Platform.OS === "ios" ? "inline" : "default"}
                    onChange={handleChange}
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                />
            )}
        </View>
    );
}

