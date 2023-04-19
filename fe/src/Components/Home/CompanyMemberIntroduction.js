import React from 'react';
import { Row, Col } from 'reactstrap';
const CompanyMemberIntroduction = (props) => {
    let datas = [
        {
            avatar: 'https://www.zen8labs.com/wp-content/uploads/2022/05/team-1.png',
            name: 'Billy Pham',
            responsibility: 'Co-Founder',
            description: `Born in Vietnam, Billy is a web developer and entrepreneur living in San Francisco. He has a degree in Computer Science from the
            prestigious National University of Singapore. <br></br>Today, Billy has a notable 12-year career full of experience from working
            with tech giants such as Google, Addepar, and McAfee.`,
        },
        {
            avatar: 'https://www.zen8labs.com/wp-content/uploads/2022/05/team-2.png',
            name: 'Tom Nguyen',
            responsibility: 'Co-Founder, CEO ',
            description: `
                        A computer programmer, tech entrepreneur, lecturer and author with 15 years in the technology industry. Tom was an Engineering Manager for Danish startup Planday for 5 years and has co-founded multiple Agile and development communities in Hanoi, Vietnam, such as Agile Vietnam and Scrum Hanoi. 
                        <br></br>
                        He has also gained several honours in competitions such as the Programming Olympic for University students and the ACM/ICPC for Asia region. Aside from his responsibilities as CEO of Zen8Labs, Tom is also an Agile and digital transformation consultant for VnDirect, VNPT, Viettel, and F88.`,
        },
        {
            avatar: 'https://www.zen8labs.com/wp-content/uploads/2022/05/team-3.png',
            name: 'Dave Bui ',
            responsibility: 'Co-Founder',
            description: `Developer and tech entrepreneur Dave earned his Master’s degree from Swinburne University of Technology in Australia. During his time there, he was a senior developer for digital experience agency – Isobar. In his 15 years in the industry, became the director of VnDirect Securities and Technology Creativity Division of Vinmec International Healthcare System. <br><br>He also co-founded medical equipment company ViCare and presentation software company AhaSlides.`,
        },
    ];
    return (
        <React.Fragment>
            <Row>
                {datas.map((x, i) => {
                    return (
                        <div className="col-lg-4 col-xs-12 gx-5" key={i}>
                            <img width="140" height="140" src={x.avatar} alt="" data-ll-status="loaded" />
                            <h5 className="mt-3">{x.name}</h5>
                            <h6 className="text-muted">{x.responsibility}</h6>
                            <p dangerouslySetInnerHTML={{ __html: x.description }}></p>
                        </div>
                    );
                })}
            </Row>
        </React.Fragment>
    );
};

export default CompanyMemberIntroduction;
