import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '../components/GlassCard';
import StatusBadge from '../components/StatusBadge';
import { MOCK } from '../services/mockData';

export default function ApplicantsScreen() {
    const { theme } = useContext(ThemeContext);
    const [filter, setFilter] = useState('all');

    const filteredApps = filter === 'all' ? MOCK.applications : MOCK.applications.filter(a => a.status === filter);

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
            <View style={styles.statsRow}>
                <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: theme.colors.text }]}>{MOCK.applications.length}</Text>
                    <Text style={styles.statLabel}>ทั้งหมด</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: '#f59e0b' }]}>{MOCK.applications.filter(a=>a.status==='pending').length}</Text>
                    <Text style={styles.statLabel}>รอพิจารณา</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: '#8b5cf6' }]}>{MOCK.applications.filter(a=>a.status==='interview').length}</Text>
                    <Text style={styles.statLabel}>นัดสัมภาษณ์</Text>
                </View>
            </View>

            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {['all', 'pending', 'reviewing', 'interview', 'accepted', 'rejected'].map(f => (
                        <TouchableOpacity 
                            key={f}
                            style={[styles.filterPill, filter === f && styles.filterPillActive]}
                            onPress={() => setFilter(f)}
                        >
                            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                                {f === 'all' ? 'ทั้งหมด' : f === 'pending' ? 'รอพิจารณา' : f === 'reviewing' ? 'ตรวจสอบ' : f === 'interview' ? 'สัมภาษณ์' : f === 'accepted' ? 'รับเข้า' : 'ปฏิเสธ'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView contentContainerStyle={styles.listContainer}>
                {filteredApps.map((app, index) => (
                    <GlassCard key={app.id} style={styles.appCard}>
                        <View style={styles.appHeader}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>{getInitials(app.applicant_name)}</Text>
                            </View>
                            <View style={styles.appInfo}>
                                <Text style={[styles.appName, { color: theme.colors.text }]}>{app.applicant_name}</Text>
                                <Text style={[styles.appJob, { color: theme.colors.textMuted }]}>{app.job_title}</Text>
                            </View>
                            <StatusBadge status={app.status} />
                        </View>
                        
                        <View style={styles.appFooter}>
                            <View style={styles.metaInfo}>
                                <Ionicons name="mail" size={14} color={theme.colors.textMuted} />
                                <Text style={[styles.metaText, { color: theme.colors.textMuted }]}>{app.applicant_email}</Text>
                            </View>
                            <View style={styles.metaInfo}>
                                <Ionicons name="time" size={14} color={theme.colors.textMuted} />
                                <Text style={[styles.metaText, { color: theme.colors.textMuted }]}>{formatDate(app.created_at)}</Text>
                            </View>
                        </View>
                        
                        <View style={styles.cardActions}>
                            <TouchableOpacity style={styles.actionBtnText}>
                                <Text style={styles.actionText}>เปลี่ยนสถานะ</Text>
                                <Ionicons name="chevron-down" size={16} color="#a78bfa" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Ionicons name="document-text" size={18} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </GlassCard>
                ))}
                <View style={{height: 100}}/> 
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f1a',
    },
    statsRow: {
        flexDirection: 'row',
        paddingTop: 100, // Header height
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    statItem: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: 12,
        borderRadius: 16,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#b8b0d8',
    },
    filterContainer: {
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    filterPill: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    filterPillActive: {
        backgroundColor: '#7c3aed',
        borderColor: '#7c3aed',
    },
    filterText: {
        color: '#b8b0d8',
        fontSize: 14,
    },
    filterTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },
    listContainer: {
        padding: 20,
    },
    appCard: {
        marginBottom: 16,
        padding: 16,
    },
    appHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(124, 58, 237, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: '#a78bfa',
        fontWeight: 'bold',
        fontSize: 18,
    },
    appInfo: {
        flex: 1,
    },
    appName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    appJob: {
        color: '#b8b0d8',
        fontSize: 13,
    },
    appFooter: {
        gap: 8,
        marginBottom: 16,
    },
    metaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        color: '#b8b0d8',
        fontSize: 13,
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        paddingTop: 12,
    },
    actionBtnText: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
    },
    actionText: {
        color: '#a78bfa',
        fontWeight: '500',
        fontSize: 14,
    },
    actionBtn: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: '#7c3aed',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
