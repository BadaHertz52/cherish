import { useState, useCallback, useEffect, useMemo, memo } from 'react';
import styles from './style.module.scss';
import DownArrow from '@/assets/svgs/down-arrow.svg';
import ActiveUpArrow from '@/assets/svgs/active-up-arrow.svg';
import PresentLoader from '@/assets/icons/present-loader.png';
import CheckBox from '../CheckButton';
import RadioButton from '../RadioButton';
import PriceSlider from '../PriceSlider';

interface CheckBox {
  name: string;
  id: string;
  value: string;
  label: string;
  checked: boolean;
  checkOnlyOne: (checkThis: HTMLInputElement, value: string) => void;
}

interface RadioButton {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  hanleChangeValue: () => void;
}

const Accordion = () => {
  const [prices, setPrices] = useState([50000, 100000]);

  const [showFirstAccordion, setShowFirstAccordion] = useState<boolean>(false);
  const [showSecondAccordion, setShowSecondAccordion] = useState<boolean>(true);
  const [loader, setLoader] = useState(false);

  //해당 3가지 상태값들을 GET API가 완료 되는대로 제거 예정
  const [optionalPersonCheckedValue, setOptionalPersonCheckedValue] =
    useState<string>('women-optional');
  const [optionalAge, setOptionalAge] = useState<string>('26');
  const [optionalJobCheckedValue, setOptionalJobCheckedValue] =
    useState<string>('profession-optional');

  const [personCheckedValue, setPersonCheckedValue] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [jobCheckedValue, setJobCheckedValue] = useState<string>('');
  const [purposeCheckedValue, setPurposeCheckedValue] = useState<string>('');
  const [relationshipCheckedValue, setRelationshipCheckedValue] = useState<string>('');
  const [checkedList, setCheckedList] = useState<Array<string>>([]);
  const [emotionsCheckedValue, setEmotionsCheckedValue] = useState<string>('');

  // useEffect(() => {
  //   // TODO: GET API(로그인 했을 경우 선택 아코디언에 값 세팅 - 성별/나이/직업)
  // });

  const handleShowFirstAccordion = () => {
    setShowFirstAccordion(!showFirstAccordion);
  };

  const handleShowSecondAccordion = () => {
    setShowSecondAccordion(!showSecondAccordion);
  };

  const onCheckedItem = useCallback(
    (checked: boolean, item: string) => {
      if (checked) {
        setCheckedList(prev => [...prev, item]);
      } else if (!checked) {
        setCheckedList(checkedList.filter(el => el !== item));
      }
    },
    [checkedList],
  );

  const checkOnlyOne = useCallback(
    (checkThis: HTMLInputElement, value: string) => {
      let checkboxes;
      switch (value) {
        case 'sex-optional':
          if (optionalPersonCheckedValue === checkThis.value) {
            setOptionalPersonCheckedValue('');
            break;
          }
          checkboxes = document.getElementsByName('sex-optional') as NodeListOf<HTMLElement>;
          checkboxes.forEach(checkbox => {
            if (checkbox !== checkThis) {
              (checkbox as HTMLInputElement).checked = false;
            } else {
              setOptionalPersonCheckedValue((checkbox as HTMLInputElement).value);
            }
          });
          break;
        case 'job-optional':
          if (optionalJobCheckedValue === checkThis.value) {
            setOptionalJobCheckedValue('');
            break;
          }
          checkboxes = document.getElementsByName('job-optional') as NodeListOf<HTMLElement>;
          checkboxes.forEach(checkbox => {
            if (checkbox !== checkThis) {
              (checkbox as HTMLInputElement).checked = false;
            } else {
              setOptionalJobCheckedValue((checkbox as HTMLInputElement).value);
            }
          });
          break;
        case 'job':
          if (jobCheckedValue === checkThis.value) {
            setJobCheckedValue('');
            break;
          }
          checkboxes = document.getElementsByName('job') as NodeListOf<HTMLElement>;
          checkboxes.forEach(checkbox => {
            if (checkbox !== checkThis) {
              (checkbox as HTMLInputElement).checked = false;
            } else {
              setJobCheckedValue((checkbox as HTMLInputElement).value);
            }
          });
          break;
        case 'present-types':
          onCheckedItem(checkThis.checked, checkThis.id);
          break;
        case 'emotions':
          if (emotionsCheckedValue === checkThis.value) {
            setEmotionsCheckedValue('');
            break;
          }
          checkboxes = document.getElementsByName('emotions') as NodeListOf<HTMLElement>;
          checkboxes.forEach(checkbox => {
            if (checkbox !== checkThis) {
              (checkbox as HTMLInputElement).checked = false;
            } else {
              setEmotionsCheckedValue((checkbox as HTMLInputElement).value);
            }
          });
          break;
      }
    },
    [
      optionalPersonCheckedValue,
      optionalJobCheckedValue,
      jobCheckedValue,
      checkedList,
      emotionsCheckedValue,
    ],
  );

  const handleChangeAge = useCallback(
    (value: string, optional: boolean) => {
      if (optional) {
        if (value.length >= 3) {
          alert('숫자는 2자릿수까지만 입력해 주세요.');
          setOptionalAge('');
          return;
        }
        if (isNaN(Number(value))) {
          alert('숫자만 입력해 주세요.');
          setOptionalAge('');
          return;
        } else {
          setOptionalAge(value);
        }
        return;
      }
      if (value.length >= 3) {
        alert('숫자는 2자릿수까지만 입력해 주세요.');
        setAge('');
        return;
      }
      if (isNaN(Number(value))) {
        alert('숫자만 입력해 주세요.');
        setAge('');
        return;
      } else {
        setAge(value);
      }
    },
    [age, optionalAge],
  );

  const personsOptional = useMemo(() => {
    return [
      {
        name: 'sex-optional',
        id: 'women-optional',
        value: 'women-optional',
        label: '여자',
        checked: optionalPersonCheckedValue === 'women-optional',
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'sex-optional',
        id: 'men-optional',
        value: 'men-optional',
        label: '남자',
        checked: optionalPersonCheckedValue === 'men-optional',
        checkOnlyOne: checkOnlyOne,
      },
    ];
  }, [optionalPersonCheckedValue]);

  const renderPersonsOptional = useMemo(() => {
    return (
      <div className={styles.accordionContainerContent}>
        <p className={styles.accordionContainerContentTitle}>성별</p>
        <div className={styles.accordionContainerContentRadio}>
          {personsOptional.map((person: CheckBox) => {
            return (
              <CheckBox
                key={person.id}
                name={person.name}
                id={person.id}
                value={person.value}
                label={person.label}
                checked={person.checked}
                checkOnlyOne={person.checkOnlyOne}
              />
            );
          })}
        </div>
      </div>
    );
  }, [optionalPersonCheckedValue]);

  const renderAgeOptional = useMemo(() => {
    return (
      <div className={styles.accordionContainerContent}>
        <p className={styles.accordionContainerContentTitle}>나이</p>
        <input
          type="text"
          placeholder="나이를 입력해 주세요."
          value={optionalAge}
          className={`${styles.accordionContainerContentAge} ${
            optionalAge ? styles.accordionContainerContentAgeActive : ''
          } `}
          onChange={e => handleChangeAge(e.target.value, true)}
        />
        <p className={styles.accordionContainerContentSubtext}>
          정확한 나이를 모르신다면 나이대를 작성해주세요! ex{')'} 50대 {'->'} 50
        </p>
      </div>
    );
  }, [optionalAge]);

  const jobsOptional = useMemo(() => {
    return [
      {
        name: 'job-optional',
        id: 'profession-optional',
        value: 'profession-optional',
        label: '전문직',
        checked: optionalJobCheckedValue === 'profession-optional',
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'job-optional',
        id: 'desk-job-optional',
        value: 'desk-job-optional',
        label: '사무직',
        checked: optionalJobCheckedValue === 'desk-job-optional',
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'job-optional',
        id: 'production-optional',
        value: 'production-optional',
        label: '노동/생산직',
        checked: optionalJobCheckedValue === 'production-optional',
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'job-optional',
        id: 'student-optional',
        value: 'student-optional',
        label: '학생',
        checked: optionalJobCheckedValue === 'student-optional',
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'job-optional',
        id: 'no-job-optional',
        value: 'no-job-optional',
        label: '무직',
        checked: optionalJobCheckedValue === 'no-job-optional',
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'job-optional',
        id: 'management-optional',
        value: 'management-optional',
        label: '경영/관리직',
        checked: optionalJobCheckedValue === 'management-optional',
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'job-optional',
        id: 'sales-optional',
        value: 'sales-optional',
        label: '판매/서비스직',
        checked: optionalJobCheckedValue === 'sales-optional',
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'job-optional',
        id: 'self-employment-optional',
        value: 'self-employment-optional',
        label: '자영업',
        checked: optionalJobCheckedValue === 'self-employment-optional',
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'job-optional',
        id: 'housewife-optional',
        value: 'housewife-optional',
        label: '전업주부',
        checked: optionalJobCheckedValue === 'housewife-optional',
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'job-optional',
        id: 'extra-optional',
        value: 'extra-optional',
        label: '기타',
        checked: optionalJobCheckedValue === 'extra-optional',
        checkOnlyOne: checkOnlyOne,
      },
    ];
  }, [optionalJobCheckedValue]);

  const renderJobsOptional = useMemo(() => {
    return (
      <div className={styles.accordionContainerContent}>
        <p className={styles.accordionContainerContentTitle}>
          직업 <span>(선택)</span>
        </p>
        <div className={styles.accordionContainerContentCheck}>
          {jobsOptional.map((job: CheckBox) => {
            return (
              <div className={styles.accordionContainerContentCheckItem} key={job.id}>
                <CheckBox
                  name={job.name}
                  id={job.id}
                  value={job.value}
                  label={job.label}
                  checked={job.checked}
                  checkOnlyOne={job.checkOnlyOne}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [optionalJobCheckedValue]);

  const persons = useMemo(() => {
    return [
      {
        id: 'women',
        name: 'sex',
        label: '여자',
        checked: personCheckedValue === 'women',
        hanleChangeValue: () => setPersonCheckedValue('women'),
      },
      {
        id: 'men',
        name: 'sex',
        label: '남자',
        checked: personCheckedValue === 'men',
        hanleChangeValue: () => setPersonCheckedValue('men'),
      },
    ];
  }, [personCheckedValue]);

  const renderPersons = useMemo(() => {
    return (
      <div className={styles.accordionContainerContent}>
        <p className={styles.accordionContainerContentTitle}>
          성별 <span className={styles.required}>*</span>
        </p>
        <div className={styles.accordionContainerContentRadio}>
          {persons.map((person: RadioButton) => {
            return (
              <RadioButton
                key={person.id}
                id={person.id}
                name={person.name}
                label={person.label}
                checked={person.checked}
                hanleChangeValue={person.hanleChangeValue}
              />
            );
          })}
        </div>
      </div>
    );
  }, [personCheckedValue]);

  const renderAge = useMemo(() => {
    return (
      <div className={styles.accordionContainerContent}>
        <p className={styles.accordionContainerContentTitle}>
          나이 <span className={styles.required}>*</span>
        </p>
        <input
          type="text"
          placeholder="나이를 입력해 주세요."
          value={age}
          className={`${styles.accordionContainerContentAge} ${
            age ? styles.accordionContainerContentAgeActive : ''
          } `}
          onChange={e => handleChangeAge(e.target.value, false)}
        />
        <p className={styles.accordionContainerContentSubtext}>
          정확한 나이를 모르신다면 나이대를 작성해주세요! ex{')'} 50대 {'->'} 50
        </p>
      </div>
    );
  }, [age]);

  const jobs = useMemo(() => {
    return [
      {
        name: 'job',
        id: 'profession',
        value: 'profession',
        label: '전문직',
        checked: jobCheckedValue === 'profession',
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'job',
        id: 'desk-job',
        value: 'desk-job',
        label: '사무직',
        checked: jobCheckedValue === 'desk-job',
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'job',
        id: 'production',
        value: 'production',
        label: '노동/생산직',
        checked: jobCheckedValue === 'production',
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'job',
        id: 'student',
        value: 'student',
        label: '학생',
        checked: jobCheckedValue === 'student',
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'job',
        id: 'no-job',
        value: 'no-job',
        label: '무직',
        checked: jobCheckedValue === 'no-job',
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'job',
        id: 'management',
        value: 'management',
        label: '경영/관리직',
        checked: jobCheckedValue === 'management',
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'job',
        id: 'sales',
        value: 'sales',
        label: '판매/서비스직',
        checked: jobCheckedValue === 'sales',
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'job',
        id: 'self-employment',
        value: 'self-employment',
        label: '자영업',
        checked: jobCheckedValue === 'self-employment',
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'job',
        id: 'housewife',
        value: 'housewife',
        label: '전업주부',
        checked: jobCheckedValue === 'housewife',
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'job',
        id: 'extra',
        value: 'extra',
        label: '기타',
        checked: jobCheckedValue === 'extra',
        checkOnlyOne: checkOnlyOne,
      },
    ];
  }, [jobCheckedValue]);

  const renderJobs = useMemo(() => {
    return (
      <div className={styles.accordionContainerContent}>
        <p className={styles.accordionContainerContentTitle}>
          직업 <span>(선택)</span>
        </p>
        <div className={styles.accordionContainerContentCheck}>
          {jobs.map((job: CheckBox) => {
            return (
              <div className={styles.accordionContainerContentCheckItem} key={job.id}>
                <CheckBox
                  name={job.name}
                  id={job.id}
                  value={job.value}
                  label={job.label}
                  checked={job.checked}
                  checkOnlyOne={job.checkOnlyOne}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [jobCheckedValue]);

  const purposes = useMemo(() => {
    return [
      {
        id: 'birthday',
        name: 'purpose',
        label: '생일',
        checked: purposeCheckedValue === 'birthday',
        hanleChangeValue: () => setPurposeCheckedValue('birthday'),
      },
      {
        id: 'graduation',
        name: 'purpose',
        label: '입학/졸업',
        checked: purposeCheckedValue === 'graduation',
        hanleChangeValue: () => setPurposeCheckedValue('graduation'),
      },
      {
        id: 'employment',
        name: 'purpose',
        label: '취업/이직',
        checked: purposeCheckedValue === 'employment',
        hanleChangeValue: () => setPurposeCheckedValue('employment'),
      },
      {
        id: 'hospital',
        name: 'purpose',
        label: '병문안(아플 때)',
        checked: purposeCheckedValue === 'hospital',
        hanleChangeValue: () => setPurposeCheckedValue('hospital'),
      },
      {
        id: 'move',
        name: 'purpose',
        label: '이사/집들이',
        checked: purposeCheckedValue === 'move',
        hanleChangeValue: () => setPurposeCheckedValue('move'),
      },
      {
        id: 'leave',
        name: 'purpose',
        label: '퇴사/퇴직',
        checked: purposeCheckedValue === 'leave',
        hanleChangeValue: () => setPurposeCheckedValue('leave'),
      },
      {
        id: 'discharge',
        name: 'purpose',
        label: '전역',
        checked: purposeCheckedValue === 'discharge',
        hanleChangeValue: () => setPurposeCheckedValue('discharge'),
      },
      {
        id: 'anniversary',
        name: 'purpose',
        label: '기념일',
        checked: purposeCheckedValue === 'anniversary',
        hanleChangeValue: () => setPurposeCheckedValue('anniversary'),
      },
    ];
  }, [purposeCheckedValue]);

  const renderPurposes = useMemo(() => {
    return (
      <div className={styles.accordionContainerContent}>
        <p className={styles.accordionContainerContentTitle}>
          선물 목적 <span className={styles.required}>*</span>
        </p>
        <div className={styles.accordionContainerContentCheck}>
          {purposes.map((purpose: RadioButton) => {
            return (
              <div className={styles.accordionContainerContentCheckItem} key={purpose.id}>
                <RadioButton
                  id={purpose.id}
                  name={purpose.name}
                  label={purpose.label}
                  checked={purpose.checked}
                  hanleChangeValue={purpose.hanleChangeValue}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [purposeCheckedValue]);

  const relationships = useMemo(() => {
    return [
      {
        id: 'family',
        name: 'relationship',
        label: '가족',
        checked: relationshipCheckedValue === 'family',
        hanleChangeValue: () => setRelationshipCheckedValue('family'),
      },
      {
        id: 'lover',
        name: 'relationship',
        label: '연인',
        checked: relationshipCheckedValue === 'lover',
        hanleChangeValue: () => setRelationshipCheckedValue('lover'),
      },
      {
        id: 'acquaintance',
        name: 'relationship',
        label: '지인',
        checked: relationshipCheckedValue === 'acquaintance',
        hanleChangeValue: () => setRelationshipCheckedValue('acquaintance'),
      },
      {
        id: 'friend',
        name: 'relationship',
        label: '친구',
        checked: relationshipCheckedValue === 'friend',
        hanleChangeValue: () => setRelationshipCheckedValue('friend'),
      },
      {
        id: 'teacher',
        name: 'relationship',
        label: '스승',
        checked: relationshipCheckedValue === 'teacher',
        hanleChangeValue: () => setRelationshipCheckedValue('teacher'),
      },
      {
        id: 'coworker',
        name: 'relationship',
        label: '직장동료',
        checked: relationshipCheckedValue === 'coworker',
        hanleChangeValue: () => setRelationshipCheckedValue('coworker'),
      },
    ];
  }, [relationshipCheckedValue]);

  const renderRelationships = useMemo(() => {
    return (
      <div className={styles.accordionContainerContent}>
        <p className={styles.accordionContainerContentTitle}>
          나와의 관계 <span className={styles.required}>*</span>
        </p>
        <div className={styles.accordionContainerContentCheck}>
          {relationships.map((relationship: RadioButton) => {
            return (
              <div className={styles.accordionContainerContentCheckItem} key={relationship.id}>
                <RadioButton
                  id={relationship.id}
                  name={relationship.name}
                  label={relationship.label}
                  checked={relationship.checked}
                  hanleChangeValue={relationship.hanleChangeValue}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [relationshipCheckedValue]);

  const presentTypes = useMemo(() => {
    return [
      {
        name: 'present-types',
        id: 'food',
        value: 'food',
        label: '식품',
        checked: checkedList.includes('food'),
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'present-types',
        id: 'living',
        value: 'living',
        label: '리빙/주방',
        checked: checkedList.includes('living'),
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'present-types',
        id: 'clothes',
        value: 'clothes',
        label: '의류/잡화',
        checked: checkedList.includes('clothes'),
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'present-types',
        id: 'beauty',
        value: 'beauty',
        label: '뷰티',
        checked: checkedList.includes('beauty'),
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'present-types',
        id: 'digital',
        value: 'digital',
        label: '디지털/가전',
        checked: checkedList.includes('digital'),
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'present-types',
        id: 'extra-product',
        value: 'extra-product',
        label: '기타',
        checked: checkedList.includes('extra-product'),
        checkOnlyOne: checkOnlyOne,
      },
    ];
  }, [checkedList]);

  const renderPresentTypes = useMemo(() => {
    return (
      <div className={styles.accordionContainerContent}>
        <p className={styles.accordionContainerContentTitle}>
          상품 종류 <span>(선택)</span>
        </p>
        <div className={styles.accordionContainerContentCheck}>
          {presentTypes.map((presentType: CheckBox) => {
            return (
              <div className={styles.accordionContainerContentCheckItem} key={presentType.id}>
                <CheckBox
                  name={presentType.name}
                  id={presentType.id}
                  value={presentType.value}
                  label={presentType.label}
                  checked={presentType.checked}
                  checkOnlyOne={presentType.checkOnlyOne}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [checkedList]);

  const emotions = useMemo(() => {
    return [
      {
        name: 'emotions',
        id: 'respect',
        value: 'respect',
        label: '존경',
        checked: emotionsCheckedValue === 'respect',
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'emotions',
        id: 'congrats',
        value: 'congrats',
        label: '축하',
        checked: emotionsCheckedValue === 'congrats',
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'emotions',
        id: 'thanks',
        value: 'thanks',
        label: '감사',
        checked: emotionsCheckedValue === 'thanks',
        checkOnlyOne: checkOnlyOne,
      },
      {
        name: 'emotions',
        id: 'consolation',
        value: 'consolation',
        label: '위로',
        checked: emotionsCheckedValue === 'consolation',
        checkOnlyOne: checkOnlyOne,
      },
    ];
  }, [emotionsCheckedValue]);

  const renderEmotions = useMemo(() => {
    return (
      <div className={styles.accordionContainerContent}>
        <p className={styles.accordionContainerContentTitle}>
          감정 <span>(선택)</span>
        </p>
        <div className={styles.accordionContainerContentCheck}>
          {emotions.map((emotion: CheckBox) => {
            return (
              <div className={styles.accordionContainerContentCheckItem} key={emotion.id}>
                <CheckBox
                  name={emotion.name}
                  id={emotion.id}
                  value={emotion.value}
                  label={emotion.label}
                  checked={emotion.checked}
                  checkOnlyOne={emotion.checkOnlyOne}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [emotionsCheckedValue]);

  const handleResetValues = useCallback(() => {
    setPersonCheckedValue('');
    setAge('');
    setJobCheckedValue('');
    setPurposeCheckedValue('');
    setRelationshipCheckedValue('');
    setCheckedList([]);
    setEmotionsCheckedValue('');
  }, []);

  //TODO : POST API (선물 추천받기)
  const getRecommendedPresents = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (
      personCheckedValue === '' ||
      purposeCheckedValue === '' ||
      age === '' ||
      relationshipCheckedValue === ''
    ) {
      alert('필수 항목들을 선택해 주세요.');
      return;
    }
    setLoader(true);
    try {
      //넘길 값
      let optionalValuesObj = {
        person: optionalPersonCheckedValue,
        age: optionalAge,
        jobs: optionalJobCheckedValue,
      };
      let valuesObj = {
        person: personCheckedValue,
        age: age,
        jobs: jobCheckedValue,
        purpose: purposeCheckedValue,
        relationship: relationshipCheckedValue,
        price: prices,
        productType: checkedList,
        emotion: emotionsCheckedValue,
      };

      //res.json이 200일 때 처리로 변경 필요.
      //현재는 단순 로직 보여주기 위해 타임아웃을 걸었음
      setTimeout(() => {
        setLoader(false);
        console.log(optionalValuesObj, valuesObj);
        location.href = '/curation/present/recommendation';
      }, 5000);

      //성공 시 초기화
      handleResetValues();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.accordion}>
      <div
        className={`${styles.accordionContainer} ${
          showFirstAccordion ? styles.accordionContainerAccordionActive : ''
        }`}
      >
        <div className={styles.accordionContainerTitle} onClick={handleShowFirstAccordion}>
          <h2>
            나는 어떤 사람인가요? <span>(선택)</span>
          </h2>
          {showFirstAccordion ? <ActiveUpArrow /> : <DownArrow />}
        </div>

        {showFirstAccordion ? (
          <div className={styles.accordionContainerContent}>
            {/*성별*/}
            {renderPersonsOptional}
            {/*나이*/}
            {renderAgeOptional}
            {/*직업*/}
            {renderJobsOptional}
          </div>
        ) : (
          ''
        )}
      </div>

      <div
        className={`${styles.accordionContainer} ${
          showSecondAccordion ? styles.accordionContainerAccordionActive : ''
        }`}
      >
        <div className={styles.accordionContainerTitle} onClick={handleShowSecondAccordion}>
          <h2>누구를 위한 선물인가요?</h2>
          {showSecondAccordion ? <ActiveUpArrow /> : <DownArrow />}
        </div>
        {showSecondAccordion ? (
          <div className={styles.accordionContainerContent}>
            {/*성별*/}
            {renderPersons}
            {/*나이*/}
            {renderAge}
            {/*직업*/}
            {renderJobs}
            {/*선물 목적*/}
            {renderPurposes}
            {/*나와의 관계*/}
            {renderRelationships}
            {/*희망 가격대*/}
            <PriceSlider prices={prices} setPrices={setPrices} />
            {/*상품 종류*/}
            {renderPresentTypes}
            {/*감정*/}
            {renderEmotions}
          </div>
        ) : (
          ''
        )}
      </div>
      <div className={styles.accordionSubmitButtonContainer}>
        <button
          onClick={getRecommendedPresents}
          className={styles.accordionSubmitButtonContainerButton}
        >
          선물 추천받기
        </button>
      </div>
      {loader && (
        <div className={styles.accordionLoader}>
          <img src={PresentLoader} alt="present-loader" className={styles.accordionLoaderIcon} />
          <p className={styles.accordionLoaderText}>
            소중한 당신을 위해
            <br />
            선물을 고르고 있어요.
          </p>
        </div>
      )}
    </div>
  );
};

export default memo(Accordion);
