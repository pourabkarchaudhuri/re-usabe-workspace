'use strict';

// Close dialog with the customer, reporting fulfillmentState of Failed or Fulfilled
function close(sessionAttributes, fulfillmentState, message, responseCard) {
    var result = {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
            responseCard
        },
    };

    console.log(result);
    return result;
}


function requestNextIntent(sessionAttributes, message, responseCard) {
    var result= {
        sessionAttributes,
        dialogAction: {
            type: 'ElicitIntent',
            message,
            responseCard
        },
    };
    console.log(result);
    return result;
}//SessionEndedRequest : false. Waiting for another Intent

function confirm(sessionAttributes, message, responseCard) {
    var result= {
        sessionAttributes,
        dialogAction: {
            type: 'ConfirmIntent',
            message,
            responseCard
        },
    };
    console.log(result);
    return result;
}//SessionEndedRequest : false. Waiting for another Intent


function delegate(sessionAttributes, slots) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Delegate',
            slots,
        },
    };
}

// --------------- Events -----------------------


  function dispatch(intentRequest, callback) {
      console.log(`Request received for userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.intentName}`);
      const sessionAttributes = intentRequest.sessionAttributes;
      const slots = intentRequest.currentIntent.slots;
      const insuranceType = slots.query_category;

      console.log("Request : "+JSON.stringify(intentRequest));

    if(intentRequest.currentIntent.name==="SendMailTriggerIntent")
      {
        console.log('Send Mail Triggered Fired');
        callback(close(sessionAttributes,"Fulfilled",{'contentType': 'PlainText', 'content': `I have sent a copy of the invoice for the current month to your registered email address. Anything else?`}, null));

      }
      //Intent Triggered on WelcomeDefaultIntent's Lex Invocation to This Lambda


// --------------------- Main handler -----------------------

// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
exports.handler = (event, context, callback) => {

    console.log(""+ JSON.stringify(event));
    console.log(""+ JSON.stringify(context));
    try {
        dispatch(event,
            (response) => {
                callback(null, response);
            });
    } catch (err) {
        callback(err);
    }
};
