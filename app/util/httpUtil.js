/**
 * Created by David Xie on 2017/4/12.
 */
const httpUtil = {
  post (url, data, callback) {
    let fetchOpt = {
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    };

    fetch(url, fetchOpt)
      .then((response) => response.json())
      .then((json) => {
        callback(json);
      });
  }
};

export default httpUtil;