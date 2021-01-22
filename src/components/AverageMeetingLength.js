import React from 'react';
import { connect } from 'react-redux';
import { HorizontalBar } from '@reactchartjs/react-chart.js';
import styled from 'styled-components';
import {
  FullPageSlideContainer,
  Content,
  Header1Smaller as Title,
  Header2Smaller,
  ChartContainer,
} from '../components/SlideComponents';

const mapStateToProps = (state) => {
  return {
    dailyAvgLen: state.calendarData.data.dailyAvgLen,
    avgLen: state.calendarData.data.avgLen,
    dbLen: state.calendarData.data.len,
  };
};

const options = {
  scales: {
    yAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 4,
        },
      },
    ],
  },
  legend: {
    display: false,
  },
};

const MEETING_LEN_CATEGORY_0_30 = '0_30';
const MEETING_LEN_CATEGORY_30_60 = '30-60';
const MEETING_LEN_CATEGORY_60 = '60+';

class AverageMeetingLength extends React.Component {
  buildChartData() {
    const { dbLen = {} } = this.props;

    const lenArr = [
      dbLen[MEETING_LEN_CATEGORY_0_30],
      dbLen[MEETING_LEN_CATEGORY_30_60],
      dbLen[MEETING_LEN_CATEGORY_60],
    ];

    const data = {
      labels: ['< 30 mins', '30 - 60 mins', '60 mins +'],
      redraw: true,
      datasets: [
        {
          label: 'Number of Meetings',

          data: lenArr,
          backgroundColor: ['#FDE68A', '#FBBF24', '#D97706'],
          borderColor: ['#FEF3C7', '#FCD34D', '#F59E0B'],
          borderWidth: 0,
        },
      ],
    };
    return data;
  }
  render() {
    const { avgLen = 0, dailyAvgLen = 0 } = this.props;
    const data = this.buildChartData();

    return (
      <FullPage>
        <Content>
          <Title className="text-center mb-2">
            How long did you spend on meetings each day?
          </Title>
          <Subtitle className="text-center my-2 text-gray-800">
            On average, you spent <Number>{dailyAvgLen.toFixed(1)}</Number>{' '}
            hours on meetings each day.
          </Subtitle>
          <Subtitle className="text-center my-2 text-gray-800">
            On aveage, your meetings take <Number>{avgLen.toFixed(0)} </Number>
            mins each.
          </Subtitle>
          <ChartContainer>
            <HorizontalBar data={data} options={options} />
          </ChartContainer>
        </Content>
      </FullPage>
    );
  }
}

const Number = styled.span`
  color: rgb(234, 113, 38);
  font-size: 2.5rem;
`;

const Subtitle = styled(Header2Smaller)`
  background-color: rgb(250, 180, 77);
  padding: 0.25em;
  border-radius: 0.25em;
  box-shadow: 2px 4px rgb(244, 155, 49);
  transform: rotate(-1deg);
`;

export default connect(mapStateToProps)(AverageMeetingLength);

const FullPage = styled(FullPageSlideContainer)`
  background-color: #fbab7e;
  background-image: linear-gradient(62deg, #fbab7e 0%, #f7ce68 100%);
`;
