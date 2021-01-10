import _ from 'lodash';
import * as moment from 'moment';

const getMeetingLength = (event) => {
  if (event && event.start && event.end) {
    return moment
      .duration(moment(event.end).diff(moment(event.start)))
      .asMinutes();
  }
  return 0;
};

const howManyMeetings = (calArr) => _.size(calArr);
const averageMeetingLength = (calArr) => {
  return;
  _.chain(calArr).map(getMeetingLength).mean().value();
};

const numOfMeetingsPerMonth = (calArr) => {
  return _.chain(calArr)
    .map((e) => moment(e.end).month())
    .countBy(_.identity)
    .value();
};
const numOfMeetingsPerWeek = (calArr) => {
  return _.chain(calArr)
    .map((e) => moment(e.end).week()) // this may be weeks() or isoweek()
    .countBy(_.identity)
    .value();
};
const numOfMeetingsPerDayOfWeek = (calArr) => {
  return _.chain(calArr)
    .map((e) => moment(e.end).day())
    .countBy(_.identity)
    .value();
};

const IN_PERSON = 'in_person';
const ZOOM = 'ZOOM';
const bdZoom = (calArr) => {
  return _.chain(calArr)
    .map(
      (c) => _.includes(c.location, 'zoom') || _.includes(c.description, 'zoom')
    )
    .map((isZoom) => (isZoom ? ZOOM : IN_PERSON))
    .countBy(_.identity)
    .value();
};

const MEETING_LEN_CATEGORY_0_30 = '0_30';
const MEETING_LEN_CATEGORY_30_60 = '30-60';
const MEETING_LEN_CATEGORY_60 = '60+';
const MEETING_LEN_CATEGORY_X = 'X';

const bdMinutes = (calArr) => {
  return _.chain(calArr)
    .map(getMeetingLength)
    .map((meetingLen) => {
      if (meetingLen > 60) return MEETING_LEN_CATEGORY_60;
      if (meetingLen > 30) return MEETING_LEN_CATEGORY_30_60;
      if (meetingLen >= 0) return MEETING_LEN_CATEGORY_0_30;
      return MEETING_LEN_CATEGORY_X;
    })
    .countBy(_.identity)
    .value();
};
const titleRank = (calArr) => {
  return _.chain(calArr)
    .map((e) => e.summary)
    .countBy(_.identity)
    .toPairs()
    .filter((p) => p[1] > 1)
    .map((p) => {
      return {
        summary: p[0],
        count: p[1],
      };
    })
    .sortBy('count')
    .value();
};
export {
  howManyMeetings,
  averageMeetingLength,
  numOfMeetingsPerMonth,
  numOfMeetingsPerWeek,
  numOfMeetingsPerDayOfWeek,
  bdZoom,
  bdMinutes,
  titleRank,
};
