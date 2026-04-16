import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '../components/GlassCard';
import { MOCK } from '../services/mockData';

export default function ProfileScreen() {
    const { theme } = useContext(ThemeContext);
    const [company, setCompany] = useState(MOCK.company);

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <View style={styles.logoUpload}>
                    <Ionicons name="camera" size={32} color={theme.colors.primary} />
                    <Text style={[styles.uploadText, { color: theme.colors.primary }]}>อัปโหลดโลโก้</Text>
                </View>
                <Text style={[styles.companyNamePreview, { color: theme.colors.text }]}>{company.company_name}</Text>
                <Text style={[styles.industryPreview, { color: theme.colors.textMuted }]}>{company.industry}</Text>
            </View>

            <GlassCard style={styles.formCard}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>ข้อมูลบริษัท</Text>
                
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>ชื่อบริษัท <Text style={{color: '#ef4444'}}>*</Text></Text>
                    <TextInput 
                        style={styles.input} 
                        value={company.company_name}
                        onChangeText={(t) => setCompany({...company, company_name: t})}
                        placeholderTextColor="#6b6390"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>อุตสาหกรรม</Text>
                    <TextInput 
                        style={styles.input} 
                        value={company.industry}
                        onChangeText={(t) => setCompany({...company, industry: t})}
                        placeholderTextColor="#6b6390"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>ขนาดองค์กร</Text>
                    <TextInput 
                        style={styles.input} 
                        value={company.company_size}
                        onChangeText={(t) => setCompany({...company, company_size: t})}
                        placeholderTextColor="#6b6390"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>รายละเอียดบริษัท</Text>
                    <TextInput 
                        style={[styles.input, styles.textArea]} 
                        value={company.description}
                        onChangeText={(t) => setCompany({...company, description: t})}
                        placeholderTextColor="#6b6390"
                        multiline
                        textAlignVertical="top"
                    />
                </View>
            </GlassCard>

            <GlassCard style={styles.formCard}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>ข้อมูลติดต่อ</Text>
                
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>เว็บไซต์</Text>
                    <TextInput 
                        style={styles.input} 
                        value={company.website}
                        onChangeText={(t) => setCompany({...company, website: t})}
                        placeholderTextColor="#6b6390"
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>อีเมลติดต่อ</Text>
                    <TextInput 
                        style={styles.input} 
                        value={company.contact_email}
                        onChangeText={(t) => setCompany({...company, contact_email: t})}
                        placeholderTextColor="#6b6390"
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>เบอร์โทรศัพท์</Text>
                    <TextInput 
                        style={styles.input} 
                        value={company.contact_phone}
                        onChangeText={(t) => setCompany({...company, contact_phone: t})}
                        placeholderTextColor="#6b6390"
                    />
                </View>
            </GlassCard>

            <TouchableOpacity style={styles.saveBtn}>
                <Ionicons name="save-outline" size={20} color="#fff" />
                <Text style={styles.saveBtnText}>บันทึกการเปลี่ยนแปลง</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutBtn}>
                <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                <Text style={styles.logoutBtnText}>ออกจากระบบ</Text>
            </TouchableOpacity>

            <View style={{height: 100}}/> 
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
        paddingTop: 100, // Header
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    logoUpload: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        borderWidth: 2,
        borderColor: 'rgba(124, 58, 237, 0.3)',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    uploadText: {
        color: '#a78bfa',
        fontSize: 12,
        marginTop: 4,
    },
    companyNamePreview: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    industryPreview: {
        color: '#b8b0d8',
        fontSize: 14,
    },
    formCard: {
        marginBottom: 20,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        color: '#b8b0d8',
        fontSize: 14,
        marginBottom: 8,
    },
    input: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        padding: 14,
        color: '#fff',
        fontSize: 15,
    },
    textArea: {
        height: 100,
    },
    saveBtn: {
        backgroundColor: '#7c3aed',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    saveBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutBtn: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderColor: 'rgba(239, 68, 68, 0.3)',
        borderWidth: 1,
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    logoutBtnText: {
        color: '#ef4444',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
