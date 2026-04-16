import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { LineChart, ProgressChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '../components/GlassCard';
import { MOCK } from '../services/mockData';

const { width } = Dimensions.get('window');

function StatBox({ title, value, icon, color }) {
    return (
        <GlassCard style={styles.statBox}>
            <View style={[styles.iconBox, { backgroundColor: `${color}15` }]}>
                <Ionicons name={icon} size={20} color={color} />
            </View>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statTitle}>{title}</Text>
        </GlassCard>
    );
}

export default function DashboardScreen() {
    const { theme } = useContext(ThemeContext);
    const { stats, applications } = MOCK;

    // Applications Trend Data
    const lineData = {
        labels: ["จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส.", "อา."],
        datasets: [{ data: [2, 5, 3, 8, 4, 1, 6] }]
    };

    // Job Status Data for Progress Chart
    const activeJobs = MOCK.jobs.filter(j => j.status === 'active').length;
    const closedJobs = MOCK.jobs.filter(j => j.status === 'closed').length;
    const draftJobs = MOCK.jobs.filter(j => j.status === 'draft').length;
    const total = activeJobs + closedJobs + draftJobs;
    const progressData = {
        labels: ["เปิดรับ", "ปิดรับ", "ร่าง"],
        data: total > 0 ? [activeJobs/total, closedJobs/total, draftJobs/total] : [0,0,0],
        colors: ["rgba(16, 185, 129, 1)", "rgba(239, 68, 68, 1)", "rgba(107, 99, 144, 1)"]
    };

    const chartConfig = {
        backgroundGradientFrom: "transparent",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "transparent",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(124, 58, 237, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        propsForDots: { r: "4", strokeWidth: "2", stroke: "#7c3aed" }
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Text style={[styles.greeting, { color: theme.colors.text }]}>สวัสดี, {MOCK.company.company_name}</Text>
                <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>ภาพรวมการรับสมัครงานของคุณ</Text>
            </View>

            <View style={styles.statsGrid}>
                <StatBox title="ประกาศงาน" value={stats.total_jobs} icon="briefcase" color="#10b981" />
                <StatBox title="ใบสมัครทั้งหมด" value={stats.total_applications} icon="documents" color="#3b82f6" />
                <StatBox title="รอพิจารณา" value={stats.pending} icon="time" color="#f59e0b" />
                <StatBox title="ตอบรับแล้ว" value={stats.accepted} icon="checkmark-circle" color="#8b5cf6" />
            </View>

            <GlassCard style={styles.chartCard}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>แนวโน้มใบสมัคร</Text>
                <LineChart
                    data={lineData}
                    width={width - 40 - 40} // padding from glass card and screen
                    height={200}
                    chartConfig={{...chartConfig, color: (opacity=1)=>`rgba(124,58,237,${opacity})`}}
                    bezier
                    style={styles.chart}
                />
            </GlassCard>

            <GlassCard style={styles.chartCard}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>สถานะประกาศงาน</Text>
                <ProgressChart
                    data={progressData}
                    width={width - 80}
                    height={200}
                    strokeWidth={12}
                    radius={28}
                    chartConfig={chartConfig}
                    hideLegend={false}
                    withCustomBarColorFromData={true}
                />
            </GlassCard>
            
            {/* Space for bottom tabs */}
            <View style={{height: 80}}/> 
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f1a',
    },
    content: {
        padding: 20,
        paddingTop: 100, // For transparent header
    },
    header: {
        marginBottom: 24,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#b8b0d8',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statBox: {
        width: '48%',
        marginBottom: 16,
        padding: 16,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 4,
    },
    statTitle: {
        fontSize: 12,
        color: '#b8b0d8',
    },
    chartCard: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 16,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    }
});
