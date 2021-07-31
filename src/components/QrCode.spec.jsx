import {mount} from "enzyme";
import React from "react";
import QRCode from "qrcode";
import QrCode from "./QrCode";
import {EConnectionStatus} from "../constants/enums";

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

    it('should send mounted message to qr-code channel when component is mounted', () => {
        expect(ipcRenderer.send).toHaveBeenCalledWith('qr-code', 'mounted')
    });


    //TODO: No support for react hooks in enzyme. Find Alternative
    xit('should set image url when ipcRenderer receives message', () => {
        ipcRenderer.on.mockImplementationOnce((event, callback) => {
            callback(event, 'sample message');
        });
        QRCode.toDataURL.mockResolvedValue('sample url')

        const mountedQrCodeWithImage = mount(<QrCode status={EConnectionStatus.DISCONNECTED}/>)
        expect(mountedQrCodeWithImage.find('img').props('src')).toBe('sample url');
    });
})
