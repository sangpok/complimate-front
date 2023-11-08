import * as S from './InlineProfile.styled';
import { InlineProfileProp } from './InlineProfile.types';

const InlineProfile = ({ nickname, profile, ...rest }: InlineProfileProp) => {
  return (
    <S.Container {...rest}>
      <S.Profile
        style={{
          backgroundImage: `url('${profile}')`,
        }}
        {...rest}
      />
      <span>
        <strong>{nickname}</strong>
        {rest.type === 'post' && <>님으로부터</>}
        {rest.type === 'reply-target' && <>님에게 답글달기</>}
      </span>
    </S.Container>
  );
};

export default InlineProfile;
