import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundOrbs from '../components/BackgroundOrbs';
import GlassCard from '../components/GlassCard';

export default function LoginScreen({ navigation }) {
    const { theme } = useContext(ThemeContext);
    const handleDemoLogin = async () => {
        await AsyncStorage.setItem('ct_demo_logged_in', 'true');
        navigation.replace('Main');
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <BackgroundOrbs />

            <View style={styles.content}>
                <GlassCard style={styles.card}>
                    <View style={styles.brand}>
                        <View style={styles.brandIcon}>
                            <Ionicons name="business" size={32} color={theme.colors.primary} />
                        </View>
                        <Text style={[styles.title, { color: theme.colors.text }]}>Company Test</Text>
                        <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>แพลตฟอร์มสำหรับบริษัทหาคนที่ใช่</Text>
                    </View>

                    <View style={styles.loginSection}>
                        <Text style={[styles.loginTitle, { color: theme.colors.text }]}>เข้าสู่ระบบด้วย</Text>

                        <TouchableOpacity style={[styles.btn, { backgroundColor: '#ffffff' }]} onPress={handleDemoLogin}>
                            <Ionicons name="logo-google" size={20} color="#EA4335" />
                            <Text style={[styles.btnText, { color: '#000' }]}>เข้าสู่ระบบด้วย Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.btn, { backgroundColor: '#1877F2' }]} onPress={handleDemoLogin}>
                            <Ionicons name="logo-facebook" size={20} color="#fff" />
                            <Text style={styles.btnText}>เข้าสู่ระบบด้วย Facebook</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.btn, { backgroundColor: '#00B900' }]} onPress={handleDemoLogin}>
                            <Ionicons name="chatbubble" size={20} color="#fff" />
                            <Text style={styles.btnText}>เข้าสู่ระบบด้วย LINE</Text>
                        </TouchableOpacity>
                    </View>
                </GlassCard>

                <View style={styles.features}>
                    <View style={styles.featureItem}>
                        <Ionicons name="search" size={24} color={theme.colors.primary} />
                        <Text style={[styles.featureText, { color: theme.colors.textMuted }]}>ค้นหาคนที่ใช่</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <Ionicons name="briefcase" size={24} color={theme.colors.primary} />
                        <Text style={[styles.featureText, { color: theme.colors.textMuted }]}>ลงประกาศง่าย</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <Ionicons name="stats-chart" size={24} color={theme.colors.primary} />
                        <Text style={[styles.featureText, { color: theme.colors.textMuted }]}>ดูสถิติเรียลไทม์</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        zIndex: 10,
    },
    card: {
        marginBottom: 30,
    },
    brand: {
        alignItems: 'center',
        marginBottom: 30,
    },
    brandIcon: {
        width: 60,
        height: 60,
        borderRadius: 16,
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#b8b0d8',
    },
    loginSection: {
        paddingTop: 10,
    },
    loginTitle: {
        fontSize: 16,
        color: '#ffffff',
        marginBottom: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14,
        borderRadius: 12,
        marginBottom: 12,
        gap: 10,
    },
    btnText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    features: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    featureItem: {
        alignItems: 'center',
        gap: 8,
    },
    featureText: {
        color: '#b8b0d8',
        fontSize: 12,
    }
});