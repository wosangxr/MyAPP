import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

// Context
import { ThemeProvider, ThemeContext } from './src/context/ThemeContext';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import JobsScreen from './src/screens/JobsScreen';
import ApplicantsScreen from './src/screens/ApplicantsScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ThemeToggleButton() {
    const { isDark, toggleTheme, theme } = useContext(ThemeContext);
    return (
        <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
            <Ionicons name={isDark ? 'sunny' : 'moon'} size={24} color={theme.colors.text} />
        </TouchableOpacity>
    );
}

function TabNavigator() {
    const { theme, isDark } = useContext(ThemeContext);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: true,
                headerStyle: { backgroundColor: theme.colors.surfaceSolid },
                headerTintColor: theme.colors.text,
                headerTransparent: true,
                headerBackground: () => (
                    <View style={[{ backgroundColor: theme.colors.surfaceSolid }, StyleSheet.absoluteFill]} />
                ),
                headerRight: () => <ThemeToggleButton />,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'ภาพรวม') iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                    else if (route.name === 'ประกาศงาน') iconName = focused ? 'briefcase' : 'briefcase-outline';
                    else if (route.name === 'ผู้สมัคร') iconName = focused ? 'people' : 'people-outline';
                    else if (route.name === 'แจ้งเตือน') iconName = focused ? 'notifications' : 'notifications-outline';
                    else if (route.name === 'โปรไฟล์') iconName = focused ? 'business' : 'business-outline';
                    
                    return (
                        <View>
                            <Ionicons name={iconName} size={size} color={color} />
                            {route.name === 'แจ้งเตือน' && (
                                <View style={{
                                    position: 'absolute', right: -2, top: -2,
                                    width: 8, height: 8, borderRadius: 4, backgroundColor: '#ef4444'
                                }} />
                            )}
                        </View>
                    );
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textMuted,
                tabBarStyle: {
                    position: 'absolute',
                    borderTopWidth: 0,
                    elevation: 0,
                    backgroundColor: 'transparent',
                },
                tabBarBackground: () => (
                    <View style={[StyleSheet.absoluteFill, { backgroundColor: theme.colors.surfaceSolid }]} />
                ),
            })}
        >
            <Tab.Screen name="ภาพรวม" component={DashboardScreen} />
            <Tab.Screen name="ประกาศงาน" component={JobsScreen} />
            <Tab.Screen name="ผู้สมัคร" component={ApplicantsScreen} />
            <Tab.Screen name="แจ้งเตือน" component={NotificationsScreen} />
            <Tab.Screen name="โปรไฟล์" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

function AppNavigation() {
    const { isDark, theme } = useContext(ThemeContext);
    
    const NavigationTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: theme.colors.background,
            text: theme.colors.text,
        },
    };

    return (
        <NavigationContainer theme={NavigationTheme}>
            <StatusBar style={isDark ? "light" : "dark"} />
            <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Main" component={TabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <AppNavigation />
        </ThemeProvider>
    );
}
