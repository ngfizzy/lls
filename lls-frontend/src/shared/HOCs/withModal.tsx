import React from 'react'
import { GeneralModal } from '../Modal/GeneralModal';

interface Args {
    Component: React.FC<any>,
    componentProps?: {[key: string]: any};
    modalConfig: {
        handleClose: () => any;
        title: string;
        show: boolean;
        size: 'sm' | 'lg' | undefined;
        controls: 'closeOnly' | undefined;
    }
}

const withModal =({ Component, componentProps, modalConfig }: Args)  => (
    <GeneralModal {...modalConfig} >
        <Component {...componentProps} />
    </GeneralModal>
);


export default withModal;
