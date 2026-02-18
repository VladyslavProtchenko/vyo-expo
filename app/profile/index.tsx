import useUserStore from '@/store/useUserStore';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
  

export default function ProfileScreen() {
  const router = useRouter();
  const { name } = useUserStore();

  const menuGroups = [
    // Card 1: Personal (single item)
    [
      {
        icon: 'person-outline',
        iconType: 'ionicons' as const,
        text: 'Personal',
        onPress: () => {
          router.push('/profile/personal' as any);
        },
      },
    ],
    // Card 2: App Settings (3 items)
    [
      {
        icon: 'settings-outline',
        iconType: 'ionicons' as const,
        text: 'App settings',
        onPress: () => {
          router.push('/profile/app-settings' as any);
        },
      },
      {
        icon: 'notifications-outline',
        iconType: 'ionicons' as const,
        text: 'Notification settings',
        onPress: () => {
          router.push('/profile/notifications' as any);
        },
      },
      {
        icon: 'chatbubble-outline',
        iconType: 'ionicons' as const,
        text: 'Share feedback',
        onPress: () => {
          router.push('/profile/feedback' as any);
        },
      },
    ],
    // Card 3: Social Media (2 items)
    [
      {
        icon: 'logo-instagram',
        iconType: 'ionicons' as const,
        text: 'Follow us on Instagram',
        onPress: async () => {
          const url = 'https://www.instagram.com/vyo_app';
          const canOpen = await Linking.canOpenURL(url);
          if (canOpen) {
            await Linking.openURL(url);
          }
        },
        isSocial: true,
      },
      {
        icon: 'logo-youtube',
        iconType: 'ionicons' as const,
        text: 'Subscribe to Youtube',
        onPress: async () => {
          const url = 'https://www.youtube.com/@vyo_app';
          const canOpen = await Linking.canOpenURL(url);
          if (canOpen) {
            await Linking.openURL(url);
          }
        },
        isSocial: true,
      },
    ],
    // Card 4: Legal (2 items)
    [
      {
        text: 'Terms & Conditions',
        onPress: () => {
          router.push('/privacy' as any);
        },
      },
      {
        text: 'Privacy Policy',
        onPress: () => {
          router.push('/privacy' as any);
        },
      },
    ],
  ];

  const handleSignOut = () => {
    // Handle sign out
    router.replace('/login' as any);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('@/assets/images/avatar.png')}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
              <Feather name="edit-2" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{name || 'Lily Adams'}</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuGroups.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.menuCard}>
              {group.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={styles.menuItem}
                  onPress={item.onPress}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuItemLeft}>
                    {'icon' in item && item.icon && 'iconType' in item && item.iconType && (
                      <View style={['isSocial' in item && item.isSocial ? styles.socialIconContainer : styles.iconContainer]}>
                        {item.iconType === 'ionicons' ? (
                          <Ionicons
                            name={item.icon as keyof typeof Ionicons.glyphMap}
                            size={24}
                            color={'isSocial' in item && item.isSocial ? undefined : '#000'}
                            style={'isSocial' in item && item.isSocial ? styles.socialIcon : undefined}
                          />
                        ) : (
                          <MaterialIcons
                            name={item.icon as keyof typeof MaterialIcons.glyphMap}
                            size={24}
                            color="#000"
                          />
                        )}
                      </View>
                    )}
                    <Text style={[styles.menuItemText, !('icon' in item && item.icon) && styles.menuItemTextNoIcon]}>
                      {item.text}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="#000" />
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
          activeOpacity={0.7}
        >
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    
    paddingHorizontal: 16,
    paddingBottom: 100,
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 16,
    width: 36,
    height: 36,
    alignSelf: 'flex-end',
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,


  },
  scrollView: {
    paddingTop: 60,
    flex: 1,
    paddingHorizontal: 16,
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    top: 0,
    right: -10,
    width: 36,
    height: 36,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F5F5F5',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: '#000',
  },
  menuContainer: {
    marginBottom: 16,
    gap: 16,
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 8,
    shadowColor: '#000',
    elevation: 2,
    marginBottom: 12,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 68,
  },

  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 100,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIconContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#000',
    marginLeft: 12,
  },
  menuItemTextNoIcon: {
    marginLeft: 0,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  signOutButton: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 100,
  },
  signOutText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '800',
    color: '#000',
  },
});
