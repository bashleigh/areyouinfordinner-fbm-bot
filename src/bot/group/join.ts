export default (convo) => {
    convo.ask('Do you know the code of the group?', (payload, convo) => {
        convo.set('convo_code', payload.message.text);
        convo.say('Ok searching now...');
    });
};