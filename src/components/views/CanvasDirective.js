// canvas.directive.js

import { v4 } from 'uuid';
import Pusher from 'pusher-js'

function inserted(el, binding) {
     const canvas = el;
     const ctx = canvas.getContext('2d');

     canvas.width = 1000;
     canvas.height = 400;

     ctx.lineJoin = 'round';
     ctx.lineCap = 'round';
     ctx.lineWidth = binding.value.size;

     //Pusher
     const pusher = new Pusher('0f5f2bf6cc6d01e862a4', {
          cluster: 'us2',
     });
     const channel = pusher.subscribe('painting');

     let prevPos = { offsetX: 0, offsetY: 0 };
     let line = [];
     let isPainting = false;
     const userId = v4();
     const USER_STROKE = 'black';
     const GUEST_STROKE = 'black';

     function handleMouseDown(e) {
          const { offsetX, offsetY } = e;
          isPainting = true;
          prevPos = { offsetX, offsetY };
     }
     function endPaintEvent() {
          if (isPainting) {
               isPainting = false;
               sendPaintData();
          }
     }
     function handleMouseMove(e) {
          if (isPainting) {
               const { offsetX, offsetY } = e;
               const offSetData = { offsetX, offsetY };
               const positionInfo = {
                    start: { ...prevPos },
                    stop: { ...offSetData },
               };
               line = line.concat(positionInfo);
               paint(prevPos, offSetData, USER_STROKE);
          }
     }
     function sendPaintData() {
          const body = {
               line,
               userId,
          };
          fetch(`${process.env.VUE_APP_API_URL}/paint`, {
               method: 'post',
               body: JSON.stringify(body),
               headers: {
                    'content-type': 'application/json',
               },
          }).then(() => (line = []));
     }
     function paint(prevPosition, currPosition, strokeStyle) {
          const { offsetX, offsetY } = currPosition;
          const { offsetX: x, offsetY: y } = prevPosition;
          ctx.beginPath();
          ctx.strokeStyle = strokeStyle;
          ctx.moveTo(x, y);
          ctx.lineTo(offsetX, offsetY);
          ctx.stroke();
          prevPos = { offsetX, offsetY };
     }
     canvas.addEventListener('mousedown', handleMouseDown);
     canvas.addEventListener('mousemove', handleMouseMove);
     canvas.addEventListener('mouseup', endPaintEvent);
     canvas.addEventListener('mouseleave', endPaintEvent);

     channel.bind('draw', (data) => {
          const { userId: id, line } = data;
          if (userId !== id) {
               line.forEach((position) => {
                    paint(position.start, position.stop, GUEST_STROKE);
               });
          }
     });
}
export default {
     inserted,
};