/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  useColorScheme,
  Platform,
  ToastAndroid,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import COLORS from '../../constants/COLORS';
import {API} from '../../api/API';
import axios from 'axios';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {PLATFORM_IOS} from '../../constants/DIMENSIONS';
import ActivityLoader from '../../Components/ActivityLoader';
import AnimatedLottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';

//   const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('screen').width);

export default function VerifyEmail(props) {
  const {navigation, route} = props;
  const {email, user_id} = route?.params;
  const [emailCheck, setEmailCheck] = useState(false);
  const [tempID, setTempID] = useState('');
  const [stopTimer, setStopTimer] = useState(false);
  const [statusCheck, setStatusCheck] = useState(false);
  const [forLoading, setForLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
  const [timerActive, setTimerActive] = useState(true);
  const [disablebutton, setdisableButton] = useState(false);
  const [otp, setOtp] = useState('');
  const inputRefs = useRef([]);

  const theme = useColorScheme();
  const isDark = theme === 'dark';

  const {userRegisterData} = useSelector(state => state);
  const verifyOTP = async () => {

    if (otp.length == 0) {
      PLATFORM_IOS
        ? Toast.show({
            type: 'error',
            text1: 'Enter Authentication Key',
            // position: 'bottom',
          })
        : ToastAndroid.show('Enter Authentication Key', ToastAndroid.SHORT);
    } else if (otp.length < 6) {
      PLATFORM_IOS
        ? Toast.show({
            type: 'error',
            text1: 'Enter Authentication Key',
            // position: 'bottom',
          })
        : ToastAndroid.show('Enter Authentication Key', ToastAndroid.SHORT);
    } else if (email == '') {
      PLATFORM_IOS
        ? Toast.show({
            type: 'error',
            text1: 'Enter Email ID ',
            // position: 'bottom',
          })
        : ToastAndroid.show('Enter Email ID', ToastAndroid.SHORT);
    } else {
      setForLoading(true);
      try {
        let payload = new FormData();
        payload.append('email', email);
        payload.append('otp', otp);
        console.log('Payload', payload);
        const res = await axios({
          url: `${API}/verifyotp`,
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: payload,
        });
        if (res.data) {
          if (res.data.message !== 'Invalid OTP or OTP expired') {
            PLATFORM_IOS
              ? Toast.show({
                  type: 'success',
                  text1: 'Authentication Successful.',
                })
              : ToastAndroid.show(
                  'Authentication Successful.',
                  ToastAndroid.SHORT,
                );
            navigation.navigate('CompleteProfile', {
              email: email,
              user_id: user_id,
            });
            setForLoading(false);
          } else {
            PLATFORM_IOS
              ? Toast.show({
                  type: 'error',
                  text1: 'Authentication Key Invalid/expired',
                  // position: 'bottom',
                })
              : ToastAndroid.show(
                  'Authentication Key Invalid/expired',
                  ToastAndroid.SHORT,
                );

            setForLoading(false);
          }
        } else {
          PLATFORM_IOS
            ? Toast.show({
                type: 'error',
                text1: 'Please fill required details',
                // position: 'bottom',
              })
            : ToastAndroid.show(
                'Please fill required details',
                ToastAndroid.SHORT,
              );
        }
        setForLoading(false);
      } catch (error) {
        console.error('sdsfsfs11111', error);
        setForLoading(false);
      }
    }
  };
  const resendOTp = async () => {
    setRemainingTime(60);
    setTimerActive(true);
    try {
      await fetch(`${API}/resendOtp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email, name: userRegisterData.name}),
      })
        .then(res => res.json())
        .then(data => {
          if (data.message === 'New OTP sent successfully') {
            setStatusCheck(false);
            PLATFORM_IOS
              ? Toast.show({
                  type: 'success',
                  text1: 'New Authentication Key Sent Successfully',
                })
              : ToastAndroid.show(
                  'New Authentication Key Sent Successfully',
                  ToastAndroid.SHORT,
                );
          } else {
            PLATFORM_IOS
              ? Toast.show({
                  type: 'error',
                  text1: 'Authentication Key not send',
                  // position: 'bottom',
                })
              : ToastAndroid.show(
                  'Authentication Key not send',
                  ToastAndroid.SHORT,
                );
          }
        });
    } catch (error) {
      console.error(error);
      // Handle network errors or other exceptions
    }
  };

  const resendLink = async () => {
    setdisableButton(true);
    setRemainingTime(60);
    setTimerActive(true);
    try {
      let payload = new FormData();
      payload.append('pwa_email', email);
      const res = await axios(`${API}/resetemail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: payload,
      });

      if (res.data) {
        if (res.data.message == 'Email sent successfully') {
          setEmailCheck(true);
          setStatusCheck(true);
          setTempID(res.data.id);
          PLATFORM_IOS
            ? Toast.show({
                type: 'success',
                text1: 'Email sent',
              })
            : ToastAndroid.show('Email sent', ToastAndroid.SHORT);
        } else {
          PLATFORM_IOS
            ? Toast.show({
                type: 'error',
                text1: 'Invalid Email',
                // position: 'bottom',
              })
            : ToastAndroid.show('Invalid Email', ToastAndroid.SHORT);
        }
      }
    } catch (error) {
      console.error(error);
      // Handle network errors or other exceptions
    }
  };

  useEffect(() => {
    let stopTimer;

    const sendToAnotherPage = async () => {
      try {
        const response = await axios(`${API}/emailverify/${tempID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.data.status.email_verified === '1') {
          navigation.navigate('CompleteProfile', {
            email: email,
            user_id: user_id,
          });
          clearInterval(stopTimer);
        }
      } catch (error) {
        console.error(error);
        // Handle network errors or other exceptions
      }
    };

    if (emailCheck) {
      stopTimer = setInterval(() => {
        sendToAnotherPage();
      }, 2000);
    }

    return () => {
      clearInterval(stopTimer);
    };
  }, [emailCheck, tempID]);
  useEffect(() => {
    if (timerActive && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (remainingTime === 0) {
      setdisableButton(false);
      setTimerActive(false);
      //setStatusCheck(false);
    }
  }, [remainingTime, timerActive]);

  const handleInputChange = (text, index) => {
    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    setOtp(prevOtp => {
      let newOtp = prevOtp.split('');
      newOtp[index] = text;
      return newOtp.join('');
    });
  };

  const handleBackspace = index => {
    if (index > 0) {
      inputRefs.current[index - 1].focus();
    }

    setOtp(prevOtp => {
      let newOtp = prevOtp.split('');
      newOtp[index] = '';
      return newOtp.join('');
    });
  };
  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    // setOtp(text);
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView behavior="position">
          {forLoading ? <ActivityLoader /> : ''}
          <View style={styles.mainDiv_container}>
            <View style={styles.mainDiv_verify_email}>
              <Text style={styles.VerifyEmail_text}>Verify your email</Text>
              <Text style={styles.confirm_text}>
                Confirm your email address
              </Text>
              <Text style={styles.sendOtp_text}>
                {statusCheck
                  ? 'We have sent a verification email to:'
                  : 'We have sent a confirmation Code email to:'}
              </Text>
              <TextInput
                style={[
                  styles.sendOtp_email,
                  {color: isDark ? COLORS.BLACK : COLORS.BLACK},
                ]}
                placeholder="Eg. john2xyz.com"
                placeholderTextColor={COLORS.BLACK}
                value={userRegisterData.email}
                editable={false}
              />
              <Text style={styles.check_yourinbox}>
                {statusCheck
                  ? `Check your inbox and click on the button to confirm your account.
`
                  : 'Check your inbox and input the Code here to confirm your account.'}
              </Text>
            </View>
            <View style={styles.otp_yet}>
              <Text
                style={
                  statusCheck
                    ? {color: COLORS.BLACK, fontSize: 14, fontWeight: '400'}
                    : {color: COLORS.BLACK, fontSize: 14, fontWeight: '600'}
                }>
                {statusCheck
                  ? 'Verify with Code instead.'
                  : "Haven't received the Code yet?"}
              </Text>
              <TouchableOpacity
                style={styles.resend_OTP_btn}
                disabled={remainingTime > 0 ? true : false}
                onPress={resendOTp}>
                <Text style={styles.resend_otp_text}>
                  {statusCheck ? 'Send Code' : 'Resend Code'}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: mobileW,
                //marginLeft:10,
                marginRight: 10,
              }}>
              <Image
                style={{width: mobileW, height: 3}}
                resizeMode="stretch"
                source={require('../../../assets/images/dotted.png')}
              />

              <Text
                style={{
                  alignSelf: 'center',
                  position: 'relative',
                  right: mobileW / 1.8,
                  backgroundColor: COLORS.CREAM,
                  padding: 10,
                  color: COLORS.BLACK,
                  fontWeight: 400,
                  lineHeight: 26,
                  fontSize: 14,
                  
                }}>
                OR
              </Text>
            </View>
            <View style={styles.otp_yet}>
              <Text
                style={
                  statusCheck
                    ? {
                        color: COLORS.BLACK,
                        fontSize: 14,
                        fontWeight: '600',
                        width: mobileW * 0.6,
                      }
                    : {color: COLORS.BLACK, fontSize: 14, fontWeight: '400'}
                }>
                {statusCheck
                  ? 'Haven’t received verification email yet?'
                  : 'Receive verification email instead.'}
              </Text>
              <TouchableOpacity
                disabled={disablebutton}
                style={styles.resend_OTP_btn}
                onPress={resendLink}>
                <Text style={styles.resend_otp_text}>
                  {statusCheck ? 'Resend Link' : 'Send Link'}
                </Text>
              </TouchableOpacity>
            </View>

            {statusCheck ? (
              <View style={{paddingTop: 20}}>
                <AnimatedLottieView
                  source={{
                    uri: 'https://assets4.lottiefiles.com/packages/lf20_qliQPUmnXJ.json',
                  }} // Replace with your animation file
                  autoPlay
                  loop
                  style={{width: 100, height: 100, alignSelf: 'center'}}
                />
                <View style={{marginVertical: 10, alignSelf: 'center'}}>
                  {remainingTime > 0 ? (
                    <Text>Resend Link in {remainingTime} seconds</Text>
                  ) : (
                    <View>
                      <Text>Previous Email Link Expired</Text>
                      <Text>Click Resend Link Button</Text>
                    </View>
                  )}
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: '500',
                    fontSize: 14,
                    color: COLORS.BLACK,
                  }}>
                  Waiting For Account Verification
                </Text>
              </View>
            ) : (
              <View style={styles.mainDiv_verify_email}>
                <Text style={styles.havenot_received_email}>
                  Enter the Code Below
                </Text>
                <View style={styles.otp_box}>
                  {[...Array(6)].map((_, index) => (
                    <View style={styles.otp_box}>
                      <TextInput
                        key={index}
                        ref={ref => (inputRefs.current[index] = ref)}
                        keyboardType="numeric"
                        maxLength={1}
                        style={styles.textInput_otp}
                        // value={firstDigit}
                        value={otp[index]}
                        onChangeText={text => handleInputChange(text, index)}
                        onKeyPress={({nativeEvent}) => {
                          if (nativeEvent.key === 'Backspace') {
                            handleBackspace(index);
                          }
                        }}
                        // onPressIn={({nativeEvent}) => {
                        //   fetchCopiedText();
                        // }}
                      />
                    </View>
                  ))}
                  {/* <TextInput
                    ref={otp1}
                    onChangeText={value => {
                      if (value != '') {
                        setFirstDigit(value);
                        otp2.current.focus();
                      }
                      // else setFirstDigit('');
                    }}
                    keyboardType="numeric"
                    maxLength={1}
                    style={styles.textInput_otp}
                    value={firstDigit}
                    onKeyPress={({nativeEvent}) => {
                      if (
                        nativeEvent.key == 'Backspace' &&
                        setFirstDigit != ' '
                      ) {
                        setFirstDigit('');
                      }
                    }}
                  />
                  <TextInput
                    ref={otp2}
                    onChangeText={value => {
                      if (value != '') {
                        setsecondDigit(value);
                        otp3.current.focus();
                      }
                    }}
                    keyboardType="numeric"
                    maxLength={1}
                    style={styles.textInput_otp}
                    value={secondDigit}
                    onKeyPress={({nativeEvent}) => {
                      if (
                        nativeEvent.key == 'Backspace' &&
                        setsecondDigit != ' '
                      ) {
                        setsecondDigit('');
                        otp1.current.focus();
                      }
                    }}
                  />
                  <TextInput
                    keyboardType="numeric"
                    ref={otp3}
                    onChangeText={value => {
                      if (value != '') {
                        setthirdDigit(value);
                        otp4.current.focus();
                      }
                    }}
                    maxLength={1}
                    style={styles.textInput_otp}
                    value={thirdDigit}
                    onKeyPress={({nativeEvent}) => {
                      if (
                        nativeEvent.key == 'Backspace' &&
                        setthirdDigit != ' '
                      ) {
                        setthirdDigit('');
                        otp2.current.focus();
                      }
                    }}
                  />
                  <TextInput
                    keyboardType="numeric"
                    ref={otp4}
                    onChangeText={value => {
                      if (value != '') {
                        setforthDigit(value);
                        otp5.current.focus();
                      }
                    }}
                    maxLength={1}
                    style={styles.textInput_otp}
                    value={forthDigit}
                    onKeyPress={({nativeEvent}) => {
                      if (
                        nativeEvent.key == 'Backspace' &&
                        setforthDigit != ''
                      ) {
                        setforthDigit('');
                        otp3.current.focus();
                      }
                    }}
                  />
                  <TextInput
                    keyboardType="numeric"
                    ref={otp5}
                    onChangeText={value => {
                      if (value != '') {
                        setfifthDigit(value);
                        otp6.current.focus();
                      }
                    }}
                    maxLength={1}
                    style={styles.textInput_otp}
                    value={fifthDigit}
                    onKeyPress={({nativeEvent}) => {
                      if (
                        nativeEvent.key == 'Backspace' &&
                        setfifthDigit != ' '
                      ) {
                        setfifthDigit('');
                        otp4.current.focus();
                      }
                    }}
                  />
                  <TextInput
                    keyboardType="numeric"
                    ref={otp6}
                    onChangeText={value => {
                      if (value != '') {
                        setSixDigit(value);
                      }
                    }}
                    maxLength={1}
                    style={styles.textInput_otp}
                    value={sixDigit}
                    onKeyPress={({nativeEvent}) => {
                      if (
                        nativeEvent.key == 'Backspace' &&
                        setSixDigit != ' '
                      ) {
                        setSixDigit('');
                        otp5.current.focus();
                      }
                    }}
                    onSubmitEditing={verifyOTP}
                  /> */}
                </View>
                <View style={{marginVertical: 10, alignSelf: 'center'}}>
                  {remainingTime > 0 ? (
                    <Text>Resend Code in {remainingTime} seconds</Text>
                  ) : (
                    <View>
                      <Text>Previous Code Expired </Text>
                      <Text>Click Resend Code Button</Text>
                    </View>
                  )}
                </View>
              </View>
            )}
            {!statusCheck && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',

                  // paddingVertical:20
                }}>
                <TouchableOpacity
                  onPress={verifyOTP}
                  style={{
                    marginTop: 20,
                    backgroundColor: '#B1D34F',
                    alignItems: 'center',
                    padding: 13,
                    borderRadius: 10,
                    width: '100%',
                    ...Platform.select({
                      ios: {
                        shadowColor: '#000000',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                      },
                      android: {
                        elevation: 4,
                      },
                    }),
                  }}>
                  <Text
                    style={{
                      color: COLORS.BLACK,
                      fontSize: 14,
                      fontWeight: '700',
                    }}>
                    VERIFY EMAIL
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.mainDiv_VErify_account}>
              <Text style={styles.wrong_email_text}>Entered wrong email? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.make_changes}>
                  Go back to make changes.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainDiv_container: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  signup_img: {
    width: mobileW,
  },
  mainDiv_verify_email: {
    marginTop: 20,
    paddingBottom: 15,
    borderRadius: 15,
  },
  verification_email: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.BLACK,
  },
  otp_yet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  VerifyEmail_text: {
    fontWeight: 'bold',
    fontSize: 24,
    color: COLORS.BLACK,
    paddingBottom: 20,
    lineHeight: 29,
  },
  confirm_text: {
    fontWeight: '600',
    fontSize: 14,
    color: COLORS.BLACK,
  },

  sendOtp_text: {
    fontWeight: 400,
    color: COLORS.BLACK,
    paddingBottom: 25,
  },
  sendOtp_email: {
    backgroundColor: COLORS.BROWN,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: Platform.OS === 'ios' ? 50 : 50,
  },
  check_yourinbox: {
    fontWeight: 400,
    color: COLORS.BLACK,
    paddingTop: 20,
  },

  havenot_received_email: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  resend_OTP_btn: {
    paddingVertical: 9,
    borderColor: COLORS.BLACK,
    borderWidth: 1,
    width: mobileW * 0.3,
    borderRadius: 50,
    marginTop: Platform.OS === 'ios' ? 0 : 5,
  },
  resend_otp_text: {
    color: COLORS.BLACK,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 15,
  },
  enter_Otp: {
    marginTop: 20,
  },
  otp_box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingTop: 15,
  },
  textInput_otp: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: COLORS.BROWN,
    textAlign: 'center',
    fontSize: 14,
    // paddingHorizontal: 20,
  },
  mainDiv_VErify_account: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  wrong_email_text: {
    fontSize: 14,
    fontWeight: '400',
  },
  make_changes: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
});
