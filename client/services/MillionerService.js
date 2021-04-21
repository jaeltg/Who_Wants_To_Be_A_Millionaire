const baseURL = 'http://localhost:3000/api/scores/';

export default {
    getScores() {
      return fetch(baseURL)
        .then(res => res.json());
    },
  
    addScore(score) {
      return fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify(score),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json());
    },
  
    // updateScore(score) {
    //   return fetch(baseURL + score._id, {
    //     method: 'PUT',
    //     body: JSON.stringify(score),
    //     headers: { 
    //       'Content-Type': 'application/json' 
    //     }
    //   })
    //     .then(res => res.json());
    // },
  

  };
  