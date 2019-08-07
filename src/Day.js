import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { persianMonthsNames } from './helper'

class Day extends PureComponent {
  constructor(props) {
    super(props)
    this.dayRef = null
  }
  componentDidMount() {
    if (this.props.status === 'singleDate' || this.props.status === 'firstDay') {
      this.props.scrollToSelectedDay(this.dayRef)
    }
  }

  render() {
    const { disabled, status, date, persianDate, onSelect } = this.props
    const today = new Date().toDateString()
    if (status !== 'monthFirstDays') {
      const data = {
        date,
        persian: {
          dateArray: persianDate,
          month: persianMonthsNames[persianDate[1] - 1]
        }
      }
      const isToday = date.toDateString() === today
      return (
        <div className='dayWrapper' ref={ref => { this.dayRef = ref }}>
          <button
            type='button'
            className={`${status}`}
            onClick={() => onSelect(data)}
            disabled={disabled}
          >
            <span className='today-text'>{isToday && 'امروز'}</span>
            <span>{persianDate[2]}</span>
          </button>
        </div>
      )
    }
    return (
      <div className='dayWrapper'>
        <button type='button' disabled />
      </div>
    )
  }
}

Day.propTypes = {
  disabled: PropTypes.bool,
  scrollToSelectedDay: PropTypes.func,
  status: PropTypes.string,
  persianDate: PropTypes.array,
  onSelect: PropTypes.func,
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ])
}

Day.defaultProps = {
  scrollToSelectedDay: () => undefined
}

export default Day
