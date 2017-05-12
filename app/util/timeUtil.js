/**
 * Created by David Xie on 2017/5/9.
 */
export default function computeTime(time) { // time format 2016-11-11T18:56:33.904Z
  let datePart = time.substring(0, 10).replace(/\-/g, '/');
  let timePart = time.substring(11, 19);
  //console.log(datePart + ' ' + timePart);
  let oldTime = (new Date(datePart + ' ' + timePart)).getTime();
  let currTime = new Date().getTime();
  let diffValue = currTime - oldTime;

  let days = Math.floor(diffValue/(24*3600*1000));
  if(days === 0){
    //计算相差小时数
    let leave1 = diffValue%(24*3600*1000); //计算天数后剩余的毫秒数
    let hours = Math.floor(leave1/(3600*1000));
    if(hours === 0) {
      //计算相差分钟数
      let leave2 = leave1 % (3600 * 1000);  //计算小时数后剩余的毫秒数
      let minutes = Math.floor(leave2 / (60 * 1000));
      if(minutes === 0) {
        //计算相差秒数
        let leave3 = leave2 % (60 * 1000);   //计算分钟数后剩余的毫秒数
        let seconds = Math.round(leave3 / 1000);
        return seconds+'秒前';
      }
      return minutes+'分钟前';
    }
    return hours+'小时前';
  }

  return days+'天前';
}