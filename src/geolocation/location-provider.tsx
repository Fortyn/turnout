import React from "react";

export const LocationProvider: React.FunctionComponent<{}> = props => {
    console.log("render");
    const serverName = "ANCHOR";
    const serviceUuid = "00003333-0000-1000-8000-00805f9b34fb";
    const characteristic = "00003334-0000-1000-8000-00805f9b34fb";
    const f = () => {
            let connectedDevice: BluetoothDevice;
            const b = navigator.bluetooth;
            if (!b) {
                return;
            }
            b.requestDevice({
                filters: [{
                    name: serverName
                }],
                optionalServices: [serviceUuid]
            }).then(device => {
                console.log("device");
                console.log(device);
                connectedDevice = device;
                return device.gatt?.connect()
            }).then(server => {
                console.log("server");
                console.log(server);
                return server?.getPrimaryService(serviceUuid);
            }).then(service => {
                console.log("service");
                console.log(service);
                return service?.getCharacteristic(characteristic);
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
                const mes = new TextDecoder("utf-8").decode(array);
                alert(JSON.stringify({
                    value: mes
                }));
            }).catch(reason => console.log(reason))
                .finally(() => connectedDevice?.gatt?.disconnect());
        }
    ;

    return <button onClick={() => f()}>CHECK</button>;

}

