import { FieldArray } from 'formik';
import { Col, Row } from 'reactstrap';

const Index = ({ name, values, title, emptyValue, Component, setFieldValue, type }) => {
    return (
        <FieldArray
            name={name}
            render={(arrayHelpers) => (
                <Row>
                    <Col lg={12} className="d-flex mb-3 align-items-center">
                        <h5 className="mb-0 me-2"> {title}</h5>
                        <button type="button" onClick={() => arrayHelpers.push(emptyValue)} className="py-0 px-1 btn btn-success">
                            <i className="ri-add-line align-bottom fs-24"></i>
                        </button>
                    </Col>
                    <Col xxl={12}>
                        <div className="section-page-content mb-3">
                            {values[name] &&
                                values[name].length > 0 &&
                                values[name].map((data, index) => (
                                    <Component
                                        key={index}
                                        index={index}
                                        arrayHelpers={arrayHelpers}
                                        name_parent={name}
                                        values={data}
                                        setFieldValue={setFieldValue}
                                        type={type}
                                    />
                                ))}
                        </div>
                    </Col>
                </Row>
            )}
        />
    );
};
export default Index;
