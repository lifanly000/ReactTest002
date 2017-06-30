/**
 * Created by lifan on 2017/6/28.
 */
import React, { Component,PropTypes } from 'react';
import {
    requireNativeComponent,
    View
} from 'react-native';

let iface = {
    name:'FocusedTextView',
    propTypes:{
        text:PropTypes.string,
        ...View.propTypes
    }
};

module.exports = requireNativeComponent('FocusedTextView',iface);