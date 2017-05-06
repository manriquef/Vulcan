import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FRC from 'formsy-react-components';
import Select from 'react-select';

//const ReactTags = ReactTagInput.WithContext;

const Input = FRC.Input;

class SelectField extends Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);

    const tags = props.value ? props.value.map(optionId => {
      return {
        id: optionId,
        text: _.findWhere(props.options, {value: optionId}).label
      };
    }) : [];

    this.state = {
      tags: tags,
      suggestions: _.pluck(props.options, "label"),
      value: props.value || []
    };
  }

  handleDelete(i) {

    const tags = this.state.tags;
    tags.splice(i, 1);

    const value = this.state.value;
    value.splice(i,1);

    this.setState({
      tags: tags,
      value: value
    });
  }

  handleAddition(tag) {

    // first, check if added tag is part of the possible options
    const option = _.findWhere(this.props.options, {label: tag});

    if (option) {

      // add tag to state (for tag widget)
      const tags = this.state.tags;
      tags.push({
          id: tags.length + 1,
          text: tag
      });

      // add value to state (to store in db)
      const value = this.state.value;
      value.push(option.value);

      this.setState({
        tags: tags,
        value: value
      });
    }

  }

  render() {

    const {name, /* value, */ label} = this.props;

    return (
      <div className="form-group row">
        <label className="control-label col-sm-3">{label}</label>
        <div className="col-sm-9">
          <div className="selectfield-field">
            <Select.Async
              name={this.state.tags}
              isLoading={isLoadingExternally}
              suggestions={this.state.suggestions}
              handleDelete={this.handleDelete}
              handleAddition={this.handleAddition}
              minQueryLength={1}
              classNames={{
                // tags: 'tagsClass',
                // tagInput: 'form-control'
                // selected: 'selectedClass',
                // tag: 'tagClass',
                // remove: 'removeClass',
                // suggestions: 'suggestionsClass'
              }}
            />
            <Input name={name} type="hidden" readOnly value={this.state.value} />
          </div>
        </div>
      </div>
    );
  }
}

SelectField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string
}

export default SelectField;
