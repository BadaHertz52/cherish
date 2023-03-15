import Button from '../components/Button';
import '../assets/Button.scss';
const button = () => {
  const handleButtonClick = () => {
    console.log('Button Clicked!');
  };
  const handleFetchSuccess = (response: any) => {
    console.log('Fetch Success!', response.data);
  };

  const handleFetchError = (error: any) => {
    console.error('Fetch Error!', error);
  };

  return (
    <>
      <Button children="다음" onClickAction={handleButtonClick} className="deactivate" />
      <Button children="다음" to="/first" className="activate" />
      <Button children="다음" type="submit" className="default" />
      <Button
        children="다음"
        onClickAction={handleButtonClick}
        fetchUrl="https://jsonplaceholder.typicode.com/todos/"
        onSuccess={handleFetchSuccess}
        onError={handleFetchError}
        className="default2"
      />
    </>
  );
};

export default button;
