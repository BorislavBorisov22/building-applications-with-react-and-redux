import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

function setup(saving = false) {
    const props = {
        course: {},
        saving,
        loading: false,
        errors: {},
        onSave: () => {},
        onChange: () => {},
        allAuthors: []
    };

    return shallow(<CourseForm {...props}/>);
}

it('renders form and h1', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Manage Course');
});

it('save button is labeled Save when not saving', () => {
    const wrapper = setup();
    expect(wrapper.find('input').props().value).toEqual('Save');
});

it('save button is labeled Saving.. when saving', () => {
    const wrapper = setup(true);
    expect(wrapper.find('input').props().value).toEqual('Saving...');
});
