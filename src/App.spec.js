import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Main from "./containers/Main";

describe('App', () => {
    let container

    beforeEach(() => (container = shallow(<App />)))

    it('should render a <Main/>', () => {
        expect(container.containsMatchingElement(<Main />)).toEqual(true)
    });
});