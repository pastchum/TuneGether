import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveLastViewedProfileId, loadLastViewedProfileId } from './AsyncLastViewedProfile';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

describe('AsyncLastViewedProfile', () => {
  describe('saveLastViewedProfileId', () => {
    it('saves the profile ID to AsyncStorage', async () => {
      const profileId = 'profile123';
      await saveLastViewedProfileId(profileId);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('lastViewedProfileId', profileId);
    });

    it('logs an error if saving fails', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const profileId = 'profile123';
      AsyncStorage.setItem.mockRejectedValueOnce(new Error('AsyncStorage error'));

      await saveLastViewedProfileId(profileId);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to save last viewed profile ID:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('loadLastViewedProfileId', () => {
    it('loads the profile ID from AsyncStorage', async () => {
      const profileId = 'profile123';
      AsyncStorage.getItem.mockResolvedValueOnce(profileId);

      const result = await loadLastViewedProfileId();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('lastViewedProfileId');
      expect(result).toBe(profileId);
    });

    it('returns null and logs an error if loading fails', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      AsyncStorage.getItem.mockRejectedValueOnce(new Error('AsyncStorage error'));

      const result = await loadLastViewedProfileId();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to load last viewed profile ID:',
        expect.any(Error)
      );
      expect(result).toBeNull();

      consoleErrorSpy.mockRestore();
    });
  });
});
