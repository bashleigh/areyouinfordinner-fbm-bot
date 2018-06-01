export default convo => {
  convo.ask('What would you like to call it?', (payload, convo) => {
    convo.set('convo_name', payload.message.text);
    convo.say("Cool! We'll call it " + payload.message.text);
  });
};
