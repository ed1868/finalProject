import React from 'react';
import Select from 'react-select';

const options = [
  { value: "symptomOne", label: "Shortness Of Breath" },
  { value: "symptomsTwo", label: "Fatigue" },
  { value: "symptomsThree", label: "Weakness" },
  { value: "symptomsFour", label: "Fever" },
  { value: "symptomsFive", label: "Anxiety"}
];

export default class App extends React.Component {
  state = {
    selectedOption: null,
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}