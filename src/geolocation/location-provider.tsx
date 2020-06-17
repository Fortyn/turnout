import {Button} from "@material-ui/core";
import RoomIcon from '@material-ui/icons/Room';
import React from "react";
import {Anchor} from "../model/anchor";
import {Turnout} from "../model/turnout";
import httpClientService from "../security/http-client.service";

interface Props {
    roomId: number,
    resetRoom: () => void;
}

export const LocationProvider: React.FunctionComponent<Props> = props => {
    const {roomId, resetRoom} = props;
    const getAnchors = () => {
        httpClientService.get(`/protected/rooms/${roomId}/anchors`)
            .then(response => response.data as Anchor[])
            .then(anchors => checkArea(anchors));
    }
    const registerTurnout = (anchor: Anchor, value: string) => {
        const turnout: Turnout = {
            roomId,
            anchorId: anchor.id,
            characteristicValue: value
        }
        httpClientService.post(`/protected/turnout`, turnout)
            .then(response => response.data as { status: string })
            .then(data => {
                if (data.status === 'ACCEPTED') {
                    alert('Turnout has been registered');
                    return;
                }
                alert('Turnout registration was rejected');
            });
    };
    const checkArea = (anchors: Anchor[]) => {
        let connectedDevice: BluetoothDevice;
        let selectedAnchor: Anchor;
        const b = navigator.bluetooth;
        console.log(b);
        if (!b) {
            return;
        }
        b.requestDevice({
            filters: anchors.map(anchor => {
                return {
                    name: anchor.serverName
                };
            }),
            optionalServices: anchors.map(anchor => anchor.serviceName),
        }).then(device => {
            console.log("device");
            console.log(device);
            connectedDevice = device;
            const anchor = anchors.find(anchor => anchor.serverName === device.name);
            if (!anchor) {
                throw new Error('DEVICE NOT FOUND');
            }
            selectedAnchor = anchor;
            return device.gatt?.connect()
        }).then(server => {
            console.log("server");
            console.log(server);
            return server?.getPrimaryService(selectedAnchor.serviceName);
        }).then(service => {
            console.log("service");
            console.log(service);
            return service?.getCharacteristic(selectedAnchor.propertyName);
        }).then(characteristic => {
            console.log("char");
            return characteristic?.readValue();
        }).then(value => {
            console.log("value");
            console.log(value);
            if (!value) {
                return;
            }
            const array = new Uint8Array(value.buffer);
            const decodedValue = new TextDecoder("utf-8").decode(array);
            registerTurnout(selectedAnchor, decodedValue);
        }).catch(reason => console.log(reason))
            .finally(() => {
                resetRoom();
                connectedDevice?.gatt?.disconnect();
            });
    };

    return (
        <Button
            disabled={roomId === 0}
            variant='outlined'
            onClick={() => getAnchors()}
        >
            <RoomIcon/>
        </Button>
    );
}

