import AbstractSmartComponent from "./abstract-smart-component.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const moneyCtx = document.querySelector(`.statistic__money`);
const transportCtx = document.querySelector(`.statistic__transport`);
const timeSpendCtx = document.querySelector(`.statistic__time-spend`);

// Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
const BAR_HEIGHT = 55;
moneyCtx.height = BAR_HEIGHT * 6;
transportCtx.height = BAR_HEIGHT * 4;
timeSpendCtx.height = BAR_HEIGHT * 4;

const moneyChart = new Chart(moneyCtx, {
  plugins: [ChartDataLabels],
  type: `horizontalBar`,
  data: {
    labels: [`FLY`, `STAY`, `DRIVE`, `LOOK`, `RIDE`],
    datasets: [{
      data: [400, 300, 200, 160, 100],
      backgroundColor: `#ffffff`,
      hoverBackgroundColor: `#ffffff`,
      anchor: `start`
    }]
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 13
        },
        color: `#000000`,
        anchor: 'end',
        align: 'start',
        formatter: (val) => `€ ${val}`
      }
    },
    title: {
      display: true,
      text: `MONEY`,
      fontColor: `#000000`,
      fontSize: 23,
      position: `left`
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: `#000000`,
          padding: 5,
          fontSize: 13,
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        barThickness: 44,
      }],
      xAxes: [{
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        minBarLength: 50
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false,
    }
  }
});

const transportChart = new Chart(transportCtx, {
  plugins: [ChartDataLabels],
  type: `horizontalBar`,
  data: {
    labels: [`FLY`, `DRIVE`, `RIDE`],
    datasets: [{
      data: [4, 2, 1],
      backgroundColor: `#ffffff`,
      hoverBackgroundColor: `#ffffff`,
      anchor: `start`
    }]
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 13
        },
        color: `#000000`,
        anchor: 'end',
        align: 'start',
        formatter: (val) => `${val}x`
      }
    },
    title: {
      display: true,
      text: `TRANSPORT`,
      fontColor: `#000000`,
      fontSize: 23,
      position: `left`
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: `#000000`,
          padding: 5,
          fontSize: 13,
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        barThickness: 44,
      }],
      xAxes: [{
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        minBarLength: 50
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false,
    }
  }
});

const createStatisticsTemplate = () => {
  return (
    `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor({
  }) {
    super();

    this._renderCharts();
  }

  getTemplate() {
    return createStatisticsTemplate({});
  }

  show() {
    super.show();

    this.rerender(this._tasks, this._dateFrom, this._dateTo);
  }

  recoveryListeners() {}

  rerender() {

    super.rerender();

    this._renderCharts();
  }

  _renderCharts() {
    // const element = this.getElement();

    // this._applyFlatpickr(this.getElement().querySelector(`.statistic__period-input`));

    // const daysCtx = element.querySelector(`.statistic__days`);
    // const colorsCtx = element.querySelector(`.statistic__colors`);

    this._resetCharts();

    // this._daysChart = renderDaysChart(daysCtx, this._tasks.getTasks(), this._dateFrom, this._dateTo);
    // this._colorsChart = renderColorsChart(colorsCtx, this._tasks.getTasks());
  }

  // _resetCharts() {
  //  if (this._daysChart) {
  //    this._daysChart.destroy();
  //    this._daysChart = null;
  //  }

  //  if (this._colorsChart) {
  //    this._colorsChart.destroy();
  //    this._colorsChart = null;
  //  }
  // }
}
