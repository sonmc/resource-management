import React from 'react';
import { Container } from 'reactstrap';
import MetaTags from 'react-meta-tags';

const Perms = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Resource management | Permissions</title>
        </MetaTags>
        <Container fluid>
          <div className="row">Permission page</div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Perms;
