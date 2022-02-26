import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import DeviceInfo from 'react-native-device-info';
export const JSONtoForm = data => {
  var newData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    newData.append(key, value);
  }
  return newData;
};

export const FormatNumber = n =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const RemoveFormat = n => +n.toString().replace(/[,]+/g, '');

export const IsSuspended = async Token => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: `Bearer ${Token}`,
    },
  };
  let value = false;
  await fetch(`${Config.API_URL}/user/status`, requestOptions)
    .then(async response => response.json())
    .then(async res => {
      if (res.data && res.data[0] === 'Suspend') {
        value = true;
      }
    });
  return value;
};

export const IsVerified = async Token => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: `Bearer ${Token}`,
    },
  };
  let value = false;
  await fetch(`${Config.API_URL}/user`, requestOptions)
    .then(async response => response.json())
    .then(async res => {
      if (res.status === 403) {
        value = false;
      } else {
        await EncryptedStorage.setItem('User', JSON.stringify(res.data[0]));

        // await fetch(`${Config.API_URL}/user/current-balance`, requestOptions)
        //   .then(async (response) => response.json())
        //   .then(async (res) => {
        //     if (res.status && res.status.toLowerCase() === "success") {
        //       let coins = {
        //         Balance: res.data[0],
        //         date: GetDate(),
        //       };
        //       await EncryptedStorage.setItem("Coins", JSON.stringify(coins));
        //     }
        //   });
        await fetch(`${Config.API_URL}/user/current-balance`, requestOptions)
          .then(async response => response.json())
          .then(async res => {
            if (res.status && res.status.toLowerCase() === 'success') {
              let coins = {
                Balance: {'Gold Coins': res.data[0]['Gold Coins']},
                date: GetDate(),
              };
              await fetch(`${Config.API_URL}/credit/balance`, requestOptions)
                .then(async response => response.json())
                .then(res => {
                  coins.Balance = {
                    ...coins.Balance,
                    'Gold Credit': res.outstanding_balance,
                  };
                });
              await EncryptedStorage.setItem('Coins', JSON.stringify(coins));
            }
          });

        await fetch(`${Config.API_URL}/notifications/list`, requestOptions)
          .then(async response => response.json())
          .then(async res => {
            if (res.status && res.status.toLowerCase() === 'success') {
              await EncryptedStorage.setItem(
                'Activity',
                JSON.stringify([res?.data[0], res?.data[0]?.length]),
              );
            }
          });
        value = true;
      }
    })
    .catch(e => {
      value = false;
    });
  return value;
};

export const GetDate = (e = null) => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  var d = e ? new Date(e) : new Date();
  return `${d.getDate()} ${monthNames[d.getMonth()]}, ${d.getFullYear()}`;
};

export const GetMaxCoins = e => {
  return {id: 0, type: 'Gold Coins', coins: FormatNumber(+e['Gold Coins'])};
  // const GetID = () => {
  //   switch (type) {
  //     default:
  //       return 0;
  //     case "Diamond Coins":
  //       return 1;
  //   }
  // };
  // if (!e) return {};
  // const data = Object.entries(e)
  //   .sort(([, a], [, b]) => b - a)
  //   .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  // const type = Object.keys(data)[0];
  // const id = GetID(type);
  // return { id, type, coins: +data[type] };
};

export const GetCoinType = e => {
  switch (e) {
    default:
      return 'gold';
    case 1:
      return 'gold credit';
    // case 1:
    //   return "diamond";
  }
};

export const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export const GetCoins = (Coins, e) => {
  switch (e) {
    default:
      return ['Gold coins', FormatNumber(+Coins.Balance['Gold Coins'])];
    case 1:
      return ['Gold Credit', FormatNumber(+Coins.Balance['Gold Credit'])];
    // case 1:
    //   return ["Diamond coins", +Coins.Balance["Diamond Coins"]];
  }
};

export const GetPictureBody = async (name, data) => {
  var form = new FormData();
  form.append(name, `data:${data.mime};base64, ${data.data}`);
  return form;
};
export const GetUserDeviceDetails = async () => {
  const device = await DeviceInfo.getDeviceName();
  return {device_name: device, device_code: DeviceInfo.getUniqueId()};
};

export const GetDeviceCode = () => DeviceInfo.getUniqueId();

export const HexToRgba = hex => {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c?.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return (
      'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)'
    );
  }
  throw new Error('Bad Hex');
};
