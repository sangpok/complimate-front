import InlineProfile from './InlineProfile';
import * as S from './PostUserInfo.styled';
import { PostUserInfoProp } from './PostUserInfo.types';

const PostUserInfo = ({ date, nickname, profile }: PostUserInfoProp) => {
  return (
    <S.CCUserInfoContainer className="유저 정보 컨테이너">
      <InlineProfile type="post" nickname={nickname} profile={profile} />

      <p className="time">{date}</p>
    </S.CCUserInfoContainer>
  );
};

export default PostUserInfo;
