import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
//Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/VerticalLayouts";
//routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import { AuthProtected, AccessRoute } from "./AuthProtected";
// Recoil
import { useRecoilState } from "recoil";
import { roleAtom } from "./../Recoil/states/roles";
// Services
import { Get as getRoles } from "./../Services/role.service";
import { Get as getUsers } from "../Services/user.service";
import { usersAtom } from "../Recoil/states/users";

const Index = () => {
  const availablePublicRoutesPaths = publicRoutes.map((r) => r.path);
  const availableAuthRoutesPath = authProtectedRoutes.map((r) => r.path);
  const [_, setRoles] = useRecoilState(roleAtom);
  const [__, setUsers] = useRecoilState(usersAtom);
  useEffect(() => {
    if (document.documentElement) document.documentElement.setAttribute("data-layout", "horizontal");
    getRoles().then((res) => {
      setRoles(res);
    });
    getUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  return (
    <React.Fragment>
      <Switch>
        <Route path={availablePublicRoutesPaths}>
          <NonAuthLayout>
            <Switch>
              {publicRoutes.map((route, idx) => (
                <Route path={route.path} component={route.component} key={idx} exact={true} />
              ))}
            </Switch>
          </NonAuthLayout>
        </Route>

        <Route path={availableAuthRoutesPath}>
          <AuthProtected>
            <VerticalLayout>
              <Switch>
                {authProtectedRoutes.map((route, idx) => (
                  <AccessRoute path={route.path} component={route.component} key={idx} exact={true} />
                ))}
              </Switch>
            </VerticalLayout>
          </AuthProtected>
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default Index;
