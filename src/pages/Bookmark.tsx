import useAuth from '@/hooks/useAuth';

const Bookmark = () => {
  const { user, isLoggedIn } = useAuth();

  console.log(user, isLoggedIn());

  return (
    <>
      <h1>로그인부터 해주세요 ~ ^^</h1>
      Plz Login
    </>
  );
};
export default Bookmark;
