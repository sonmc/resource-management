import React, { useState } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FeatherIcon from 'feather-icons-react';

const RenderCardTitle = (props) => {
    const { kanban_column, updateColumnName, removeColumn } = props;
    const [isUpdate, setIsUpdate] = useState(false);
    const [name, setName] = useState(kanban_column.name);
    return (
        <React.Fragment>
            <div className="d-flex mb-3">
                <div className="flex-grow-1">
                    {isUpdate ? (
                        <input
                            type="text"
                            value={name}
                            onBlur={(e) => {
                                setIsUpdate(false);
                                updateColumnName(kanban_column)
                                    .then((res) => {
                                        kanban_column.name = res.name;
                                    })
                                    .catch(() => {
                                        //mock api
                                        kanban_column.name = name;
                                        // setName(kanban_column.name);
                                    });
                            }}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            className="form-control"
                        />
                    ) : (
                        <h6
                            className="fs-14 text-uppercase fw-semibold mb-0"
                            onClick={() => {
                                setIsUpdate(true);
                            }}
                        >
                            {name}
                        </h6>
                    )}
                </div>
                <div className="flex-shrink-0">
                    <UncontrolledDropdown className="card-header-dropdown" direction="start">
                        <DropdownToggle tag="a" id="dropdownMenuLink1" role="button">
                            <FeatherIcon icon="more-vertical" className="icon-sm" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem onClick={removeColumn}>Delete</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            </div>
        </React.Fragment>
    );
};

export default RenderCardTitle;
