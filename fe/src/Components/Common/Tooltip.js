import React, { useState } from 'react';
import { UncontrolledTooltip } from 'reactstrap';

const Component = (props) => {
    const { target, placement } = props;
    return (
        <UncontrolledTooltip placement={placement} target={target} className="custom-tooltip">
            {props.children}
        </UncontrolledTooltip>
    );
};

export default Component;
