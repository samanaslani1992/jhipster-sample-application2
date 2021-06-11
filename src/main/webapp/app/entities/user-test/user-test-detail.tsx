import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-test.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserTestDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserTestDetail = (props: IUserTestDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { userTestEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="userTestDetailsHeading">
          <Translate contentKey="jhipsterSampleApplication2App.userTest.detail.title">UserTest</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{userTestEntity.id}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="jhipsterSampleApplication2App.userTest.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{userTestEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="jhipsterSampleApplication2App.userTest.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{userTestEntity.lastName}</dd>
          <dt>
            <span id="referralCode">
              <Translate contentKey="jhipsterSampleApplication2App.userTest.referralCode">Referral Code</Translate>
            </span>
          </dt>
          <dd>{userTestEntity.referralCode}</dd>
          <dt>
            <span id="nationalCode">
              <Translate contentKey="jhipsterSampleApplication2App.userTest.nationalCode">National Code</Translate>
            </span>
          </dt>
          <dd>{userTestEntity.nationalCode}</dd>
          <dt>
            <span id="phoneNumber">
              <Translate contentKey="jhipsterSampleApplication2App.userTest.phoneNumber">Phone Number</Translate>
            </span>
          </dt>
          <dd>{userTestEntity.phoneNumber}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="jhipsterSampleApplication2App.userTest.email">Email</Translate>
            </span>
          </dt>
          <dd>{userTestEntity.email}</dd>
        </dl>
        <Button tag={Link} to="/user-test" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-test/${userTestEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ userTest }: IRootState) => ({
  userTestEntity: userTest.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserTestDetail);
