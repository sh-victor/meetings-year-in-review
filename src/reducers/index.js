import { combineReducers } from 'redux';
import data1 from '../__mock__/jenniferli0823_ics';

export const ACTION_CALENDAR_SUMMARY_FULFILLED = 'calendar/summary-fulfilled';
export const ACTION_CALENDAR_SUMMARY_STARTED = 'calendar/summary-started';
export const ACTION_CALENDAR_SUMMARY_FAILED = 'calendar/summary-failed';
export const STATUS_INIT = 'calendar/status/init';
export const STATUS_READY = 'calendar/status/ready';
export const STATUS_PENDING = 'calendar/status/pending';
export const STATUS_ERROR = 'calendar/status/error';

const initialState = {
  status: STATUS_INIT,
  id: data1.id,
  data: data1.data,
  error: null,
};

function calendarDataReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_CALENDAR_SUMMARY_STARTED: {
      return {
        ...state,
        status: STATUS_PENDING,
        id: null,
        data: {},
        error: null,
      };
    }
    case ACTION_CALENDAR_SUMMARY_FULFILLED: {
      const { id, data } = action.payload;
      return {
        ...state,
        status: STATUS_READY,
        id,
        data,
      };
    }
    case ACTION_CALENDAR_SUMMARY_FAILED: {
      return {
        ...state,
        status: STATUS_ERROR,
        error: action.payload,
        id: null,
        data: {},
      };
    }

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  calendarData: calendarDataReducer,
});

export default rootReducer;
