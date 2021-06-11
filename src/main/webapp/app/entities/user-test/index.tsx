import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserTest from './user-test';
import UserTestDetail from './user-test-detail';
import UserTestUpdate from './user-test-update';
import UserTestDeleteDialog from './user-test-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserTestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserTestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserTestDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserTest} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={UserTestDeleteDialog} />
  </>
);

export default Routes;
