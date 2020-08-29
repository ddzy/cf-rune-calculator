(() => {
  const oArmsInput = document.querySelector('#arms');
  const oRateInput = document.querySelector('#rate');
  const oCritInput = document.querySelector('#crit');
  const oMainInput = document.querySelector('#main');
  const oBlackInput = document.querySelector('#black');
  const oDollInput = document.querySelector('#doll');
  const oSubmitBtn = document.querySelector('.calculator__process__submit');
  const oResultTable = document.querySelector('.calculator__result');
  const oResultTableBody = oResultTable.querySelector('tbody');

  const data = {
    arms: '', // 武伤
    rate: '', // 爆率
    crit: '', // 爆伤
    main: '', // 主武器
    black: '', // 黑骑士
    doll: '', // 玩偶
    result: 0,
  };
  const resultList = [
    {
      arms: 0.6,
      rate: 0.37,
      crit: 5.6,
      main: 2,
      black: 6,
      doll: 6,
      result: 26.433,
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
    /**
     * 计算理论 dps
     * @param {Number} totalArms 总的武器伤害倍数
     * @param {Number} totalRate 总的爆率倍数
     * @param {Number} totalCrit 总的爆伤倍数
     * @param {Number} totalBlack 总的黑骑士伤害倍数
     */
    _calc(totalArms, totalRate, totalCrit, totalBlack) {
      let newTotalCrit = totalCrit - 1;
      let leftMultiplier = 1 + totalRate * newTotalCrit;
      let rightMultiplier = totalArms * totalBlack / 1.045;

      return leftMultiplier * rightMultiplier;
    },
    /**
     * 计算黑骑士伤害倍数
     * @param {Number} blackNum 黑骑士数量
     */
    calcBlack(blackNum) {
      return 1 + blackNum * 0.045;
    },
    /**
     * 计算玩偶伤害倍数
     * @param {Number} dollNum 玩偶数量
     */
    calcDoll(dollNum) {
      return 1 + dollNum * 0.03;
    },
    /**
     * 计算紫色符文主武器伤害倍数
     * @param {Number} mainNum 紫色主武器数值
     */
    calcMain(mainNum) {
      return 1 + mainNum;
    },
    /**
     * 计算红色符文的武器伤害倍数
     * @param {Number} armsNum 红色武器伤害
     */
    calcArms(armsNum) {
      return 1 + armsNum;
    },
    /**
     * 计算总暴击率倍数
     * @param {Number} rateNum 暴击率数值
     */
    calcTotalRate(rateNum) {
      return 0.03 + rateNum;
    },
    /**
     * 计算总暴击伤害倍数
     * @param {Number} critNum 暴击伤害数值
     */
    calcTotalCrit(critNum) {
      return 2.5 + critNum;
    },
    /**
     * 计算总武器伤害倍数
     * @param {Number} arms 红色符文的武器伤害倍数
     * @param {Number} main 紫色符文的武器伤害倍数
     * @param {Number} doll 玩偶的伤害倍数
     */
    calcTotalArms(arms, main, doll) {
      return arms * main * doll;
    },
  };

  oArmsInput.addEventListener('input', (e) => {
    data.arms = Number.parseFloat(e.target.value) / 100;
  });
  oRateInput.addEventListener('input', (e) => {
    data.rate = Number.parseFloat(e.target.value) / 100;
  });
  oCritInput.addEventListener('input', (e) => {
    data.crit = Number.parseFloat(e.target.value) / 100;
  });
  oMainInput.addEventListener('input', (e) => {
    data.main = Number.parseInt(e.target.value) / 100;
  });
  oBlackInput.addEventListener('input', (e) => {
    data.black = Number.parseInt(e.target.value);
  });
  oDollInput.addEventListener('input', (e) => {
    data.doll = Number.parseInt(e.target.value);
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

    // 计算总武器伤害倍数
    const totalArms = tools.calcTotalArms(
      tools.calcArms(data.arms),
      tools.calcMain(data.main),
      tools.calcDoll(data.doll),
    );
    // 计算总爆率倍数
    const totalRate = tools.calcTotalRate(data.rate);
    // 计算总爆伤倍数
    const totalCrit = tools.calcTotalCrit(data.crit);
    // 计算总黑骑士倍数
    const totalBlack = tools.calcBlack(data.black);

    data.result = +(tools._calc(totalArms, totalRate, totalCrit, totalBlack)).toFixed(3);
    resultList.push({
      arms: data.arms,
      rate: data.rate,
      crit: data.crit,
      main: data.main,
      black: data.black,
      doll: data.doll,
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
        <td>${v.main}</td>
        <td>${v.black}</td>
        <td>${v.doll}</td>
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
      main: data.main * 100,
      black: data.black,
      doll: data.doll,
      result: data.result,
      index: resultList.length - 1,
    });

    oResultTableBody.innerHTML += template;
  }
})();