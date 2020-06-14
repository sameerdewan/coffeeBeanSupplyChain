// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;


library Roles {
  struct Role {
    mapping (address => bool) bearer;
  }

  function add(Role storage role, address account) internal {
    require(account != address(0), 'Error: invalid account');
    require(!has(role, account), 'Error: invalid role');

    role.bearer[account] = true;
  }

  function remove(Role storage role, address account) internal {
    require(account != address(0), 'Error: invalid account');
    require(has(role, account), 'Error: invalid role');

    role.bearer[account] = false;
  }

  function has(Role storage role, address account)
    internal
    view
    returns (bool)
  {
    require(account != address(0), 'Error: invalid account');
    return role.bearer[account];
  }
}