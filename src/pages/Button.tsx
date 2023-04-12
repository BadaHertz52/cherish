import axios from 'axios';

import Button from '../components/Button';
import '../assets/Button.scss';
const button = () => {
  const handleButtonClick = () => {
    console.log('Button Clicked!');
  };
  return (
    <>
      <Button onClickAction={handleButtonClick} className="disabled">
        다음
      </Button>
      <Button
        onClickAction={() => {
          window.location.href = '/';
        }}
        className="abled"
      >
        다음
      </Button>
      <Button type="submit" className="default">
        다음
      </Button>
      <Button
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
      >
        다음
      </Button>
    </>
  );
};

export default button;
