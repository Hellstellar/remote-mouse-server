import {mount} from "enzyme";
import React from "react";
import QRCode from "qrcode";
import {Fab} from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import CropFreeIcon from '@material-ui/icons/CropFree';
import QrCode from "./QrCode";

const { ipcRenderer } = require('electron');

jest.mock('qrcode', () => {
    return {toDataURL: jest.fn()}
})
jest.mock(
    'electron',
    () => {
        return {ipcRenderer: {on: jest.fn(), send: jest.fn()}};
    },
    { virtual: true },
);


describe("SearchField Enzyme mount() ", () => {
    let mountedQrCode
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);

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

    it('should render qr code icon', () => {
        expect(mountedQrCode.find(CropFreeIcon)).toHaveLength(1)
    });

    it('should render <Popover /> with expected props', () => {
        expect(mountedQrCode.find(Popover)).toHaveLength(1);
        expect(mountedQrCode.find(Popover).prop('onClose')).toBeDefined()
        expect(mountedQrCode.find(Popover).prop('id')).toBe(undefined)
        expect(mountedQrCode.find(Popover).prop('anchorEl')).toBe(null)
    });

    it('should change <Popover /> id and anchorEl <Fab /> is clicked', () => {
        mountedQrCode.find(Fab).simulate('click')
        expect(mountedQrCode.find(Popover).prop('id')).toBe('simple-popover')
        expect(mountedQrCode.find(Popover).prop('anchorEl')).not.toBe(null)
    });

    it('should send mounted message to qr-code channel when component is mounted', () => {
        expect(ipcRenderer.send).toHaveBeenCalledWith('qr-code', 'mounted')
    });


    //TODO: No support for react hooks in enzyme. Find Alternative
    xit('should set image url when ipcRenderer receives message', () => {
        ipcRenderer.on.mockImplementationOnce((event, callback) => {
            callback(event, 'sample message');
        });
        QRCode.toDataURL.mockResolvedValue('sample url')

        const mountedQrCodeWithImage = mount(<QrCode/>)
        expect(mountedQrCodeWithImage.find('img').props('src')).toBe('sample url');


    });
})
