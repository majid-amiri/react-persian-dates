# react-persian-dates

> 

[![NPM](https://img.shields.io/npm/v/react-persian-dates.svg)](https://www.npmjs.com/package/react-persian-dates) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-persian-dates
```

## Usage

```jsx
import React, { Component } from 'react'

import Datepicker from 'react-persian-dates'

class Example extends Component {
  render () {
    return (
      <Datepicker
        onSelect={this.handleChange}
      />
    )
  }
}
```

## Props

|Props name|Desciption|Values|Default value|
|--------------------|--------------------|------------------|-----------------|
|monthsCount|Number of months shown in date picker|(Number)|4
|startDate|The date that calendar use to start generating|(Date)|```new Date()```|
|selectFrom|The date that is marked when date picker appears|(Date)|```new Date()```|
|selectTo|The date that is marked as second date (usable in range date picker)|(Date)|null|
|onSelect|Function that returns a value when marked dates are changed in date picker|(Function)|null|
|rangeSelect|Specify if date picker is single or range|(Boolean)|false|
|scrollToSelectedDay|A function that returns the selected date element. (#1. Refer to examples) (#2. You can use it for scrolling to selected day)|(Function)|undefined|

## Example

```jsx
import React, { Component } from 'react'

import Datepicker from 'react-persian-dates'

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: new Date(),
      to: null,
    };
  }
  
  handleChange = value => {
    this.setState({
      from: value.from,
      to: value.to,
    });
  };
  
  render () {
    const { from, to } = this.state;
    return (
      <Datepicker
        rangeSelect={true}
        startDate={new Date()}
        selectFrom={from}
        selectTo={to}
        onSelect={this.handleChange}
        scrollToSelectedDay={day =>
          setTimeout(
            () =>
              window.scrollTo({
                top: day.offsetTop - 200,
                left: 0,
                behavior: 'smooth',
              }),
            500,
          )
        }
      />
    )
  }
}
```

## License

MIT © [majid-amiri](https://github.com/majid-amiri)
