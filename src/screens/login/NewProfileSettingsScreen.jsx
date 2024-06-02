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
import { useAuth } from '../../authContext/Auth-Context'

export default function SettingsScreen({ navigation }) {

  const {user, signOut } = useAuth();
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
      <View style={styles.container}>
        <ScrollView>       
          <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Settings</Text>
            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("UpdateProfile")}
                  style={styles.row}>
                  <View
                    style={styles.rowIcon}>
                    <Ionicons 
                      name='person-circle-outline'
                      color='gray'
                      size = {25}/>
                  </View>
                  <Text style={styles.rowLabel}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
              
              
            </View>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <View
                    style={styles.rowIcon}>
                    <Ionicons
                      name='globe-outline'
                      color='gray'
                      size = {25}
                      />
                  </View>
                  <Text style={styles.rowLabel}>Language</Text>
                  <View style={styles.rowSpacer} />
                  <Text style={styles.rowValue}>English</Text>
                  <FeatherIcon
                    color="#C6C6C6"
                    name="chevron-right"
                    size={20} />
                </TouchableOpacity>
              </View>
              <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <View
                    style={styles.rowIcon}>
                    <Ionicons 
                      name='moon-outline'
                      color='gray'
                      size = {25}/>
                  </View>
                  <Text style={styles.rowLabel}>Dark Mode</Text>
                  <View style={styles.rowSpacer} />
                  <Switch
                    onValueChange={darkMode => setForm({ ...form, darkMode })}
                    value={form.darkMode} />
                </View>
              </View>
              <View style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <View
                    style={styles.rowIcon}>
                    <Ionicons 
                      name='navigate-outline'
                      color='gray'
                      size = {25}/>
                  </View>
                  <Text style={styles.rowLabel}>Location</Text>
                  <View style={styles.rowSpacer} />
                  <FeatherIcon
                    color="#C6C6C6"
                    name="chevron-right"
                    size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Notifications</Text>
              <View style={styles.sectionBody}>
                <View style={[styles.rowWrapper, styles.rowFirst]}>
                </View>
                <View style={styles.rowWrapper}>
                  <View style={styles.row}>
                    <View
                      style={styles.rowIcon}>
                      <Ionicons 
                        name='notifications-outline'
                        color='gray'
                        size = {25}/>
                    </View>
                    <Text style={styles.rowLabel}>Push Notifications</Text>
                    <View style={styles.rowSpacer} />
                    <Switch
                      onValueChange={pushNotifications =>
                        setForm({ ...form, pushNotifications })
                      }
                      value={form.pushNotifications} />
                  </View>
                </View>
                <View style={styles.rowWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}
                    style={styles.row}>
                    <View
                      style={styles.rowIcon}>
                      <Ionicons 
                        name='musical-notes-outline'
                        color='gray'
                        size = {25}/>
                    </View>
                    <Text style={styles.rowLabel}>Sound</Text>
                    <View style={styles.rowSpacer} />
                    <Text style={styles.rowValue}>Default</Text>
                    <FeatherIcon
                      color="#C6C6C6"
                      name="chevron-right"
                      size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            
            <View style={styles.section}>
              <View style={styles.sectionBody}>
                <View style={[styles.rowWrapper, styles.rowFirst]}>
                </View>
                <View style={styles.rowWrapper}>
                  <TouchableOpacity
                    onPress={signOut}
                    style={styles.row}>
                    
                    <Text style={styles.logoutLabel}>Log Out</Text>
                    <View style={styles.rowSpacer} />
                    
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
const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    margin: 40,
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  /** Profile */
  profile: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '600',
    color: '#090909',
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '400',
    color: '#848484',
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  /** Section */
  section: {
    paddingTop: 12,
  },
  sectionTitle: {
    marginVertical: 8,
    marginHorizontal: 24,
    fontSize: 14,
    fontWeight: '600',
    color: '#a7a7a7',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionBody: {
    paddingLeft: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  /** Row */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 16,
    height: 50,
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  rowFirst: {
    borderTopWidth: 0,
  },
  rowIcon: {
    width: 30,
    height: 30,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 17,
    fontWeight: '500',
    color: '#8B8B8B',
    marginRight: 4,
  },
  logoutLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: 'red',
    paddingLeft: 150
  }
});