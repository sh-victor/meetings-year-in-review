import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as moment from 'moment';
import { Bar } from '@reactchartjs/react-chart.js';
import styled from 'styled-components';

import './MeetingInEachMonth.css';
import {
  FullPageSlideContainer,
  Content,
  Header1 as Title,
  Stat as StatBase,
  ChartContainer,
} from '../components/SlideComponents';

const getBestMonth = (monthObj) => {
  if (!monthObj) return null;
  var best = [];
  for (const [key, value] of Object.entries(monthObj)) {
    if (best.length == 0 || value > best[0].value) {
      best = [{ key, value }];
    } else if (value == best[0].value) {
      best.push({ key, value });
    }
  }
  return best;
};

const mapStateToProps = (state) => {
  return {
    monthData: state.calendarData.data.month,
    bestMonth: getBestMonth(state.calendarData.data.month),
  };
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

class MeetingInEachMonth extends React.Component {
  render() {
    // months is 0-11
    const { monthData, bestMonth } = this.props;

    const monthFullNames = moment.months(),
      monthShortNames = moment.monthsShort();

    const monthDataArr = new Array(12).fill(0);
    if (monthData) {
      for (const [k, v] of Object.entries(monthData)) {
        monthDataArr[k] = v;
      }
    }

    const backgroundColors = new Array(12).fill('rgba(3, 3, 3, 0.2)');
    const borderColors = new Array(12).fill('rgba(3, 3, 3, 0.2)');
    if (bestMonth && bestMonth.length) {
      bestMonth.forEach((v, k) => {
        backgroundColors[v.key] = 'rgba(255, 99, 132, 0.2)';
        borderColors[v.key] = 'rgba(255, 99, 132, 1)';
      });
    }

    const data = {
      labels: monthShortNames,
      datasets: [
        {
          label: 'Number of Meetings',
          data: monthDataArr,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    };

    const hasMoreThan1 = bestMonth && bestMonth.length > 1;

    return (
      <FullPage>
        <Content>
          <Title
            overrideClassNames={{
              textColor: 'text-green-700',
              textAlign: 'text-center',
            }}
          >
            How many meetings did you have each month?
          </Title>
          {bestMonth && (
            <div>
              <Stat>
                {hasMoreThan1
                  ? `Your busiest months are`
                  : `Your busiest month is`}
                <Highlight>
                  {bestMonth.map((m) => monthFullNames[m.key]).join(', ')}
                </Highlight>
                , when you have <Highlight>{bestMonth[0].value}</Highlight>{' '}
                meetings.
              </Stat>
            </div>
          )}

          <ChartContainer>
            <Bar data={data} options={options} />
          </ChartContainer>
        </Content>
        <div className="lines">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </FullPage>
    );
  }
}

const FullPage = styled(FullPageSlideContainer)`
  background-color: #f4d03f;
  background-image: linear-gradient(33deg, #f4d03f 0%, #16a085 100%);
`;

const Stat = (props) => {
  return (
    <StatBase
      overrideClassNames={{
        textColor: 'text-gray-100',
      }}
    >
      {props.children}
    </StatBase>
  );
};

const Highlight = (props) => {
  return (
    <span
      className="inline-block mx-2 text-green-900 text-semi-bond"
      {...props}
    >
      {props.children}
    </span>
  );
};

export default connect(mapStateToProps)(MeetingInEachMonth);
