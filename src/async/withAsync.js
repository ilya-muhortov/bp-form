
import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';


export function withAsync(WrappedComponent) {
  return class extends Component {

    constructor(props) {
      super(props);

      this.state = {
        options: [],
        filter: this.props.filter,
        loading: true
      }
    }

    componentDidMount() {
      this.loadAllOptions();
    }

    componentWillReceiveProps(nextProps, nextContext) {
      if (!_.isEqual(nextProps.filter, this.state.filter)) {
        this.setState({filter: nextProps.filter}, () => {
          this.loadOptions();
        });
      }
    }

    loadAllOptions = async () => {
      let options = [];

      const load = async (page) => {
        return axios.get(this.props.url, {params: {page: page, ...this.state.filter}}).then(res => {
          const data = res.data;
          if (data.results.length > 0) {
            options = options.concat(data.results);
          }
          if (data.pagination && data.pagination.next) {
            return load(data.pagination.next);
          }
        });
      };

      await load(1);

      this.setState({
        loading: false,
        options: options
      });
    };

    render() {
      const { options, loading } = this.state;
      return (
        <WrappedComponent
          options={options}
          loading={loading}
          {...this.props}
        />
      )
    }
  }
}
