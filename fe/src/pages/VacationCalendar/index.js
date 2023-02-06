import React from 'react';
import { Container } from 'reactstrap';
import MetaTags from 'react-meta-tags';

const VacationCalendar = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Resource management | VacationCalendars</title>
        </MetaTags>
        <Container fluid>
          <div className="row">VacationCalendar page</div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default VacationCalendar;
