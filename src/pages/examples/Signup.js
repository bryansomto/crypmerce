
import React from "react";
import $ from 'jquery';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faBox, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";


export default () => {

  $(document).ready(function() {

    $('#password').keyup(function(){
      let passwordData = {
        password: $("[name = 'password']").val(),
        confirmPassword: $("[name = 'confirmPassword']").val(),
      };
      if (passwordData.password === passwordData.confirmPassword) {
        document.getElementById('passwordError').innerHTML = '';
      }
      else{
        document.getElementById('passwordError').innerHTML = 'Passwords does not match';
        document.getElementById('passwordError').style.color = 'red';
      }
    });

    $('#confirmPassword').keyup(function(){
      let passwordData = {
        password: $("[name = 'password']").val(),
        confirmPassword: $("[name = 'confirmPassword']").val(),
      };
      if (passwordData.password !== passwordData.confirmPassword) {
        document.getElementById('passwordError').innerHTML = 'Passwords does not match';
        document.getElementById('passwordError').style.color = 'red';
      }
      else{
        document.getElementById('passwordError').innerHTML = '';
      }
    });

    $("[name = 'accountType']").change(function(){
      if (this.value === 'none'){
        document.getElementById('accountTypeError').innerHTML = 'Select a valid account type';
        document.getElementById('accountTypeError').style.color = 'red';
      }
      else{
        document.getElementById('accountTypeError').innerHTML = '';
      }
    });

		$("#submitButton").click(function(event) {
			// event.preventDefault();
			let formData = {
        businessName: $("[name = 'businessName']").val(),
				email: $("[name = 'email']").val(),
				password: $("[name = 'password']").val(),
        confirmPassword: $("[name = 'confirmPassword']").val(),
        accountType: $("[name = 'accountType']").val(),
			};
			console.log(formData.password);
      if (formData.businessName!==''&&formData.email!==''&&formData.password!==''&&formData.confirmPassword!=='') {
        if (formData.accountType !== 'none'){
          $.ajax({
            url: 'http://localhost:3001/api/signup',
            method: 'POST',
            data: formData,
            dataType: 'json',
          })
          .done(function(res) {
            console.log('success');
            console.log(res);
            if (res === 'success') {
              console.log('Successfully registered');
            }
            else if (res === 'invalid password') {
              document.getElementById('errorArea').innerHTML = 'Pasword does not match!';
              $('#forgotPassword').css('color', 'red');
              $('#createAccount').css('color', '');
              return false;
            }
          })
          .fail(function() {
            console.log('fail');
            return false;
          });
        } else {
          document.getElementById('errorArea').innerHTML = 'Select a valid account type';
          $("[name = 'accountType']").focus();
          return false;
        }
      }
      else {
        document.getElementById('errorArea').innerHTML = 'All fields are required';
        document.getElementById('errorArea').style.color = 'red';
        return false;
      }
		});
	});

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Create an account</h3>
                  <p id="errorArea" style={{color: 'red'}}></p>
                </div>
                <Form action='/api/signup' method='POST' className="mt-4">
                  <Form.Group id="businessName" className="mb-4">
                    <Form.Label>Business Name</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faBox} />
                        </InputGroup.Text>
                        <Form.Control autoFocus required type="text" name="businessName" placeholder="Crypmerce Corp" />
                      </InputGroup>
                  </Form.Group>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control required type="email" name="email" placeholder="example@company.com" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="password" name="password" placeholder="Password" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="confirmPassword" className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="password" name="confirmPassword" placeholder="Confirm Password" />
                    </InputGroup>
                    <small id="passwordError" className=""></small>
                  </Form.Group>
                  <Form.Group id="accountType" className="mb-4">
                    <Form.Label>Account Type</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faBox} />
                        </InputGroup.Text>
                        <Form.Select name="accountType" required>
                          <option value="none">Select an account type...</option>
                          <option value="farm">Farm Business Account</option>
                          <option value="business">Others (Private/Public Business Account)</option>
                        </Form.Select>
                      </InputGroup>
                      <small id="accountTypeError" className=""></small>
                  </Form.Group>
                  <FormCheck type="checkbox" className="d-flex mb-4">
                    <FormCheck.Input required id="terms" className="me-2" />
                    <FormCheck.Label htmlFor="terms">
                      I agree to the <Card.Link>terms and conditions</Card.Link>
                    </FormCheck.Label>
                  </FormCheck>

                  <Button variant="primary" id="submitButton" type="submit" className="w-100">
                    Sign up
                  </Button>
                </Form>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                    <FontAwesomeIcon icon={faGithub} />
                  </Button>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Already have an account?
                    <Card.Link as={Link} to={Routes.Signin.path} className="fw-bold">
                      {` Login here `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};