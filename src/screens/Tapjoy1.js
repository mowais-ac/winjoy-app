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
      listenToEvent,
      addTapjoyPlacement,
      showTapjoyPlacement,
      requestTapjoyPlacementContent,
    },
  ] = useTapjoy(tapjoyOptions);

  const [connected, setConnected] = useState(false);

  const listenForEarnedCurrencyCallback = useCallback(
    ({amount, currencyName}) => {
      alert(`Earned ${amount} ${currencyName}`);
    },
    [],
  );

  useEffect(() => {
    const tapjoyEvent = 'onPlacementContentReady';
    const listeners = {tapjoyEvent};

    tapjoyEvents.forEach(tapjoyEvent => {
      listeners[tapjoyEvent] = listenToEvent(tapjoyEvent, evt => {
        console.log(evt);
      });
    });

    return () => {
      for (const key in listeners) {
        if (listeners[key] && listeners[key].remove) {
          listeners[key].remove();
        }
      }
    };
  }, [listenToEvent, tapjoyEvents]);

  useEffect(() => {
    const foo = async () => {
      try {
        const initialized = await initialiseTapjoy();

        setConnected(true);

        if (initialized) {
          const placementAdded = await addTapjoyPlacement('InterstitialVideo');
          console.log(placementAdded);
          {
            console.log('placementAdded', placementAdded);
          }
          if (placementAdded) {
            const contentRequested = await requestTapjoyPlacementContent(
              'InterstitialVideo',
            );
            console.log(contentRequested);

            // if (contentRequested) {
            //   setTimeout(async () => {
            //     const placementShowed = await showTapjoyPlacement('InterstitialVideo');
            //     console.log(placementShowed);
            //   }, 5000)
            // }
          }
        }
      } catch (e) {
        setConnected(false);
        alert(e.message);
      }
    };
    console.log('tapjoyEvents', tapjoyEvents);
    foo();
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
                <Button
                  title="Show Placement"
                  style={styles.sectionTitle}
                  onPress={async () => {
                    try {
                      await requestTapjoyPlacementContent('InterstitialVideo');
                    } catch (e) {
                      console.log(e);
                    }

                    try {
                      await showTapjoyPlacement('InterstitialVideo');
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default Tapjoy1;
