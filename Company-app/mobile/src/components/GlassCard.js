import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { ThemeContext } from '../context/ThemeContext';

export default function GlassCard({ children, style, intensity = 40, tint }) {
    const { isDark, theme } = useContext(ThemeContext);
    const activeTint = tint || (isDark ? 'dark' : 'light');

    return (
        <View style={[{
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surface
        }, styles.container, style]}>
            <BlurView intensity={intensity} tint={activeTint} style={StyleSheet.absoluteFill} />
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
    },
    content: {
        padding: 20,
    }
});
