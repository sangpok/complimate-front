import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import * as S from './AccordionList.styled';

const AccordionList = ({ list, onViewClick, onDeleteClick, onModifyClick }) => {
  return (
    <S.AccordionRoot type="single" collapsible>
      {list.map((item) => (
        <S.AccordionItem value={item.id}>
          <S.AccordionTrigger>
            <p className="content">{item.content}</p>

            <div className="count-section">
              {item.commentCount && (
                <div className="group">
                  <S.CommentIcon />
                  <span>
                    <strong>{item.commentCount}</strong>개
                  </span>
                </div>
              )}

              <div className="group">
                <S.HeartIcon />
                <span>
                  <strong>{item.heartCount}</strong>개
                </span>
              </div>
            </div>
          </S.AccordionTrigger>

          <S.AccordionContent>
            <S.ContentInner>
              <button className="view" onClick={() => onViewClick(item.id)}>
                보기
              </button>
              <button className="delete" onClick={() => onDeleteClick(item.id)}>
                삭제하기
              </button>
              <button className="modify" onClick={() => onModifyClick(item.id)}>
                수정하기
              </button>
            </S.ContentInner>
          </S.AccordionContent>
        </S.AccordionItem>
      ))}

      {/* <Accordion.Item value="item-2">
        <Accordion.Trigger>Is it unstyled?</Accordion.Trigger>
        <Accordion.Content>
          Yes. It's unstyled by default, giving you freedom over the look and feel.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="item-3">
        <Accordion.Trigger>Can it be animated?</Accordion.Trigger>
        <Accordion.Content>
          Yes! You can animate the Accordion with CSS or JavaScript.
        </Accordion.Content>
      </Accordion.Item> */}
    </S.AccordionRoot>
    // <Accordion.Root>

    //   {list.map((item) => (
    //     <li>{item.content}</li>
    //   ))}
    // </Accordion.Ro>
  );
};

export default AccordionList;
