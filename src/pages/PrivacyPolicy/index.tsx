import { DrawerScreen } from '@/layouts/DrawerScreen';

import styles from './style.module.scss';

export type TermsOfServicePageProps = {
  handleBackButton: () => void;
};

export const PrivacyPolicyPage = ({ handleBackButton }: TermsOfServicePageProps) => {
  return (
    <DrawerScreen title="개인정보보호정책" handleBackButton={handleBackButton}>
      <div className={styles.privacyPolicy}>
        <h2>CherishU 개인정보 수집이용 동의서</h2>
        <br />
        1. 개인정보의 수집 및 이용 동의서
        <br />- 이용자가 제공한 모든 정보는 다음의 목적을 위해 활용하며, 하기 목적 이외의 용도로는
        사용되지 않습니다.
        <ul>
          <li>
            <div className={styles.title}>① 개인정보 수집 항목</div>
            <ul>
              <li>
                가) 필수 항목
                <div>
                  성명(국문), 이메일주소, 생년월일(나이), 직업군, 성별 등 회원가입 시 기재된 정보
                  또는 이용자가 제공한 정보
                </div>
              </li>
              <li>
                나) 수집 및 이용 목적
                <div>
                  - 회원관리 : 회원제 서비스 제공 및 개선, 개인식별, 이용약관 위반 회원에 대한
                  이용제한 조치, 서비스의 원활한 운영에 지장을 미치는 행위 및 서비스 부정이용 행위
                  제재, 가입의사 확인, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항
                  전달, 회원탈퇴 의사의 확인 등
                </div>
                <div>
                  - 신규 서비스 개발 및 마케팅·광고에의 활용 : 신규 서비스 개발 및 맞춤 서비스 제공,
                  통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 자사 및 제휴
                  이벤트 정보 및 참여기회 제공, 광고성 정보 제공, 접속빈도 파악, 회원의 서비스이용에
                  대한 통계분석 등
                </div>
              </li>
            </ul>
            <br />
            <div>
              ※ 상기 선택정보를 미작성하더라도 서비스 이용은 가능하며, 수집된 개인정보는 정확한
              서비스 제공을 위해 활용됩니다.
            </div>
          </li>
          <li>
            <div className={styles.title}>② 개인정보 보유 및 이용기간</div>
            <div>
              - 이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이
              파기합니다.
            </div>
          </li>
          <li>
            <div className={styles.title}>③ 동의거부관리</div>
            <div>
              - 귀하께서는 본 안내에 따른 개인정보 수집, 이용에 대하여 동의를 거부하실 권리가
              있습니다. 다만, 귀하가 개인정보의 수집/이용에 동의를 거부하시는 경우에 서비스 제공
              과정에 있어 불이익이 발생할 수 있음을 알려드립니다.
            </div>
          </li>
        </ul>
        <br />
        <div>본인은 위와 같은 목적으로 본인의 개인정보를 수집·이용하는 것에 동의합니다.</div>
      </div>
    </DrawerScreen>
  );
};
