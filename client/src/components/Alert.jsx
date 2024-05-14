import {Alert} from 'react-bootstrap'



const Alertmsg = (props) => {
    return (
        <Alert variant={props.color} className="mt-5">
            {props.msg}
        </Alert>
    )
}
export default Alertmsg;
