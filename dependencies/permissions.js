/* =========================================================
  THIS FILE CONTAINS IS THE CENTRALIZED PLACE FOR STORING
INFORMATION ON WHICH RESOURCES (ENDPOINTS) ARE AVAILABLE TO
                WHICH SYSTEM PERMISSIONS.
========================================================= */

const permissionsMap = new Map([
    [`GET /api/system-permissions/`, [`admin:*` , `admin:permissions:read`]],

    // SYSTEM ROLES

  [`POST /api/products`, [`admin:*`, `admin:products:create`]],
  [`POST /api/user`, [`admin:*`, `admin:user:create`]],
  [`GET /api/products/*`, [`admin:*`, `admin:products:read`] , [`user:*`, `user:products:read`]],
  [`GET /api/products`, [`admin:*`, `admin:products:read`] , [`user:*`, `user:products:read`]],
  [`GET /api/users/*`, [`admin:*`, `admin:users:read`]],
  [`GET /api/users`, [`admin:*`, `admin:users:read`]],
  [`PATCH /api/products/*`, [`admin:*`, `admin:products:update`]],
  [`PATCH /api/user/*`, [`admin:*`, `admin:user:update`]],
  [`DELETE /api/products/*`, [`admin:*`, `admin:products:delete`]],
  [`DELETE /api/user/*`, [`admin:*`, `admin:user:delete`]]

]);

module.exports = {
  permissionsMap
};