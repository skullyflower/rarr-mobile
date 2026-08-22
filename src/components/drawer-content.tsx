import { useRouter, type Href } from 'expo-router';
import { DrawerContentScrollView, type DrawerContentComponentProps } from 'expo-router/drawer';
import { Image, StyleSheet, View } from 'react-native';
import { Divider, List, Text, useTheme } from 'react-native-paper';

interface NavItem {
  label: string;
  route: string;
}

const DAILY_INVENTORIES: NavItem[] = [
  { label: 'Trouble', route: '/trouble' },
  { label: 'Drawn to Trouble', route: '/drawn-to-trouble' },
  { label: 'Spawn of Trouble', route: '/spawn-of-trouble' },
  { label: 'Resentments', route: '/resentments' },
  { label: 'Control Issues', route: '/serenity' },
  { label: 'Fear and Gratitude', route: '/fears' },
];

const LITERATURE: NavItem[] = [
  { label: 'The Steps', route: '/steps' },
  { label: 'Stories', route: '/literature' },
];

export default function DrawerContent(props: DrawerContentComponentProps) {
  const theme = useTheme();
  const router = useRouter();
  const currentRoute = props.state.routes[props.state.index]?.name;

  const navigate = (route: string) => {
    router.push(route as Href);
    props.navigation.closeDrawer();
  };

  const isActive = (route: string) => `/${currentRoute}` === route;

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/logo/RarrLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Divider />
      <List.Item
        title="Home"
        left={(p) => <List.Icon {...p} icon="home" />}
        onPress={() => navigate('/')}
        style={isActive('/') ? { backgroundColor: theme.colors.secondaryContainer } : undefined}
      />
      <List.Accordion title="Daily Inventories" left={(p) => <List.Icon {...p} icon="book-open-variant" />} id="inventories">
        {DAILY_INVENTORIES.map((item) => (
          <List.Item
            key={item.route}
            title={item.label}
            style={[
              styles.subItem,
              isActive(item.route) ? { backgroundColor: theme.colors.secondaryContainer } : undefined,
            ]}
            onPress={() => navigate(item.route)}
          />
        ))}
      </List.Accordion>
      <List.Accordion title="Literature" left={(p) => <List.Icon {...p} icon="book-open-page-variant" />} id="literature">
        {LITERATURE.map((item) => (
          <List.Item
            key={item.route}
            title={item.label}
            style={[
              styles.subItem,
              isActive(item.route) ? { backgroundColor: theme.colors.secondaryContainer } : undefined,
            ]}
            onPress={() => navigate(item.route)}
          />
        ))}
      </List.Accordion>
      <List.Item
        title="About"
        left={(p) => <List.Icon {...p} icon="information" />}
        onPress={() => navigate('/about')}
        style={isActive('/about') ? { backgroundColor: theme.colors.secondaryContainer } : undefined}
      />
      <List.Item
        title="My Log"
        left={(p) => <List.Icon {...p} icon="notebook" />}
        onPress={() => navigate('/log')}
        style={isActive('/log') ? { backgroundColor: theme.colors.secondaryContainer } : undefined}
      />
      <Text variant="labelSmall" style={styles.footer}>
        RARR — Ragers and Rampagers, Recovering
      </Text>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  logo: {
    width: 120,
    height: 80,
  },
  subItem: {
    paddingLeft: 32,
  },
  footer: {
    textAlign: 'center',
    padding: 16,
    opacity: 0.6,
  },
});
