import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import COLORS from '../constants/COLORS';
import LinearGradient from 'react-native-linear-gradient';
import {DIMENSIONS} from '../constants/DIMENSIONS';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {API} from '../api/API';
import {setOverUsage, setRemainingData} from '../redux/action';
import AnimatedLottieView from 'lottie-react-native';
import {useFocusEffect} from '@react-navigation/native';
import {navigationRef} from '../../App';
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';

const Remaining = ({...props}) => {
  const dispatch = useDispatch();
  const [totalAllowed, setTotalAllowed] = useState(0);
  const {getRemainingData, getUserID, overusage} = useSelector(
    (state: any) => state,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [x, setX] = useState<number>(0);
  setUpdateIntervalForType(SensorTypes.gyroscope, 200); // defaults to 100ms
  useFocusEffect(
    // overusage && setModalVisible(true);
    useCallback(() => {
      remainigUsuageData();
    }, []),
  );

  const remainigUsuageData = () => {
    let remaingData;

    axios
      .get(`${API}/remainingusage/${getUserID}`)
      .then(res => {
        setTotalAllowed(res.data?.total_kwhunit);
        if (res.data?.kwh_unit_remaining > 0) {
          remaingData = res.data?.kwh_unit_remaining;
          dispatch(setOverUsage(false));
        } else {
          remaingData = res.data?.kwh_unit_overusage;
          dispatch(setOverUsage(true));
          setModalVisible(true);
        }
        console.log('first', res.data);
        dispatch(setRemainingData(remaingData));
      })
      .catch(err => {
        console.log(err);
      });
  };
  const nav = () => {
    setModalVisible(!modalVisible);
    navigationRef.navigate('HomeOne');
    // console.log(navigationRef.current?.getState().key)
  };
  const OverusageModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Overusage</Text>
            <AnimatedLottieView
              source={{
                uri: 'https://assets6.lottiefiles.com/private_files/lf30_mf7q9oho.json',
              }} // Replace with your animation file
              autoPlay
              loop
              style={{width: 50, height: 50}}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: COLORS.BLACK,
              }}>
              You have utilized your package, please purchase a new package.
            </Text>
            <View style={styles.button_one}>
              <Pressable
                style={{
                  borderRadius: 20,
                  padding: 10,
                }}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={nav}>
                <Text style={styles.textStyle}>Purchase Plan</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
    const subscription = gyroscope.subscribe(({x, timestamp}) => {
      const normalizedX = Math.max(Math.min(x, 1), -1); // Normalize the gyroscope data

      // if (timestamp > 5000) {
      console.log('normalizedX', normalizedX);
      animatedValue.setValue(normalizedX);
      // }
    });

    return () => subscription.unsubscribe();
  }, [animatedValue]);

  const startAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true, // Add this line for better performance
    }).start();
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200], // Adjust the range to determine the movement distance
    // extrapolate: 'clamp', // Prevent values beyond the range from causing color patches
  });

  const rotate = animatedValue.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-45deg', `0deg`, `45deg`], // Adjust the range to determine the rotation angle
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    // easing: () => 10
  });

  return (
    <>
      <View
        style={{
          //   backgroundColor: '#F5F5F5',
          // width: props?.data !== "energy" ? DIMENSIONS.SCREEN_WIDTH * 0.4 : DIMENSIONS.SCREEN_WIDTH * 0.9,
          // height: DIMENSIONS.SCREEN_WIDTH * 0.35,
          // marginVertical: 20,
          // flexDirection: 'column-reverse',
          // //  shadowColor: '#000000',
          // //   shadowOffset: {
          // //     width: 0,
          // //     height: 6,
          // //   },
          // //   shadowOpacity: 0.2,
          // //   shadowRadius: 5.62,
          // //  elevation: 8,
          // shadowColor: '#000000',
          // shadowOffset: { width: 0, height: 6 },
          // shadowOpacity: 0.2,
          // shadowRadius: 2,
          // elevation: 5,
          // borderWidth: 0,
          // borderRadius: 10,
          // overflow: 'hidden',
          backgroundColor: '#F5F5F5',
          width:
            props?.data !== 'energy'
              ? DIMENSIONS.SCREEN_WIDTH * 0.4
              : DIMENSIONS.SCREEN_WIDTH * 0.9,
          height: DIMENSIONS.SCREEN_WIDTH * 0.35,
          marginVertical: DIMENSIONS.SCREEN_HEIGHT * 0.02,
          flexDirection: 'column-reverse',
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.2,
          shadowRadius: 5.62,
          elevation: 8,
          borderWidth: 0,
          borderRadius: 10,
          overflow: 'hidden',
          // transform: [animatedValue ? {rotate}: null],
        }}>
        <Text
          style={{
            padding: 5,
            fontWeight: '600',
            fontSize: 12,
            lineHeight: 14,
            textTransform: 'capitalize',
            color: COLORS.BLACK,
            position: 'absolute',
            top: 10,
            left: 10,
          }}>
          {overusage ? 'Overusage' : 'Remaining Usage'}
        </Text>
        <View
          style={{
            top: '40%',
            alignItems: 'center',
            position: 'absolute',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontWeight: '800',
              fontSize: 16,
              lineHeight: 20,
              color: COLORS.BLACK,
            }}>
            {' '}
            {getRemainingData ? getRemainingData : 0}
            {' kWh'}
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 10,
              lineHeight: 12,
              color: 'rgba(61, 61, 61, 0.6)',
            }}>
            Units Left To Be Used
          </Text>
        </View>
        {overusage ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              flexDirection: 'column-reverse',
              backgroundColor: COLORS.RED,
              zIndex: -1,
            }}
          />
        ) : (
          <Animated.View
            style={{
              transform: [animatedValue ? {rotate} : null],
              zIndex: -1,
              flexDirection: 'column-reverse',
            }}>
            <LinearGradient
              colors={['rgba(177, 211, 79, 0.7) 0%,', 'rgb(177, 211, 79) 0%,']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={{
                width: '100%',
                borderRadius: 10,
                // height:  getRemainingData < totalAllowed ?`${getRemainingData / totalAllowed}%` : '1%',
                height: `${(getRemainingData / totalAllowed) * 100}%`,
              }}
            />
          </Animated.View>
        )}
        {/* <View
        style={{
          flexDirection: 'row',
        //   flex: 0.1,
          backgroundColor: COLORS.GREEN,
        }}>
        {getRemainingData > 10 && getRemainingData < 90 && (
          <View
            style={{
              width: '100%',
              height: '1%',
            }}>
            <LinearGradient
              colors={['#B1D34F', '#50AC3D']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                width: '100%',
                height: '1%',
              }}
            />
          </View>
        )}
        {getRemainingData > 10 && getRemainingData < 90 && (
          <View
            style={{
              width: '100%',
              height: '10%',
            }}>
            <LinearGradient
              colors={['#B1D34F', '#50AC3D']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={{
                width: '100%',
                height: '10%',
              }}
            />
          </View>
        )}
      </View> */}
      </View>
      <OverusageModal />
    </>
  );
};

export default Remaining;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: DIMENSIONS.SCREEN_WIDTH * 0.8,
  },
  button_one: {
    // marginLeft: 80,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: COLORS.GREEN,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 24,
    color: '#000000',
  },
});
