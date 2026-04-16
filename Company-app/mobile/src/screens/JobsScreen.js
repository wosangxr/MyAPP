import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '../components/GlassCard';
import StatusBadge from '../components/StatusBadge';
import { MOCK } from '../services/mockData';

export default function JobsScreen() {
    const { theme } = useContext(ThemeContext);
    const [filter, setFilter] = useState('all');

    const filteredJobs = filter === 'all' ? MOCK.jobs : MOCK.jobs.filter(j => j.status === filter);

    const formatSalary = (min, max) => {
        if (min && max) return `฿${min.toLocaleString()} - ${max.toLocaleString()}`;
        return 'ไม่ระบุ';
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {['all', 'active', 'closed', 'draft'].map(f => (
                        <TouchableOpacity 
                            key={f}
                            style={[styles.filterPill, filter === f && styles.filterPillActive]}
                            onPress={() => setFilter(f)}
                        >
                            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                                {f === 'all' ? 'ทั้งหมด' : f === 'active' ? 'เปิดรับ' : f === 'closed' ? 'ปิดรับ' : 'ฉบับร่าง'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView contentContainerStyle={styles.listContainer}>
                {filteredJobs.map(job => (
                    <GlassCard key={job.id} style={styles.jobCard}>
                        <View style={styles.jobHeader}>
                            <Text style={[styles.jobTitle, { color: theme.colors.text }]}>{job.title}</Text>
                            <StatusBadge status={job.status} />
                        </View>
                        
                        <View style={styles.jobMeta}>
                            <View style={styles.metaItem}>
                                <Ionicons name="location" size={14} color={theme.colors.textMuted} />
                                <Text style={[styles.metaText, { color: theme.colors.textMuted }]}>{job.location || '-'}</Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Ionicons name="time" size={14} color={theme.colors.textMuted} />
                                <Text style={[styles.metaText, { color: theme.colors.textMuted }]}>{job.job_type}</Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Ionicons name="cash" size={14} color={theme.colors.textMuted} />
                                <Text style={[styles.metaText, { color: theme.colors.textMuted }]}>{formatSalary(job.salary_min, job.salary_max)}</Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Ionicons name="people" size={14} color={theme.colors.textMuted} />
                                <Text style={[styles.metaText, { color: theme.colors.textMuted }]}>{job.applications_count} สมัคร</Text>
                            </View>
                        </View>

                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Ionicons name="create-outline" size={18} color="#a78bfa" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Ionicons name={job.status === 'active' ? 'pause' : 'play'} size={18} color="#a78bfa" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Ionicons name="trash-outline" size={18} color="#ef4444" />
                            </TouchableOpacity>
                        </View>
                    </GlassCard>
                ))}
                <View style={{height: 100}}/> 
            </ScrollView>

            <TouchableOpacity style={styles.fab}>
                <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f1a',
    },
    filterContainer: {
        paddingTop: 100, // Header height
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
    jobCard: {
        marginBottom: 16,
        padding: 16,
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        flex: 1,
        marginRight: 10,
    },
    jobMeta: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 16,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        color: '#b8b0d8',
        fontSize: 12,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        paddingTop: 12,
    },
    actionBtn: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fab: {
        position: 'absolute',
        bottom: 90,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#7c3aed',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#7c3aed',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    }
});
