import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './user-test.reducer';
import { IUserTest } from 'app/shared/model/user-test.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUserTestUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserTestUpdate = (props: IUserTestUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { userTestEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/user-test');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...userTestEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhipsterSampleApplication2App.userTest.home.createOrEditLabel" data-cy="UserTestCreateUpdateHeading">
            <Translate contentKey="jhipsterSampleApplication2App.userTest.home.createOrEditLabel">Create or edit a UserTest</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : userTestEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="user-test-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="user-test-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="firstNameLabel" for="user-test-firstName">
                  <Translate contentKey="jhipsterSampleApplication2App.userTest.firstName">First Name</Translate>
                </Label>
                <AvField
                  id="user-test-firstName"
                  data-cy="firstName"
                  type="text"
                  name="firstName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                    maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="user-test-lastName">
                  <Translate contentKey="jhipsterSampleApplication2App.userTest.lastName">Last Name</Translate>
                </Label>
                <AvField
                  id="user-test-lastName"
                  data-cy="lastName"
                  type="text"
                  name="lastName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                    maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="referralCodeLabel" for="user-test-referralCode">
                  <Translate contentKey="jhipsterSampleApplication2App.userTest.referralCode">Referral Code</Translate>
                </Label>
                <AvField
                  id="user-test-referralCode"
                  data-cy="referralCode"
                  type="text"
                  name="referralCode"
                  validate={{
                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                    maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="nationalCodeLabel" for="user-test-nationalCode">
                  <Translate contentKey="jhipsterSampleApplication2App.userTest.nationalCode">National Code</Translate>
                </Label>
                <AvField
                  id="user-test-nationalCode"
                  data-cy="nationalCode"
                  type="text"
                  name="nationalCode"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 10, errorMessage: translate('entity.validation.minlength', { min: 10 }) },
                    maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="phoneNumberLabel" for="user-test-phoneNumber">
                  <Translate contentKey="jhipsterSampleApplication2App.userTest.phoneNumber">Phone Number</Translate>
                </Label>
                <AvField
                  id="user-test-phoneNumber"
                  data-cy="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  validate={{
                    minLength: { value: 11, errorMessage: translate('entity.validation.minlength', { min: 11 }) },
                    maxLength: { value: 11, errorMessage: translate('entity.validation.maxlength', { max: 11 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="user-test-email">
                  <Translate contentKey="jhipsterSampleApplication2App.userTest.email">Email</Translate>
                </Label>
                <AvField
                  id="user-test-email"
                  data-cy="email"
                  type="text"
                  name="email"
                  validate={{
                    minLength: { value: 5, errorMessage: translate('entity.validation.minlength', { min: 5 }) },
                    maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/user-test" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  userTestEntity: storeState.userTest.entity,
  loading: storeState.userTest.loading,
  updating: storeState.userTest.updating,
  updateSuccess: storeState.userTest.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserTestUpdate);
