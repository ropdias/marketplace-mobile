import { Tabs } from 'expo-router'
import { Text } from 'react-native'

import { HomeHeader } from '@/components/home-header'
import { Icon, Store04Icon, UserIcon } from '@/components/ui/icon'

function TabBarLabel({ focused, label }: { focused: boolean; label: string }) {
  return (
    <Text
      className={`font-label-sm ${focused ? 'text-orange-base' : 'text-gray-100'}`}
    >
      {label}
    </Text>
  )
}

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          header: () => <HomeHeader />,
          tabBarLabel: ({ focused }) => (
            <TabBarLabel focused={focused} label="Produtos" />
          ),
          tabBarIcon: ({ focused }) => (
            <Icon
              as={Store04Icon}
              className={focused ? 'fill-orange-base' : 'fill-gray-100'}
              width={20}
              height={20}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="product"
        options={{
          headerShown: false,
          href: null, // Hidden from tab bar
          tabBarStyle: { display: 'none' }, // No tab bar when active
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <TabBarLabel focused={focused} label="Perfil" />
          ),
          tabBarIcon: ({ focused }) => (
            <Icon
              as={UserIcon}
              className={focused ? 'fill-orange-base' : 'fill-gray-100'}
              width={20}
              height={20}
            />
          ),
        }}
      />
    </Tabs>
  )
}
