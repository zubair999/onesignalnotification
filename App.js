import React, { useEffect, useState } from 'react';
import {
  View,
  Text
} from 'react-native';

import OneSignal from 'react-native-onesignal'

const App = () => {
  const[isSubscribed, setIsSubscribed] = useState({})
  const APP_ID = "YOUR APP ID";
  useEffect(() => {
        OneSignal.setAppId(APP_ID);
        OneSignal.setLogLevel(6, 0);
        OneSignal.setRequiresUserPrivacyConsent(false);
        OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
            console.log(notifReceivedEvent)
            let notif = notifReceivedEvent.getNotification();

            const button1 = {
                text: "Cancel",
                onPress: () => { notifReceivedEvent.complete(); },
                style: "cancel"
            };
            const button2 = { text: "Complete", onPress: () => { notifReceivedEvent.complete(notif); }};
            Alert.alert("Complete notification?", "Test", [ button1, button2], { cancelable: true });
        });
        OneSignal.setNotificationOpenedHandler(notification => {
            console.log(notification);
        });
        OneSignal.setInAppMessageClickHandler(event => {
            console.log(event);
        });
        const deviceState = OneSignal.getDeviceState();

        deviceState.then(res => {
          setIsSubscribed(res);
        });
  },[]);

  return (
    <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
      <Text style={{fontSize:20}}>OneSignal Integration</Text>
    </View>
  );
};

export default App;