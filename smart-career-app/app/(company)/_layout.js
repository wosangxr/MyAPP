import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/themeContext';
import { useLang } from '../../context/languageContext';

export default function CompanyTabs() {
  const { c } = useTheme();
  const { t } = useLang();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          if (route.name === 'dashboard') iconName = 'home';
          else if (route.name === 'manage-jobs') iconName = 'briefcase';
          else if (route.name === 'applicants') iconName = 'users';
          else if (route.name === 'settings') iconName = 'settings';
          
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#10B981', // Company branding color (greenish)
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
      {/* Visible Tabs */}
      <Tabs.Screen name="dashboard" options={{ title: 'Home' }} />
      <Tabs.Screen name="manage-jobs" options={{ title: 'Jobs' }} />
      <Tabs.Screen name="applicants" options={{ title: 'Applicants' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />

      {/* Hidden Screens */}
      <Tabs.Screen name="profile" options={{ href: null }} />
      <Tabs.Screen name="chat" options={{ href: null }} />
      <Tabs.Screen name="chat-room" options={{ href: null }} />
      <Tabs.Screen name="interviews" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
    </Tabs>
  );
}
