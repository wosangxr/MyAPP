import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/themeContext';

export default function MainTabs() {
  const { c } = useTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          if (route.name === 'dashboard') iconName = 'home';
          else if (route.name === 'jobs') iconName = 'search';
          else if (route.name === 'matches') iconName = 'heart';
          else if (route.name === 'profile') iconName = 'user';
          else if (route.name === 'settings') iconName = 'settings';
          
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: c.primary,
        tabBarInactiveTintColor: c.textMuted,
        tabBarStyle: { 
          backgroundColor: c.surface, 
          borderTopColor: c.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      {/* Visible Tabs - 5 Essential ones */}
      <Tabs.Screen name="dashboard" options={{ title: 'Home' }} />
      <Tabs.Screen name="jobs" options={{ title: 'Jobs' }} />
      <Tabs.Screen name="matches" options={{ title: 'Matches' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />

      {/* Hidden Screens */}
      <Tabs.Screen name="swipe" options={{ href: null }} />
      <Tabs.Screen name="applications" options={{ href: null }} />
      <Tabs.Screen name="apply" options={{ href: null }} />
      <Tabs.Screen name="chat" options={{ href: null }} />
      <Tabs.Screen name="edit-profile" options={{ href: null }} />
      <Tabs.Screen name="feedback" options={{ href: null }} />
      <Tabs.Screen name="interviews" options={{ href: null }} />
      <Tabs.Screen name="job-detail" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
      <Tabs.Screen name="personality" options={{ href: null }} />
      <Tabs.Screen name="privacy-policy" options={{ href: null }} />
      <Tabs.Screen name="resume" options={{ href: null }} />
      <Tabs.Screen name="saved" options={{ href: null }} />
    </Tabs>
  );
}
