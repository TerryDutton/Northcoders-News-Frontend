import React from 'react'; 
import {Link} from 'react-router-dom';

function RenderWelcomeStats({stats, job, product}){
  const {mostProlific, prolificNo, mostPopular, totalVotes, popularNo, average} = stats;
  return (
    <div>
      <p>
        {`Our busiest ${job} is `}
        <Link to={`/api/users/${mostProlific}`}>
          {`${mostProlific}`}
        </Link>
        {`, with ${prolificNo} ${product}.`}
      </p>
      <p>
        {`Our most popular ${job} is `}
        <Link to={`/api/users/${mostPopular}`}>
          {`${mostPopular}`}
        </Link>
        {`, with ${totalVotes} votes across ${popularNo} ${product} (an average of ${average.toFixed(1)} votes per ${product.slice(0, -1)}).`}
      </p>
    </div>
  );
}
export default RenderWelcomeStats;



