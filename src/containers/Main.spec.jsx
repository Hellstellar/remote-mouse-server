import React from "react";
import Main from "./Main";
import {mount, shallow} from "enzyme";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {Fade} from "@material-ui/core";
import QrCode from "../components/QrCode";
import ConnectionStatus from "../components/ConnectionStatus";
const { ipcRenderer } = require('electron');

jest.mock(
    '../components/QrCode',
    () =>
        function DummyQrCode() {
            return <div>Dummy QrCode</div>;
        },
);

jest.mock(
    'electron',
    () => {
        const mockedElectron = { ipcRenderer: { on: jest.fn(), send: jest.fn() } };
        return mockedElectron;
    },
    { virtual: true },
);

describe("Main Component ", () => {
    let main

    beforeEach(() => {
        main = shallow(<Main />)
    })

    it("renders a <Container/> component with expected props", () => {
        expect(main.find(Container)).toHaveLength(1)
        expect(main.find(Container).prop('maxWidth')).toBe('xl');
        expect(main.find(Container).prop('disableGutters')).toEqual(true);
    });

    it("renders a <Grid/> component with expected props", () => {
        expect(main.find(Grid)).toHaveLength(1)
        expect(main.find(Grid).prop('justify')).toBe('center');
        expect(main.find(Grid).prop('alignItems')).toBe('center');
        expect(main.find(Grid).prop('container')).toEqual(true);
    });

    it("renders a <Fade/> component with expected props", () => {
        expect(main.find(Fade)).toHaveLength(1)
        expect(main.find(Fade).prop('in')).toBe(true);
        expect(main.find(Fade).get(0).props.children.type).toBe('div')
    });

    it("renders a <QrCode/> component with expected props", () => {
        expect(main.find(QrCode)).toHaveLength(1)
    });

    it("renders a <ConnectionStatus/> component with mobile status as disconnected", () => {
        const mountedMain = mount(<Main />)
        expect(mountedMain.find(ConnectionStatus).prop('status')).toBe('disconnected')
        mountedMain.unmount();
    });

    it("renders a <ConnectionStatus/> component with mobile status set by ipc channel", () => {
        ipcRenderer.on.mockImplementationOnce((event, callback) => {
            callback(event, 'sample message');
        });
        const mountedMain = mount(<Main />)
        expect(mountedMain.find(ConnectionStatus).prop('status')).toBe('sample message')
        expect(ipcRenderer.send).toHaveBeenCalledWith('mobile-status', 'changed')
        mountedMain.unmount();
    });

});