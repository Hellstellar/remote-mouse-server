import {mount} from "enzyme";
import React from "react";
import QrCode from "./QrCode";
import {Fab} from "@material-ui/core";
const { ipcRenderer } = require('electron');


jest.mock(
    'electron',
    () => {
        const mockedElectron = { ipcRenderer: { on: jest.fn(), send: jest.fn() } };
        return mockedElectron;
    },
    { virtual: true },
);
describe("SearchField Enzyme mount() ", () => {
    let mountedQrCode

    beforeEach(() => {
        mountedQrCode = mount(<QrCode />)
    });

    afterEach(() => {
        mountedQrCode.unmount()
    });

    it('should render <Fab /> with expected props', () => {
        expect(mountedQrCode.find(Fab)).toHaveLength(1)
        expect(mountedQrCode.find(Fab).prop('id')).toBe(undefined)
        expect(mountedQrCode.find(Fab).prop('onClick')).toBeDefined()
    });

    it('should change <Fab /> id when clicked', () => {
        mountedQrCode.find(Fab).simulate('click')
        expect(mountedQrCode.find(Fab).prop('id')).toBe(undefined)
    });
})
