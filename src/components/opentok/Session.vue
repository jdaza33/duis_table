<template>
  <div id="session" @error="errorHandler">
    <publisher :session="session" @error="errorHandler"></publisher>
    <div id="subscribers" v-for="stream in streams" :key="stream.streamId">
      <subscriber @error="errorHandler" :stream="stream" :session="session"></subscriber>
    </div>
  </div>
</template>

<script>
import OT from '@opentok/client';
import Publisher from './Publisher.vue';
import Subscriber from './Subscriber.vue';

const errorHandler = (err) => {
  alert(err.message);
};

export default {
  name: 'session',
  data(){
    return{
      apiKey: '46204402',
      sessionId: '2_MX40NjIwNDQwMn5-MTUzOTgxNjIzOTg1Nn4zaFBSZDQ0VHNuZG5sOFgvbFpLN3l1cHV-QX4',
      token: 'T1==cGFydG5lcl9pZD00NjIwNDQwMiZzaWc9MzE5Y2I5MWIzNjY2MWNjY2JjYTQyN2M2Y2U1ZjNiYTI2ZWUwZDkyMDpzZXNzaW9uX2lkPTJfTVg0ME5qSXdORFF3TW41LU1UVXpPVGd4TmpJek9UZzFObjR6YUZCU1pEUTBWSE51Wkc1c09GZ3ZiRnBMTjNsMWNIVi1RWDQmY3JlYXRlX3RpbWU9MTUzOTgxNjIzOSZyb2xlPW1vZGVyYXRvciZub25jZT0xNTM5ODE2MjM5Ljg5NDExNzY5NDg0MTEzJmV4cGlyZV90aW1lPTE1NDA0MjEwMzkmY29ubmVjdGlvbl9kYXRhPW5hbWUlM0RKb2hubnk=',
      streams: [],
      session: null,
    }
  },
  components: { Publisher, Subscriber },
  created () {
    this.session = OT.initSession(this.apiKey, this.sessionId);
    this.session.connect(this.token, (err) => {
      if (err) {
        errorHandler(err);
      }
    });
    
    this.session.on('streamCreated', (event) => {
      this.streams.push(event.stream);
    });
    this.session.on('streamDestroyed', (event) => {
      const idx = this.streams.indexOf(event.stream);
      if (idx > -1) {
        this.streams.splice(idx, 1);
      }
    });
  },
  methods: {
    errorHandler
  }
};
</script>

