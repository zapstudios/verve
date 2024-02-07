import type { Access } from "payload/types";

import { checkRole } from "../check-role";

export const adminsAndUser: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(["admin"], user)) {
      return true;
    }

    return {
      id: {
        equals: user.id,
      },
    };
  }

  return false;
};
