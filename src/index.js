import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  generateMonths,
  getStatus,
  GtoJ,
  persianMonthsNames,
  persianWeekDayNames
} from './helper'
import Month from './Month'

export default class Datepicker extends Component {
  constructor(props) {
    super(props)
    const {
      selectFrom,
      selectTo,
      startDate,
      rangeSelect,
      type,
      monthsCount
    } = props
    const to = rangeSelect && selectTo !== selectFrom ? selectTo : selectFrom
    this.state = {
      selectFrom,
      selectTo: to,
      months: generateMonths(monthsCount, startDate, selectFrom, to, type)
    }
  }

  changeSelection = (data) => {
    const { date } = data
    let { months, selectFrom, selectTo } = this.state
    const { rangeSelect } = this.props
    if (!selectFrom) {
      selectFrom = date
    } else if (!selectTo) {
      if (date > selectFrom) {
        selectTo = date
      } else {
        selectFrom = date
      }
    } else if (selectFrom && selectTo) {
      selectFrom = date
      selectTo = null
    }

    months = months.map(month =>
      month.map(day => {
        if (day.date) {
          return {
            date: day.date,
            persianDate: GtoJ(day.date),
            status: getStatus(day.date, selectFrom, selectTo),
            disabled: day.disabled
          }
        }
        return { date: '', status: 'monthFirstDays' }
      })
    )
    let to = null
    let from = null

    if (rangeSelect) {
      from = selectFrom
      to = selectTo
    } else {
      from = selectFrom
      to = selectFrom
    }

    let dates = {}
    if (rangeSelect && from && to) {
      dates = {
        from,
        to,
        count: Math.floor((to - from) / (1000 * 24 * 60 * 60) + 1)
      }
    } else dates = { from, to: from, count: 0 }

    this.props.onSelect({
      type: rangeSelect ? 'range' : 'single',
      ...dates
    })

    this.setState({
      months,
      selectFrom: from,
      selectTo: to
    })
  }

  renderWeekdays = () => (
    <div className='daysOfWeek'>
      {persianWeekDayNames.map((name, key) => (
        <div key={key}>{name}</div>
      ))}
    </div>
  )

  render() {
    const { months } = this.state
    return (
      <div className='datepicker-container'>
        {this.renderWeekdays()}
        {months.map((item, index) => {
          const date = item[15].persianDate
          const monthTitle = `${persianMonthsNames[date[1] - 1]} ${date[0]}`
          return (
            <Month
              month={item}
              key={`month-${index}`}
              monthTitle={monthTitle}
              onSelect={this.changeSelection}
              scrollToSelectedDay={this.props.scrollToSelectedDay}
            />
          )
        })}
      </div>
    )
  }
}

const d = new Date()

Datepicker.defaultProps = {
  selectFrom: d,
  startDate: d,
  rangeSelect: false,
  type: 'persian',
  monthsCount: 12
}

Datepicker.propTypes = {
  onSelect: PropTypes.func,
  scrollToSelectedDay: PropTypes.func,
  selectFrom: PropTypes.instanceOf(Date),
  startDate: PropTypes.instanceOf(Date),
  type: PropTypes.string,
  monthsCount: PropTypes.number,
  selectTo: PropTypes.instanceOf(Date),
  rangeSelect: PropTypes.bool
}
