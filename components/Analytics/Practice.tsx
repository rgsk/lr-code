import { BaseOptionChart } from "@components/charts";
import { useTheme } from "@material-ui/core";
import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
import { fNumber } from "utils/formatNumber";

const Practice = () => {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    colors: [theme.palette.primary.main],
    stroke: { colors: [theme.palette.background.paper] },
    labels: ["Recipient Comment Percentage"],
    legend: { floating: true, horizontalAlign: "center" },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName: string) => fNumber(seriesName),
        title: {
          formatter: (seriesName: string) => `#${seriesName}`,
        },
      },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "75%",
          image: 10,
          imageWidth: 84,
          imageHeight: 84,
          imageClipped: false,
        },
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "20%",
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#999",
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    // grid: {
    //   padding: {
    //     top: -100,
    //   },
    // },
  });
  return (
    <div>
      <ReactApexChart
        type="radialBar"
        series={[10]}
        options={chartOptions}
        height={240}
      />
      <ReactApexChart
        type="donut"
        series={[10, 20, 30]}
        options={chartOptions}
        height={240}
      />
      <ReactApexChart
        type="line"
        series={[
          {
            name: "Outgoing Packages",
            type: "line",
            data: [100, 20, 30],
          },
          {
            name: "Received Packages",
            type: "area",
            data: [10, 40, 50],
          },
        ]}
        options={merge(BaseOptionChart(), {
          stroke: { width: [3, 3] },
          fill: { type: ["solid", "gradient"] },
          legend: {
            floating: true,
            horizontalAlign: "center",
            position: "bottom",
          },
          labels: [],
          colors: [
            // "#E0E0E0",
            "#234361",
            theme.palette.primary.main,

            // theme.palette.warning.main,
          ],
          xaxis: { type: "category" },
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: (y: number) => {
                if (typeof y !== "undefined") {
                  return `${y.toFixed(0)}`;
                }
                return y;
              },
            },
          },
        })}
        height={240}
      />
    </div>
  );
};
export default Practice;
