import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '~/pages/SignIn';
import Plan from '~/pages/Plan';
import Registration from '~/pages/Registration';
import Student from '~/pages/Student';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/student" component={Student} />
      <Route path="/registration" component={Registration} />
      <Route path="/plan" component={Plan} />
    </Switch>
  );
}
