import React from 'react';
import { Card, CardBody, Input, Label } from 'reactstrap';

const Summary = () => {
    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <div className="text-muted">
                        <h6 className="mb-3 fw-semibold text-uppercase">Summary</h6>
                        <p>
                            It will be as simple as occidental in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate
                            existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words.
                        </p>

                        <h6 className="mb-3 fw-semibold text-uppercase">Sub-tasks</h6>
                        <ul className=" ps-3 list-unstyled vstack gap-2">
                            <li>
                                <div className="form-check">
                                    <Input className="form-check-input" type="checkbox" defaultValue="" id="productTask" />
                                    <Label className="form-check-label" htmlFor="productTask">
                                        Product Design, Figma (Software), Prototype
                                    </Label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <Input className="form-check-input" type="checkbox" defaultValue="" id="dashboardTask" defaultChecked />
                                    <Label className="form-check-label" htmlFor="dashboardTask">
                                        Dashboards : Ecommerce, Analytics, Project,etc.
                                    </Label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <Input className="form-check-input" type="checkbox" defaultValue="" id="calenderTask" />
                                    <Label className="form-check-label" htmlFor="calenderTask">
                                        Create calendar, chat and email app pages
                                    </Label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <Input className="form-check-input" type="checkbox" defaultValue="" id="authenticationTask" />
                                    <Label className="form-check-label" htmlFor="authenticationTask">
                                        Add authentication pages
                                    </Label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default Summary;
