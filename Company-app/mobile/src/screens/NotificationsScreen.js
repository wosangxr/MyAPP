import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '../components/GlassCard';
import BackgroundOrbs from '../components/BackgroundOrbs';
import { MOCK } from '../services/mockData';
import { ThemeContext } from '../context/ThemeContext';

export default function NotificationsScreen({ navigation }) {
    const { theme } = useContext(ThemeContext);
    const notifications = MOCK.applications.filter(a => a.status === 'pending');

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
    };

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return `${d.getDate()} ${d.toLocaleString('th-TH', { month: 'short' })} ${d.getFullYear()}`;
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <BackgroundOrbs />
            <ScrollView contentContainerStyle={styles.listContainer}>
                {notifications.length === 0 ? (
                    <Text style={[styles.emptyText, { color: theme.colors.textMuted }]}>ไม่มีการแจ้งเตือนใหม่</Text>
                ) : (
                    notifications.map((app, index) => (
                        <TouchableOpacity 
                            key={app.id} 
                            activeOpacity={0.7}
                            onPress={() => navigation.navigate('ผู้สมัคร')}
                        >
                            <GlassCard style={styles.card}>
                                <View style={styles.header}>
                                    <View style={[styles.avatar, { backgroundColor: `${theme.colors.primary}33` }]}>
                                        <Text style={[styles.avatarText, { color: theme.colors.primary }]}>{getInitials(app.applicant_name)}</Text>
                                    </View>
                                    <View style={styles.info}>
                                        <Text style={[styles.title, { color: theme.colors.text }]}>
                                            <Text style={{fontWeight: 'bold'}}>{app.applicant_name}</Text> สมัครงานในตำแหน่ง {app.job_title}
                                        </Text>
                                        <View style={styles.meta}>
                                            <Ionicons name="time-outline" size={12} color={theme.colors.textMuted} />
                                            <Text style={[styles.time, { color: theme.colors.textMuted }]}>{formatDate(app.created_at)}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.unreadDot} />
                                </View>
                            </GlassCard>
                        </TouchableOpacity>
                    ))
                )}
                <View style={{height: 100}}/> 
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        padding: 20,
        paddingTop: 100, // Header spacing
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
    },
    card: {
        marginBottom: 12,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        marginBottom: 4,
        lineHeight: 20,
    },
    meta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    time: {
        fontSize: 12,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ef4444',
        marginLeft: 8,
    }
});
