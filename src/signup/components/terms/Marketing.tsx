import React from 'react';

const Marketing = () => {
  return (
    <div id="terms__marketing">
      {/* prettier-ignore */}
      <pre>
이용자는 본 마케팅 정보 수신에 대한 동의를 거부하실 수 있습니다. 이 경우 회원가입은 가능하나 일부 서비스 이용 및 각종 광고, 할인, 이벤트 및 이용자 맞춤형 상품 추천 등의 서비스 제공이 제한될 수 있습니다.

1. 목적

  - Full Stack이 제공하는 이용자 맞춤형 서비스 및 상품 추천, 각종 경품 행사, 이벤트 등의 광고성 정보 제공(이메일, 서신우편, SMS, 카카오톡 등)

  - 접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계

2. 항목

  - 이름, 이메일주소, 성별, 생년월일(나이), 직업군, 마케팅 수신 동의 여부

3. 보유기간

  - 회원 탈퇴 즉시 삭제됩니다.

    </pre>
    </div>
  );
};
export default React.memo(Marketing);
