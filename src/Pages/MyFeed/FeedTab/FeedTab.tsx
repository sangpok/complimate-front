import { MyComment, MyCompliment } from '@Types/index';
import { ComponentType } from 'react';
import { Tab } from './Tab';

type TabContentProp<T> = { list: T[] };

type FeedTabProp = {
  compliments: MyCompliment[];
  comments: MyComment[];
};

const CommentTabContent = ({ list: comments }: TabContentProp<MyComment>) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <p>{comment.contents}</p>
          <span>하트: {comment.likeCount}</span>
        </li>
      ))}
    </ul>
  );
};

const ComplimentTabContent = ({ list: compliments }: TabContentProp<MyCompliment>) => {
  return (
    <ul>
      {compliments.map((compliment) => (
        <li key={compliment.id}>
          <p>{compliment.contents}</p>
          <span>댓글: {compliment.commentCount} </span>
          <span>하트: {compliment.likeCount}</span>
        </li>
      ))}
    </ul>
  );
};

export const FeedTab = ({ compliments, comments }: FeedTabProp) => {
  return (
    <Tab>
      <Tab.List initialTab="A">
        <Tab.IndicatorBackground />
        <Tab.Button tabName="A">내가 쓴 칭찬해줘</Tab.Button>
        <Tab.Button tabName="B">내가 쓴 칭찬할게</Tab.Button>
      </Tab.List>

      <Tab.ContentView>
        <Tab.Content tabName="A">
          <ComplimentTabContent list={compliments} />
        </Tab.Content>

        <Tab.Content tabName="B">
          <CommentTabContent list={comments} />
        </Tab.Content>
      </Tab.ContentView>
    </Tab>
  );
};
