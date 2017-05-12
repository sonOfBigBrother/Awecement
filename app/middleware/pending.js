let sequenceList = {};
const minPendingTime = 500;

export default function () {
  return next => action => {
    const { meta={}} = action;
    const { sequence={}, pending } = meta;
    if(pending === true){
      if (sequence.type == 'start') {
        sequenceList[sequence.id] = {
          start: new Date().getTime()
        };
        return next(action);
      }

      if (sequence.type == 'next' && sequenceList[sequence.id]) {
        let start = sequenceList[sequence.id].start;
        let end = new Date().getTime();
        let leftTime = minPendingTime - (end - start);
        delete sequenceList[sequence.id];
        if (leftTime < 0) {
          return next(action);
        }
        else {
          return setTimeout(()=> {
            next(action);
          }, leftTime);
        }
      }
    }
    return next(action);
  };
}