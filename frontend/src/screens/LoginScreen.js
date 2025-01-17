import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import FormContainer from '../components/FormContainer.js'
import {login} from '../actions/userActions.js'

const LoginScreen = ({location, history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin)
  const {loading, error, userInfo} = userLogin
  console.log(loading, error, userInfo)
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if(userInfo){
      history.push(redirect)
    }
  }, [userInfo, history, redirect])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
    console.log(email, password)
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader></Loader>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>
            Email Address
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          >
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>
            Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          >
          </Form.Control>
          <Button
            type="submit"
            variant="primary"
          >
            Sign In
          </Button>
        </Form.Group>
      </Form>
      <Row className="py-3">
        <Col>
            New Customer?{' '}
            <Link 
              to={ redirect 
                    ? `/register?redirect=${redirect}` 
                    : '/register'
            }>
                Register
            </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
