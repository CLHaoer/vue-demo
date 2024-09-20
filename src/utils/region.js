import { showToast } from "vant";
import { ref } from "vue";

const regionInfo = ref({
  address: '',
  city: '',
  latitude: 30.581783,
  longitude: 104,
  region: '510000'
})

const isWx = () => {
  console.log(wx);
  // wx.getLocation({
  //   type: 'gcj02',
  //   success (res) {
  //     console.log('111',res);
  //     const latitude = res.latitude
  //     const longitude = res.longitude
  //     const speed = res.speed
  //     const accuracy = res.accuracy
  //   }
  // })
  wx.openLocation({
    latitude: 30.659462,
    longitude: 104.065735
  })
}

const other = () => {
  const geolocation = new AMap.Geolocation({
    enableHighAccuracy: true,//是否使用高精度定位，默认:true
    timeout: 10000,          //超过10秒后停止定位，默认：5s
    convert: true,
    // noIpLocate: 2,
    // useNative: true,
    getCityWhenFail: true,
    GeoLocationFirst: true,
    // extensions:'all',
    needAddress: true
  });
  geolocation.getCityInfo((status, result) => {
    if (status == 'complete') {
      onComplete(result)
    } else {
      onError(result)
    }
  })
  geolocation.getCurrentPosition(function (status, result) {
    if (status == 'complete') {
      onComplete(result)
    } else {
      onError(result)
    }
  });
  function onComplete (res) {
    console.log('success', res);
    regionInfo.value = {
      address: res?.formattedAddress || (res?.province || '') + (res?.city || ''),
      city: res?.addressComponent?.city || res?.city || '',
      latitude: res?.position?.lat || res?.center?.[1] || 30.581783,
      longitude: res?.position?.lng || res.center?.[0] || 104,
      region: res?.addressComponent?.adcode || res?.adcode || 510000
    }
  }
  function onError (res) {
    console.log('error', res);
    showToast({
      type: 'html',
      duration: 2000,
      message: '获取当前位置失败'
    });
  }
  const watchId = geolocation.watchPosition()
}
// 运行环境
const UA = {
  WECHAT: isWx, // 微信
  OTHERS: other // 其他
}

const getRegionInfo = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  if (userAgent.match(/MicroMessenger/i)?.[0] == 'micromessenger') {
    return UA.WECHAT()
  } else {
    return UA.OTHERS()
  }

}

export {
  regionInfo,
  getRegionInfo
}