import _ from 'lodash';
import { Constants } from 'expo';
import { Platform } from 'react-native';

const getDeviceInfo = () => {
  if (!Constants.isDevice) {
    return 'non-device';
  }

  switch (Platform.OS) {
    case 'ios':
      return `iOS ${_.get(Constants, 'platform.ios.systemVersion')}, ${_.get(Constants, 'platform.ios.model')}`;
    case 'android':
      return `Android ${_.get(Platform, 'Version')}, ${_.get(Constants, 'deviceName')}`;
    default:
      return `Other OS, ${_.get(Constants, 'deviceName')}`;
  }
};

export default getDeviceInfo;
