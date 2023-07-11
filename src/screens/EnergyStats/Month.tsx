/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import COLORS from '../../constants/COLORS';
import Remaining from '../../Components/Remaining';
import TotalUsage from '../../Components/TotalUsuage';
import Graph from '../../Components/Graph';
import BoxTwo from '../../Components/BoxTwo';
import PriceBox from '../../Components/PriceBox';
import ButtonSlider from '../../Components/ButtonSlider';
import {useSelector} from 'react-redux';

export default function Month() {
  const [showSlider, setShowSlider] = useState(true);
  const ScrollRef = useRef(null);
  useEffect(() => {
    setShowSlider(true);
    console.log("MONTHRasdsadsadasdasdasdasdasd",getMonthData)
  }, []);
  const {getMonthData, getBoxTwoDataForDashboard} = useSelector(
    (state: any) => state,
  );
  const [toggleState, setToggleState] = useState(false);

  const handleToggle = (value: any) => setToggleState(value);

  return (
    <>
      <View style={{flex: 1, backgroundColor: COLORS.CREAM}}>
        <ScrollView
          ref={ScrollRef}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onScrollBeginDrag={() => setShowSlider(false)}
          //   onScrollToTop={() => setShowSlider(true)}
          onScrollEndDrag={() => setShowSlider(true)}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 30,
              marginTop: 10,
            }}>
            <Remaining RemainingFill={50} KWH={400} />
            <TotalUsage data={getMonthData?.Totalusedkwhs} location={'Monthly'} />
          </View>

          <View style={{marginHorizontal: 20}}>
            {getMonthData.message != 'No monthlyusage data available' ? (
            <Graph dataOne={getMonthData} />
              
            ) : (
              <Text
                style={{
                  color: COLORS.BLACK,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  fontSize: 14,
                  marginVertical: 10,
                }}>
                No Graph Data Available
              </Text>
            )}
            <BoxTwo data={getBoxTwoDataForDashboard[0]} />
          </View>
          <View style={{marginBottom: 80}}>
            <PriceBox data={getBoxTwoDataForDashboard.data} />
          </View>
        </ScrollView>
      </View>
      {/* {showSlider && <ButtonSlider />} */}
      {/* <ButtonSlider onToggle={handleToggle}  /> */}
    </>
  );
}
