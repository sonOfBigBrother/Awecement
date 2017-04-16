/**
 * Created by David Xie on 2017/4/12.
 */
import {Dimensions} from 'react-native';

// device width/height
//const deviceWidthDp = Dimensions.get('window').width;
const deviceHeightDp = Dimensions.get('window').height;
// design width/height
const uiHeightPx = 640;

export default function px2dp(uiElementPx) {
  return uiElementPx *  deviceHeightDp / uiHeightPx;
}