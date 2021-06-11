import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './user-test.reducer';
import { IUserTest } from 'app/shared/model/user-test.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserTestProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const UserTest = (props: IUserTestProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { userTestList, match, loading } = props;
  return (
    <div>
      <h2 id="user-test-heading" data-cy="UserTestHeading">
        <Translate contentKey="jhipsterSampleApplication2App.userTest.home.title">User Tests</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="jhipsterSampleApplication2App.userTest.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="jhipsterSampleApplication2App.userTest.home.createLabel">Create new User Test</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {userTestList && userTestList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="jhipsterSampleApplication2App.userTest.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterSampleApplication2App.userTest.firstName">First Name</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterSampleApplication2App.userTest.lastName">Last Name</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterSampleApplication2App.userTest.referralCode">Referral Code</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterSampleApplication2App.userTest.nationalCode">National Code</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterSampleApplication2App.userTest.phoneNumber">Phone Number</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterSampleApplication2App.userTest.email">Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userTestList.map((userTest, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${userTest.id}`} color="link" size="sm">
                      {userTest.id}
                    </Button>
                  </td>
                  <td>{userTest.firstName}</td>
                  <td>{userTest.lastName}</td>
                  <td>{userTest.referralCode}</td>
                  <td>{userTest.nationalCode}</td>
                  <td>{userTest.phoneNumber}</td>
                  <td>{userTest.email}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${userTest.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userTest.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userTest.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="jhipsterSampleApplication2App.userTest.home.notFound">No User Tests found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ userTest }: IRootState) => ({
  userTestList: userTest.entities,
  loading: userTest.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserTest);
