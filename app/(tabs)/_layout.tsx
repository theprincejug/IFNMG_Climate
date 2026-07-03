import { Tabs, usePathname, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ProvedorSalas } from '@/contexts/ContextoSalas';
import { useEffect } from "react";
import { isUsuarioLogado } from "@/src/api/auth";

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const verificarLogin = async () => {
      const usuarioLogado = await isUsuarioLogado();

      if (!usuarioLogado) {
        router.push("/login");
      }
    };

    pathname !== '/login' && verificarLogin();
  }, [router, pathname]);

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
          tabBarIcon: ({ color }: { color: string }) => (
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
          tabBarIcon: ({ color }: { color: string }) => (
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
          tabBarIcon: ({ color }: { color: string }) => (
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
