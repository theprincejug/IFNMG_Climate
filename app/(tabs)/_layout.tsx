import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ProvedorSalas } from '@/contexts/ContextoSalas';

export default function TabLayout() {
  return (
  <ProvedorSalas>
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#10b981",
        tabBarInactiveTintColor: "#64748b",

        tabBarStyle: {
          height: 65,
          paddingTop: 8,
          paddingBottom: 8,
          borderTopWidth: 1,
          borderTopColor: "#e2e8f0",
          backgroundColor: "#ffffff",
        },

        tabBarLabelStyle: {
          fontSize: 11,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={20}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="blocos"
        options={{
          title: "Blocos",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="grid-outline"
              size={20}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="agenda"
        options={{
          title: "Agenda",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="calendar-outline"
              size={20}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  </ProvedorSalas>
  );
}
