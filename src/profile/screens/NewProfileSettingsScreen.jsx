import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

//import auth context
import { useAuth } from '../../authContext/Auth-Context';

export default function SettingsScreen({ navigation, darkMode, setDarkMode }) {
  const { user, signOut } = useAuth();
  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  const dynamicStyles = styles(darkMode);

  return (
    <SafeAreaView style={dynamicStyles.safeArea}>
      <View style={dynamicStyles.container}>
        <ScrollView>
          <View style={dynamicStyles.section}>
            <Text style={dynamicStyles.sectionTitle}>Profile Settings</Text>
            <View style={dynamicStyles.sectionBody}>
              <View style={[dynamicStyles.rowWrapper, dynamicStyles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("UpdateProfile")}
                  style={dynamicStyles.row}>
                  <View style={dynamicStyles.rowIcon}>
                    <Ionicons name="person-circle-outline" color="gray" size={25} />
                  </View>
                  <Text style={dynamicStyles.rowLabel}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={dynamicStyles.sectionTitle}>Preferences</Text>
            <View style={dynamicStyles.sectionBody}>
              <View style={[dynamicStyles.rowWrapper, dynamicStyles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={dynamicStyles.row}>
                  <View style={dynamicStyles.rowIcon}>
                    <Ionicons name="globe-outline" color="gray" size={25} />
                  </View>
                  <Text style={dynamicStyles.rowLabel}>Language</Text>
                  <View style={dynamicStyles.rowSpacer} />
                  <Text style={dynamicStyles.rowValue}>English</Text>
                  <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
                </TouchableOpacity>
              </View>
              <View style={dynamicStyles.rowWrapper}>
                <View style={dynamicStyles.row}>
                  <View style={dynamicStyles.rowIcon}>
                    <Ionicons name="moon-outline" color="gray" size={25} />
                  </View>
                  <Text style={dynamicStyles.rowLabel}>Dark Mode</Text>
                  <View style={dynamicStyles.rowSpacer} />
                  <Switch
                    value={darkMode}
                    onValueChange={(value) => {
                      setDarkMode(value);
                    }}
                  />
                </View>
              </View>
              <View style={dynamicStyles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={dynamicStyles.row}>
                  <View style={dynamicStyles.rowIcon}>
                    <Ionicons name="navigate-outline" color="gray" size={25} />
                  </View>
                  <Text style={dynamicStyles.rowLabel}>Location</Text>
                  <View style={dynamicStyles.rowSpacer} />
                  <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={dynamicStyles.section}>
              <Text style={dynamicStyles.sectionTitle}>Notifications</Text>
              <View style={dynamicStyles.sectionBody}>
                <View style={[dynamicStyles.rowWrapper, dynamicStyles.rowFirst]}>
                </View>
                <View style={dynamicStyles.rowWrapper}>
                  <View style={dynamicStyles.row}>
                    <View style={dynamicStyles.rowIcon}>
                      <Ionicons name="notifications-outline" color="gray" size={25} />
                    </View>
                    <Text style={dynamicStyles.rowLabel}>Push Notifications</Text>
                    <View style={dynamicStyles.rowSpacer} />
                    <Switch
                      onValueChange={pushNotifications =>
                        setForm({ ...form, pushNotifications })
                      }
                      value={form.pushNotifications} />
                  </View>
                </View>
                <View style={dynamicStyles.rowWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}
                    style={dynamicStyles.row}>
                    <View style={dynamicStyles.rowIcon}>
                      <Ionicons name="musical-notes-outline" color="gray" size={25} />
                    </View>
                    <Text style={dynamicStyles.rowLabel}>Sound</Text>
                    <View style={dynamicStyles.rowSpacer} />
                    <Text style={dynamicStyles.rowValue}>Default</Text>
                    <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={dynamicStyles.section}>
              <View style={dynamicStyles.sectionBody}>
                <View style={[dynamicStyles.rowWrapper, dynamicStyles.rowFirst]}>
                </View>
                <View style={dynamicStyles.rowWrapper}>
                  <TouchableOpacity
                    onPress={signOut}
                    style={dynamicStyles.row}>
                    <Text style={dynamicStyles.logoutLabel}>Log Out</Text>
                    <View style={dynamicStyles.rowSpacer} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = (darkMode) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: darkMode ? '#000' : '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: darkMode ? '#000' : '#fff',
  },
  section: {
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: darkMode ? '#fff' : '#000',
  },
  sectionBody: {
    backgroundColor: darkMode ? '#333' : '#f7f7f7',
    borderRadius: 8,
    padding: 16,
  },
  rowWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: darkMode ? '#555' : '#e5e5e5',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 16,
    color: darkMode ? '#fff' : '#000',
  },
  rowSpacer: {
    flex: 1,
  },
  rowValue: {
    fontSize: 16,
    color: '#6b6b6b',
    marginRight: 8,
  },
  logoutLabel: {
    fontSize: 16,
    color: 'red',
  },
  rowFirst: {
    borderTopWidth: 1,
    borderTopColor: darkMode ? '#555' : '#e5e5e5',
  },
});