(() => {
  const oArmsInput = document.querySelector('#arms');
  const oRateInput = document.querySelector('#rate');
  const oCritInput = document.querySelector('#crit');
  const oSubmitBtn = document.querySelector('.calculator__process__submit');
  const oResultTable = document.querySelector('.calculator__result');
  const oResultTableBody = oResultTable.querySelector('tbody');

  const data = {
    arms: '',
    rate: '',
    crit: '',
    result: 0,
  };
  // 值列表
  const resultList = [
    {
      arms: 0.6,
      rate: 0.37,
      crit: 5.6,
      result: 6.144,
    },
  ];
  const tools = {
    isNumber(v) {
      return typeof v === 'number';
    },
    isNaN(v) {
      return Object.is(v, NaN);
    },
    /**
     * 计算理论 dps
     * @param {Number} arms 武伤
     * @param {Number} rate 爆率
     * @param {Number} crit 爆伤
     */
    calc(arms, rate, crit) {
      let baseCrit = 1.5 + crit;
      let baseRate = 0.03 + rate;
      let rightMultiplier = 1 + baseCrit * baseRate;
      let leftMultiplier = 1 + arms;

      return rightMultiplier * leftMultiplier;
    },
  };

  oArmsInput.addEventListener('input', (e) => {
    data.arms = Number.parseInt(e.target.value) / 100;
  });
  oRateInput.addEventListener('input', (e) => {
    data.rate = Number.parseInt(e.target.value) / 100;
  });
  oCritInput.addEventListener('input', (e) => {
    data.crit = Number.parseInt(e.target.value) / 100;
  });

  oSubmitBtn.addEventListener('click', () => {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        if (!tools.isNumber(value) || tools.isNaN(value)) {
          return false;
        }
      }
    }

    data.result = +(tools.calc(
      data.arms,
      data.rate,
      data.crit
    )).toFixed(3);
    resultList.push({
      arms: data.arms,
      rate: data.rate,
      crit: data.crit,
      result: data.result,
    });

    render();
  });

  function createTemplate(v) {
    let str = `
      <tr class="${v.index % 2 === 0 ? 'pure-table-odd' : ''}">
        <td>${v.index}</td>
        <td>${v.arms}</td>
        <td>${v.rate}</td>
        <td>${v.crit}</td>
        <td>${v.result}</td>
      </tr>
    `;

    return str;
  }

  function render() {
    const template = createTemplate({
      arms: data.arms * 100,
      rate: data.rate * 100,
      crit: data.crit * 100,
      result: data.result,
      index: resultList.length - 1,
    });

    oResultTableBody.innerHTML += template;
  }
})();