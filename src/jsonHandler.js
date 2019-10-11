const todoCards = {}; // purely in memory
const inprogressCards = {};
const completeCards = {};

// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const notFound = (request, response) => {
  // create error message for response
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return a 404 with an error message
  respondJSON(request, response, 404, responseJSON);
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response without json object, just headers
  response.writeHead(status, headers);
  response.end();
};

// get cards users have created
// should calculate a 200
const getCards = (request, response) => {
  const responseJSON = {
    todoCards,
    inprogressCards,
    completeCards,
  };

  return respondJSON(request, response, 200, responseJSON);
};

// get meta info about card object
// should calculate a 200
const getCardsMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
};

const createCard = (request, response, body) => {
  // make sure a name and age are included, else send a bad request
  if (body.title === 'enter title' || body.duedate === ''
      || body.priority === '' || body.desc === '' || body.status === '') {
    const responseJSON = {
      message: 'You must provide all of the above information.',
      id: 'badRequest',
    };
    return respondJSON(request, response, 400, responseJSON);
  }
  const newCard = {
    title: body.title,
    duedate: body.duedate,
    priority: body.priority,
    desc: body.desc,
    status: body.status,
  };

  /* if (cards[newCard.title]) {
    // return a 204 updated status
    // return respondJSON(request, response, 204, newCard);
  } */
  // create the new card and return 201 status
  switch (newCard.status) {
    case 'todo':
      todoCards[newCard.title] = newCard;
      break;
    case 'inprogress':
      inprogressCards[newCard.title] = newCard;
      break;
    case 'completed':
      completeCards[newCard.title] = newCard;
      break;
    default:
      break;
  }
  return respondJSON(request, response, 201, newCard);
};

// function for 404 not found without message
const notFoundMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

module.exports = {
  getCards,
  getCardsMeta,
  createCard,
  notFound,
  notFoundMeta,
};
