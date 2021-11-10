// import React from 'react';
import React, {Component} from 'react';
'use strict';
// const e = React.createElement;
const commentData = {
  title: 'Fake article title.',
  author: 'grzm',
  comments: [
    {
      id: 1,
      text: 'Example comment here.',
      author: 'user2',
      children: [
        {
          id: 2,
          text: 'Another example comment text.',
          author: 'user3',
          children: [
            {
              id: 3,
              text: 'Another example comment text.',
              author: 'user4',
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 4,
      text: 'Example comment here 2.',
      author: 'user5',
      children: [],
    },
  ],
};

/**
 * Flatten object using recursive method
 * @param {comment} object
 * @return {str} is fromatted div.
 */
function Comment({comment}) {
  const nestedComments = (comment.children || []).map((comment) => {
    return <Comment key={comment.id} comment={comment} type="child" />;
  });

  return (
    <div style={{'marginLeft': '25px', 'marginTop': '10px'}}>
      <div>{comment.text}</div>
      {nestedComments}
    </div>
  );
}

/**
 * Create div with nicely presented object data
 * @return {str} is nested div.
 */
function App() {
  return (
    <div>
      {
        commentData.comments.map((comment) => {
          return (
            <Comment key={comment.id} comment={comment} />
          );
        })
      }
    </div>
  );
}

export default App;
