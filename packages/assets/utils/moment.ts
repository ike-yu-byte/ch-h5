class Moment {
  _day = new Date();
  constructor(date?: any) {
    const length = arguments.length;
    if (!length) {
      // 没有传参，获取今天的日期
      this._day = new Date();
    } else {
      // 有传参
      if (!date || !this.isValid(date)) {
        // 参数为undefined、null、0、‘’、非法字符串
        this._day = this.toDate(undefined);
      } else {
        this._day = this.toDate(date);
      }
    }
    return this;
  }

  format(format, date) {
    // 没传形参date时只能链式调用
    date = arguments.length > 1 ? date : this._day;
    format = format ?? "YYYY-MM-DD HH:mm:ss";
    const padStart = (num, size = 2) => `0000${num}`.slice(-size);
    const options = {
      YYYY: date.getFullYear(),
      yyyy: padStart(date.getFullYear() % 100),
      MM: padStart(date.getMonth() + 1),
      dd: padStart(date.getDate()),
      DD: padStart(date.getDate()),
      HH: padStart(date.getHours()),
      hh: padStart(date.getHours() - 12),
      mm: padStart(date.getMinutes()),
      ss: padStart(date.getSeconds()),
      SSS: padStart(date.getMilliseconds(), 3),
    };
    return format.replace(
      /(YYYY|yyyy|yy|MM|dd|DD|HH|hh|mm|ss|SSS)/g,
      (match) => options[match]
    );
  }

  isBefore(secondDate, firstDate) {
    // 没传形参firstDate时只能链式调用, secondDate必传
    // 作用：比较firstDate是否比secondDate小
    firstDate = this.toDate(arguments.length > 1 ? firstDate : this._day);
    secondDate = this.toDate(secondDate);
    if (this.isValid(firstDate) && this.isValid(secondDate)) {
      return new Date(firstDate).getTime() < new Date(secondDate).getTime();
    } else {
      return false;
    }
  }

  substract(number, unit, fromDate) {
    // 没传形参fromDate时只能链式调用
    fromDate = this.toDate(arguments.length > 2 ? fromDate : this._day);
    const date = this.calc(false, number, unit, fromDate);
    this._day = this.toDate(date);
    return this;
  }

  add(number, unit, fromDate) {
    // 没传形参fromDate时只能链式调用
    fromDate = this.toDate(arguments.length > 2 ? fromDate : this._day);
    const date = this.calc(true, number, unit, fromDate);
    this._day = this.toDate(date);
    return this;
  }

  calc(isAdd, number, unit, fromDate) {
    if (!(number && unit && fromDate)) {
      return;
    }
    let date = null;
    if (unit === "days") {
      date = fromDate.setDate(
        isAdd ? fromDate.getDate() + number : fromDate.getDate() - number
      );
    } else if (unit === "years") {
      date = fromDate.setFullYear(
        isAdd
          ? fromDate.getFullYear() + number
          : fromDate.getFullYear() - number
      );
    } else if (unit === "minutes") {
      date = fromDate.setMinutes(
        isAdd ? fromDate.getMinutes() + number : fromDate.getMinutes() - number
      );
    } else if (unit === "months") {
      date = fromDate.setMonth(
        isAdd ? fromDate.getMonth() + number : fromDate.getMonth() - number
      );
    } else if (unit === "seconds") {
      date = fromDate.setSeconds(
        isAdd ? fromDate.getSeconds() + number : fromDate.getSeconds() - number
      );
    } else if (unit === "hours") {
      date = fromDate.setHours(
        isAdd ? fromDate.getHours() + number : fromDate.getHours() - number
      );
    }
    return date;
  }

  toDate(date) {
    if (!arguments.length) {
      // 链式调用
      date = this._day;
    }
    return date instanceof Moment
      ? !date._day || !this.isValid(date._day)
        ? new Date(undefined)
        : new Date(date._day)
      : !date || !this.isValid(date)
      ? new Date(undefined)
      : new Date(date);
  }

  isValid(date) {
    if (!arguments.length) {
      // 链式调用
      date = this._day;
    }
    return !isNaN(
      new Date(
        date instanceof Moment ? date._day ?? undefined : date ?? undefined
      ).getTime()
    );
  }
}
export default function moment(date) {
  return arguments.length ? new Moment(date) : new Moment();
}
