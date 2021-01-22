import React from 'react';
import { connect } from 'react-redux';
import { Doughnut } from '@reactchartjs/react-chart.js';
import styled from 'styled-components';
import {
  FullPageSlideContainer,
  Content,
  Header1 as Title,
  Stat,
} from '../components/SlideComponents';

const mapStateToProps = (state) => {
  return {
    zoom: state.calendarData.data.zoom,
  };
};

class Zoom extends React.Component {
  buildChartData(zoom) {
    const zoomDataArr = [zoom.in_person, zoom.ZOOM];
    const data = {
      labels: ['In-Person', 'Zoom'],
      datasets: [
        {
          label: 'Number of Meetings',
          data: zoomDataArr,
          backgroundColor: ['#081d56', '#F56A44'],
          borderColor: ['#3B3E6E', '#F0543F'],
          borderWidth: 1,
        },
      ],
      options: {
        plugin: {
          legend: {
            position: 'bottom',
            labels: {
              fontColor: 'white',
            },
          },
        },
      },
    };
    return data;
  }

  render() {
    const {
      zoom = {
        in_person: 0,
        ZOOM: 0,
      },
    } = this.props;
    const data = this.buildChartData(zoom);

    // const zoomPercent = (
    //   (zoom.ZOOM / (zoom.ZOOM + zoom.in_person)) *
    //   100
    // ).toFixed(0);
    // const inpersonPercent = (
    //   (zoom.in_person / (zoom.ZOOM + zoom.in_person)) *
    //   100
    // ).toFixed(0);

    return (
      <FullPage className="cy-slide-container zoom">
        <Content>
          <Title
            className="text-center md:text-left"
            overrideClassNames={{
              textColor: 'text-gray-100',
            }}
          >
            Did you jump on the Zoom bandwagon?
          </Title>

          <Stat>
            <OrangeNumber className="num">{zoom.ZOOM}</OrangeNumber>
            <label>Zoom Meetings Participated</label>
          </Stat>

          <Stat>
            <Number className="num">{zoom.in_person}</Number>
            <label>In-Person Meetings Participated</label>
          </Stat>

          <div
            className="
          md:absolute md:opacity-20 block md:left-1/4 md:w-10/12
          relative opacity-80 mt-4 w-full 
          "
          >
            <Doughnut data={data} />
          </div>
        </Content>
      </FullPage>
    );
  }
}

const Number = styled.span`
  color: #081d56;
  display: inline-block;
  margin-right: 1rem;
  font-size: 150%;
`;

const OrangeNumber = styled(Number)`
  color: #f56a44;
`;

const FullPage = styled(FullPageSlideContainer)`
  background: #373b44; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    rgb(50, 103, 173),
    rgb(75, 57, 153)
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    rgb(50, 103, 173),
    rgb(75, 57, 153)
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

export default connect(mapStateToProps)(Zoom);
