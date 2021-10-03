import React, { FC, useState } from "react";

import { Anchor, Box, Header, Nav, Menu, ResponsiveContext } from "grommet";
import { User } from "@supabase/gotrue-js";
import { supabase } from "../utils/createClient";
import Router from "next/router";

interface NavBarProps {
  User: User | undefined;
}

export const NavBar: FC<NavBarProps> = ({ User }) => {
  return (
    <Header background="neutral-3" pad="medium">
      <Box direction="row" align="center" gap="small">
        Quizlr
      </Box>
      <ResponsiveContext.Consumer>
        {(responsive) =>
          responsive === "small" ? (
            <Menu
              items={[
                { label: "This is", onClick: () => {} },
                { label: "The Menu", onClick: () => {} },
                { label: "Sign Out", onClick: () => {} },
              ]}
            />
          ) : (
            <Nav direction="row">
              <Anchor href="#" label="This is" color="status-ok" />
              <Anchor href="#" label="The Nav" color="status-ok" />

              {User ? <Anchor label={User.email} color="status-ok" /> : null}
              {User ? (
                <Anchor
                  label="Sign Out"
                  color="status-ok"
                  onClick={async (e) => {
                    await supabase.auth.signOut();
                  }}
                />
              ) : (
                <Anchor
                  label="Sign In"
                  color="status-ok"
                  onClick={async () => {
                    Router.push("/auth");
                  }}
                />
              )}
            </Nav>
          )
        }
      </ResponsiveContext.Consumer>
    </Header>
  );
};
