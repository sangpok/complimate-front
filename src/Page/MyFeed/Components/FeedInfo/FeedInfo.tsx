import * as S from './FeedInfo.styled';

const FeedInfo = () => {
  return (
    <S.Container>
      <S.InnerLayout>
        <S.ProfileSection>
          <S.ProfileImage profile="./tet.jpg" />

          <div className="group">
            <p className="nickname">나는야 김재민</p>
            <p className="handle-id">@im_jmjm</p>
          </div>
        </S.ProfileSection>

        <S.CCSection>
          <div className="group">
            <S.GiveHeartIcon />

            <div className="detail">
              <p className="description">내가 쓴 칭찬</p>
              <p className="count">
                <strong>48</strong>개
              </p>
            </div>
          </div>

          <div className="group">
            <S.TakenHeartIcon />

            <div className="detail">
              <p className="description">내가 받은 칭찬</p>
              <p className="count">
                <strong>124</strong>개
              </p>
            </div>
          </div>
        </S.CCSection>
      </S.InnerLayout>
    </S.Container>
  );
};

export default FeedInfo;
