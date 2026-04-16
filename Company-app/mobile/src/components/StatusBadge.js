import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const STATUS_MAP = {
    active: { label: 'เปิดรับ', bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981' },
    closed: { label: 'ปิดรับแล้ว', bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' },
    draft: { label: 'ฉบับร่าง', bg: 'rgba(107, 99, 144, 0.15)', color: '#b8b0d8' },
    pending: { label: 'รอพิจารณา', bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' },
    reviewing: { label: 'กำลังตรวจสอบ', bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' },
    interview: { label: 'นัดสัมภาษณ์', bg: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' },
    accepted: { label: 'ตอบรับแล้ว', bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981' },
    rejected: { label: 'ปฏิเสธ', bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' },
};

export default function StatusBadge({ status, style }) {
    const config = STATUS_MAP[status] || STATUS_MAP['draft'];

    return (
        <View style={[styles.badge, { backgroundColor: config.bg }, style]}>
            <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    text: {
        fontSize: 12,
        fontWeight: '500',
    }
});
