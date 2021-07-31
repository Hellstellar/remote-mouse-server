import ConnectionStatus from "./ConnectionStatus";
import {shallow} from "enzyme";
import Typography from "@material-ui/core/Typography";
import {ErrorOutline} from "@material-ui/icons";

describe('Connection Status', () => {
    it('should display waiting for mobile when disconnected', () => {
        const connectionStatus = shallow((<ConnectionStatus status={'disconnected'} />))
        expect(connectionStatus.find(Typography).props().children).toBe('Waiting to connect...')
    });

    it('should render ErrorOutline icon when disconnected', () => {
        const connectionStatus = shallow((<ConnectionStatus status={'disconnected'} />))
        expect(connectionStatus.find(ErrorOutline)).toHaveLength(1)
    });

    it('should display connected when connected', () => {
        const connectionStatus = shallow((<ConnectionStatus status={'connected'} />))
        expect(connectionStatus.find(Typography).props().children).toBe('Connected to mobile')
    });
});