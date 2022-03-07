import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function TemplateSelect(props) {
  let history = useHistory();

  return (<Container><Row>
    {props.templates.map(el => {
      return (

        <Col key={el.id} className=" align-items-center justify-content-center">
          <Image src={el.url} width={180} height={180} />
          <Link to={"/new/" + el.id}  ><Button size="lg">  Choose</Button></Link>
        </Col>
      )
    })
    }</Row>
    <Button onClick={() => history.goBack()} className="float-sm-right"
      style={{
        position: 'absolute',
        top: "50rem",
        left: "90rem"
      }}>Back</Button></Container>
  )
}





export default TemplateSelect;