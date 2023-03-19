import Button from '../components/Button';
import '../assets/Button.scss';
import axios from 'axios';
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
      <Button
        children="다음"
        onClickAction={() => {
          window.location.href = '/';
        }}
        className="activate"
      />
      <Button children="다음" type="submit" className="default" />
      <Button
        children="다음"
        onClickAction={() => {
          axios
            .get('https://jsonplaceholder.typicode.com/todos/')
            .then(reponse => {
              console.log(reponse.data);
            })
            .catch(error => {
              console.log(error.reponse);
            });
        }}
        className="default2"
      />
    </>
  );
};

export default button;
