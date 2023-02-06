import React from 'react';
import { Container } from 'reactstrap';
import MetaTags from 'react-meta-tags';

const Vacations = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Resource management | Vacations</title>
        </MetaTags>
        <Container fluid>
          <div className="row">Vacations page</div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Vacations;
