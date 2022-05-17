import React, {Fragment, useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {useTapjoy} from 'react-native-tapjoy';

const tapjoyOptions = {
  sdkKeyIos: 'Q6nee290RvKnSpxjmYOxEQEBcoe5dGB3DvoOUq65NtjVQyjKdJRKLJ3UTxAo',
  sdkKeyAndroid: 'Hq7jIdwHQXWCgJnT1H5ZdAECcDubXKblZ1Zpc2EmqiGnr1KDPShKerrWQZuA',
  gcmSenderIdAndroid: '389658608176',
  debug: true,
};
// Hq7jIdwHQXWCgJnT1H5ZdAECcDubXKblZ1Zpc2EmqiGnr1KDPShKerrWQZuA;
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
  },
  body: {
    backgroundColor: '#fff',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: '600',
    color: 'red',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'red',
  },
  highlight: {
    fontWeight: '700',
  },
});

const Tapjoy1 = () => {
  const [
    {tapjoyEvents},
    {
      initialiseTapjoy,
      addTapjoyPlacement,
      showTapjoyPlacement,
      requestTapjoyPlacementContent,
    },
  ] = useTapjoy(tapjoyOptions);

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const foo = async () => {
      try {
        const initialized = await initialiseTapjoy();
        console.log('001', initialized);
        setConnected(true);
        if (initialized) {
          console.log('002 initialized', initialized);
          const placementAdded = await addTapjoyPlacement('AppLaunch');
          console.log('placementAdded: ', placementAdded);

          const contentRequested = await requestTapjoyPlacementContent(
            'AppLaunch',
          );
          console.warn('003', contentRequested);

          if (contentRequested) {
            setTimeout(async () => {
              const placementShowed = await showTapjoyPlacement('AppLaunch');
              console.warn('004', placementShowed);
            }, 5000);
          }
        }
      } catch (e) {
        setConnected(false);
        console.log('error 001:', e.message);
      }
    };

    foo();
  }, []);

  useEffect(async () => {
    try {
      await showTapjoyPlacement('AppLaunch');
      // tapjoy placement content is showing
    } catch (e) {
      console.log('002 err:', e.message);
      // placement not added, or content not ready
    }
  }, []);

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              {!connected ? (
                <Text>Tapjoy is not connected.</Text>
              ) : (
                <Text>Tapjoy is connected</Text>
              )}
            </View>
            <View style={styles.sectionContainer}>
              {connected && (
                <>
                  <Button
                    title="request Placement"
                    style={styles.sectionTitle}
                    onPress={async () => {
                      try {
                        const reqPlacement =
                          await requestTapjoyPlacementContent('AppLaunch');
                        console.log('reqPlacement:: ', reqPlacement);
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                  />
                  <Button
                    title="Show Placement"
                    style={styles.sectionTitle}
                    onPress={async () => {
                      try {
                        await showTapjoyPlacement('AppLaunch');
                      } catch (e) {
                        console.log('err show placement: ', e.message);
                      }
                    }}
                  />
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default Tapjoy1;
