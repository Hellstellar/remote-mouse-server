import React from "react";
import Main from "./Main";
import {mount, shallow} from "enzyme";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
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
        return {ipcRenderer: {on: jest.fn(), send: jest.fn(), removeAllListeners: jest.fn()}};
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
        expect(main.find(Grid)).toHaveLength(3)
        expect(main.find('[data-testid="container-grid"]').prop('justify')).toBe('space-around');
        expect(main.find('[data-testid="container-grid"]').prop('alignItems')).toBe('center');
        expect(main.find('[data-testid="container-grid"]').prop('container')).toEqual(true);
    });

    it("renders a <QrCode/> component when mobile status is disconnected with expected props", () => {
        ipcRenderer.on.mockImplementationOnce((event, callback) => {
            callback(event, 'disconnected');
        });
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