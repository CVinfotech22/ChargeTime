import types from './constants';

export const getLocationID = data => {
  return {type: types.GET_LOCATION_ID, payload: data};
};
export const setPackageStatus = data => {
  return {type: types.GET_PACKAGE_STATUS, payload: data};
};
export const setUserID = data => {
  return {type: types.GET_USER_ID, payload: data};
};
export const setEmailData = data => {
  return {type: types.GET_EMAIL_DATA, payload: data};
};
export const setKwhData = data => {
  return {type: types.GET_KWH_DATA, payload: data};
};
export const setUserRegisterData = data => {
  return {type: types.GET_USER_DATA, payload: data};
};
export const userProfileData = data => {
  return {type: types.GET_PROFILE_DATA, payload: data};
};

export const setBasePackage = data => {
  return {type: types.GET_BASE_PACKAGE, payload: data};
};

export const getCompleteData = data => {
  return {type: types.GET_COMPLETE_DATA, payload: data};
};
export const getPlanPurchage = data => {
  return {type: types.GET_PLAN_PURCHAGE, payload: data};
};

export const setGraphData = data => {
  return {type: types.GET_GRAPH_DATA, payload: data};
};
export const setRemainingData = data => {
  return {type: types.GET_REMAINING_DATA, payload: data};
};
// export const getRemainingData = data => {
//   return {type: types.REMAINING_DATA_GET, payload: data};
// };

// week action start
export const setWeekTotalData = data => {
  return {type: types.GET_WEEK_KWH, payload: data};
};
export const userSubsData = data => {
  return {type: types.USER_SUBS_DATA, payload: data};
};
export const setWeekGraphData = data => {
  return {type: types.GET_WEEK_GRAPH_DATA, payload: data};
};
export const setMonthGraphData = data => {
  return {type: types.GET_MONTH_DATA, payload: data};
};
export const setQuarterGraphData = data => {
  return {type: types.GET_QUARTER_DATA, payload: data};
};
export const setYearGraphData = data => {
  return {type: types.GET_YEAR_DATA, payload: data};
};
export const setIsAuthorized = data => {
  return {type: types.SET_IS_AUTHORIZED, payload: data};
};

// week action end
//dashboard boxtwo and price details data start

export const setBoxTwoDataForDashboard = data => {
  return {type: types.GET_BOX_TWO_DATA_DASHBOARD, payload: data};
};
export const setPriceAndDetailsData = data => {
  return {type: types.GET_PRICE_AND_DETAILS_DATA, payload: data};
};
export const setChargerStatus = data => {
  return {type: types.CHARGER_STATUS, payload: data};
};
export const setDataForPayment = data => {
  return {type: types.DATA_FOR_PAYMENT, payload: data};
};
export const setPurchaseData = data => {
  return {type: types.GET_PURCHASE_DATA, payload: data};
};

export const setDeviceId = data => {
  return {type: types.GET_DEVICE_ID, payload: data};
};

//store the default card details for make payment screen
export const setCardDetails = data => {
  return {type: types.GET_CARD_DETAILS, payload: data};
};
// store the details of current plan details for subscription screen
export const getCurrentPlan = data => {
  return {type: types.GET_CURRENT_PLAN, payload: data};
};
export const setPlanStatus = data => {
  return {type: types.GET_PLAN_STATUS, payload: data};
};
export const setOverUsage = data => {
  return {type: types.GET_OVERUSAGE, payload: data};
};
export const setSubscriptionStatus = data => {
  return {type: types.GET_SUBSCRIPTIONSTATUS, payload: data};
};
export const setMaintainence = data => {
  return {type: types.MAINTAINENCE, payload: data};
};
export const setOverModelView = data => {
  return {type: types.OVER_MODEL_VIEW, payload: data};
};
export const setOverusageCount = data => {
  return {type: types.OVERUSAGE_COUNT, payload: data};
};
export const setLogout = () => {
  return {type: types.LOG_OUT};
};
export const setMyLocation = data => {
  return {type: types.LOCATION_ID,payload: data};
};
export const setPuchaseAllPlans = data => {
  return {type: types.SET_PUCHASE_ALL_PLANS,payload: data};
};
export const setSubcriptionCancelStatus = data => {
  return {type: types.SUBSCRIPTION_CANCEL_STATUS,payload: data};
};



export const resetApp = () => {
  return {
    type: types.RESET_APP,
  };

};
