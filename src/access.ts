/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { currentUser?: USER.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  console.log(currentUser)
  return {
    canAdmin: currentUser && currentUser.role === 'ADMIN',
  };
}
