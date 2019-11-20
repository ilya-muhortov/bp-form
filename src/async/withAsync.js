
import PropTypes from 'prop-types';
import _ from 'lodash';
import axios from 'axios';
import localForage from 'localforage';
import React, { Component } from 'react';


export function withAsync(WrappedComponent) {
  return class extends Component {

    static propTypes = {
      url: PropTypes.string.isRequired,
      useCache: PropTypes.bool,
      timeout: PropTypes.number
    }

    static defaultProps = {
      useCache: false,
      timeout: 60
    }

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
          this.loadAllOptions();
        });
      }
    }

    getCachedKey = () => {
      const { url } = this.props;
      const { filter } = this.state;
      const queryString = new URLSearchParams(filter).toString();
      return `cached-options-${url}-${queryString}`;
    };

    getCachedOptions = async () => {
      const { useCache } = this.props;
      let options = [];
      if (useCache) {
        await localForage.getItem(this.getCachedKey()).then(value => {
          if (value) {
            try {
              const [ttl, cachedOptions] = value;
              if (ttl < Date.now()) {
                localForage.removeItem(this.getCachedKey());
              } else if (_.isArray(cachedOptions)) {
                options = cachedOptions;
              }
            } catch (e) {
              localForage.removeItem(this.getCachedKey());
            }
          }
        });
      }

      return options;
    };

    setCachedOptions = (options) => {
      const { useCache, timeout } = this.props;
      if (useCache) {
        localForage.setItem(this.getCachedKey(), [Date.now() + (timeout * 60 * 1000), options]);
      }
    };

    loadAllOptions = async () => {
      const { filter } = this.state;
      let options = await this.getCachedOptions();
      if (options.length === 0) {
        const load = async (page) => {
          return axios.get(this.props.url, {params: {page: page, ...filter}}).then(res => {
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

        this.setCachedOptions(options);
      }

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
